import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topic, keywords, targetAudience } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Generating blog for topic:", topic);

    const systemPrompt = `You are an expert SEO content writer who creates human-like, engaging blog articles. Your writing style is:
- Simple and easy to understand (a 12-year-old should be able to read it)
- Natural and conversational, like talking to a friend
- Free from AI-detectable patterns (avoid repetitive structures, robotic phrasing)
- Engaging with real-world examples and relatable stories

IMPORTANT: Write content that feels genuinely human-written. Avoid:
- Starting every paragraph the same way
- Using overly formal or corporate language
- Generic filler content
- Repetitive sentence structures`;

    const userPrompt = `Write a comprehensive, SEO-optimized blog article about: "${topic}"

Target Keywords: ${keywords || 'not specified'}
Target Audience: ${targetAudience || 'general readers'}

Requirements:
1. LENGTH: 2500-3500 words of high-quality content
2. E-E-A-T STRUCTURE: Show Experience, Expertise, Authoritativeness, and Trustworthiness
3. HEADING HIERARCHY: Use proper H1, H2, H3 structure (format as # for H1, ## for H2, ### for H3)
4. TABLE OF CONTENTS: Include at the beginning after a brief intro
5. CASE STUDIES: Include 2-3 real examples or case studies
6. STATISTICS: Include relevant statistics with attribution
7. INTERNAL STRUCTURE:
   - Hook opening that grabs attention
   - Clear introduction explaining what readers will learn
   - Well-organized body with subheadings
   - Actionable tips and takeaways
   - Strong conclusion with CTA

8. SEO ELEMENTS at the end in this exact format:
---
META_TITLE: [60 characters max, include main keyword]
META_DESCRIPTION: [160 characters max, compelling with keyword]
EXCERPT: [2-3 sentence summary for blog cards]
---

Write in a friendly, conversational tone. Use "you" and "your" to connect with readers. Include questions to engage readers. Make it feel like advice from a knowledgeable friend, not a textbook.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const generatedContent = data.choices?.[0]?.message?.content;

    if (!generatedContent) {
      throw new Error("No content generated");
    }

    // Parse meta information from the generated content
    let content = generatedContent;
    let metaTitle = topic;
    let metaDescription = '';
    let excerpt = '';

    const metaMatch = content.match(/---\s*\nMETA_TITLE:\s*(.+?)\nMETA_DESCRIPTION:\s*(.+?)\nEXCERPT:\s*(.+?)\n---/s);
    if (metaMatch) {
      metaTitle = metaMatch[1].trim();
      metaDescription = metaMatch[2].trim();
      excerpt = metaMatch[3].trim();
      content = content.replace(/---\s*\nMETA_TITLE:.+?---/s, '').trim();
    }

    console.log("Blog generated successfully");

    return new Response(JSON.stringify({ 
      content,
      metaTitle,
      metaDescription,
      excerpt
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating blog:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to generate blog";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
