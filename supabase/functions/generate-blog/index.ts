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
    const { topic, keywords, targetAudience, targetCity, targetCountry, localTerms, internalLinks } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Generating blog for topic:", topic, "City:", targetCity || "none");

    const systemPrompt = `You are an expert SEO content writer who creates human-like, engaging blog articles. Your writing style is:
- Extremely simple and easy to understand (an 8-year-old child should be able to read and enjoy it)
- Use short sentences and simple words
- Natural and conversational, like explaining something to a curious child
- Free from AI-detectable patterns (avoid repetitive structures, robotic phrasing)
- Engaging with fun real-world examples and relatable stories
- Uses analogies and comparisons to everyday things kids understand

IMPORTANT: Write content that feels genuinely human-written and super easy to read. Avoid:
- Starting every paragraph the same way
- Using complex or technical jargon without explaining it simply
- Long, complicated sentences
- Generic filler content
- Repetitive sentence structures
- Passive voice (use active voice instead)`;


    // Build city-specific context if targeting a city
    const cityContext = targetCity ? `
CITY-SPECIFIC TARGETING:
- Target City: ${targetCity}
- Target Country: ${targetCountry || 'not specified'}
- Local Terms to naturally include: ${localTerms || 'none specified'}
- IMPORTANT: Mention ${targetCity} and local areas naturally throughout the article (aim for 8-12 mentions)
- Reference local design trends, challenges, and opportunities specific to ${targetCity}
- Include local market insights and statistics when possible

INTERNAL LINKING (CRITICAL FOR SEO):
Include these internal links naturally in the content:
${internalLinks || `- [interior design software in ${targetCity}](/${targetCountry?.toLowerCase() || 'us'}/${targetCity.toLowerCase().replace(/\s+/g, '-')})
- [Intorza for ${targetCity} designers](/${targetCountry?.toLowerCase() || 'us'}/${targetCity.toLowerCase().replace(/\s+/g, '-')})`}
` : '';

    const userPrompt = `Write a comprehensive, SEO-optimized blog article about: "${topic}"

Target Keywords: ${keywords || 'not specified'}
Target Audience: ${targetAudience || 'general readers'}
${cityContext}

CRITICAL REQUIREMENTS:

1. READABILITY: Write so an 8-year-old child can understand. Use:
   - Short sentences (under 15 words when possible)
   - Simple, everyday words
   - Fun comparisons ("It's like when you...")
   - Questions that make readers think

2. LENGTH: 2500-3500 words of high-quality, easy-to-read content

3. E-E-A-T STRUCTURE: Show Experience, Expertise, Authoritativeness, and Trustworthiness through:
   - Personal stories and real examples from ${targetCity || 'the industry'}
   - Expert quotes and citations
   - Data and statistics from trusted sources

4. HEADING HIERARCHY: Use proper structure:
   # Main Title (H1) - only one, include ${targetCity || 'main keyword'} naturally
   ## Section Headings (H2) - main sections
   ### Subsection Headings (H3) - details within sections

5. TABLE OF CONTENTS: After a 2-3 sentence intro hook, include:
   ## What You'll Learn
   - [Section 1 name](#section-link)
   - [Section 2 name](#section-link)
   (etc.)

6. CASE STUDIES: Include 2-3 real examples with:
   - Specific names/companies ${targetCity ? `from ${targetCity} or ${targetCountry}` : ''} when possible
   - Numbers and results
   - What they did and what happened

7. REFERENCE LINKS: Include 3-5 links to authoritative sources like:
   - Government websites (.gov)
   - Educational institutions (.edu)
   - Major industry publications
   Format: [Source Name](URL)

8. INTERNAL LINKS (CRITICAL):
   - Include 3-5 internal links to relevant pages on intorza.com
   - Link to the city page: /${targetCountry?.toLowerCase() || 'us'}/${targetCity?.toLowerCase().replace(/\s+/g, '-') || ''}
   - Link to the country page: /${targetCountry?.toLowerCase() || 'us'}
   - Use natural anchor text like "interior design software for ${targetCity} professionals"

9. EMOTIONAL ELEMENTS:
   - Start with a hook that creates curiosity or addresses a pain point${targetCity ? ` specific to ${targetCity}` : ''}
   - Use stories that readers can relate to
   - Include "imagine if..." scenarios

10. STRUCTURE EACH SECTION WITH:
    - A clear subheading
    - 2-3 short paragraphs
    - Bullet points or numbered lists where helpful
    - A key takeaway or tip

11. CALL TO ACTION: End with:
    - Summary of key points
    - One clear next step for the reader${targetCity ? ` in ${targetCity}` : ''}
    - Encouraging, motivating tone
    - Link to try Intorza: [Start your free trial](https://app.intorza.com)

12. SEO ELEMENTS at the very end in this exact format:
---
META_TITLE: [60 characters max, include ${targetCity || 'main keyword'}]
META_DESCRIPTION: [160 characters max, compelling with ${targetCity || 'keyword'}]
EXCERPT: [2-3 sentence summary for blog cards]
---

Remember: Write like you're explaining to a smart 8-year-old. If a concept is complex, break it down with a simple analogy. Make it fun to read!`;


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
