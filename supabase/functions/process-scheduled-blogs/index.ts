import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// City blog strategy data for internal links
const cityStrategies: Record<string, { cityName: string; countryCode: string; localTerms: string[]; blogTopics: { title: string; targetUrl: string }[] }> = {
  'new-york': { cityName: 'New York', countryCode: 'us', localTerms: ['co-op', 'brownstone', 'walk-up', 'loft'], blogTopics: [{ title: 'NYC Interior Design Pricing', targetUrl: '/us/new-york' }] },
  'los-angeles': { cityName: 'Los Angeles', countryCode: 'us', localTerms: ['mid-century modern', 'SoCal style'], blogTopics: [{ title: 'LA Interior Design', targetUrl: '/us/los-angeles' }] },
  'london': { cityName: 'London', countryCode: 'uk', localTerms: ['townhouse', 'mews house', 'period property'], blogTopics: [{ title: 'London Designer Tools', targetUrl: '/uk/london' }] },
  'sydney': { cityName: 'Sydney', countryCode: 'au', localTerms: ['federation style', 'coastal modern'], blogTopics: [{ title: 'Sydney Design Software', targetUrl: '/au/sydney' }] },
  'dubai': { cityName: 'Dubai', countryCode: 'ae', localTerms: ['villa', 'penthouse', 'majlis'], blogTopics: [{ title: 'Dubai Luxury Design', targetUrl: '/ae/dubai' }] },
  'toronto': { cityName: 'Toronto', countryCode: 'ca', localTerms: ['condo', 'townhome', 'heritage home'], blogTopics: [{ title: 'Toronto Design', targetUrl: '/ca/toronto' }] },
  'singapore': { cityName: 'Singapore', countryCode: 'sg', localTerms: ['HDB', 'BTO', 'condo'], blogTopics: [{ title: 'Singapore ID', targetUrl: '/sg/singapore' }] },
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Get today's date in UTC
    const today = new Date().toISOString().split('T')[0];
    console.log(`Processing scheduled blogs for: ${today}`);

    // Fetch all pending scheduled posts for today
    const { data: scheduledPosts, error: fetchError } = await supabase
      .from('scheduled_blog_posts')
      .select('*')
      .eq('status', 'pending')
      .lte('scheduled_date', today);

    if (fetchError) {
      throw new Error(`Failed to fetch scheduled posts: ${fetchError.message}`);
    }

    if (!scheduledPosts || scheduledPosts.length === 0) {
      console.log("No scheduled posts to process");
      return new Response(JSON.stringify({ message: "No posts to process", processed: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`Found ${scheduledPosts.length} posts to process`);
    const results: { id: string; status: string; error?: string }[] = [];

    for (const post of scheduledPosts) {
      try {
        // Update status to generating
        await supabase
          .from('scheduled_blog_posts')
          .update({ status: 'generating' })
          .eq('id', post.id);

        console.log(`Generating blog for: ${post.topic}`);

        // Get city strategy if targeting a city
        const cityStrategy = post.target_city ? cityStrategies[post.target_city] : null;
        
        // Generate the blog content using AI
        const content = await generateBlogContent({
          topic: post.topic,
          keywords: post.keywords || '',
          targetAudience: post.target_audience || 'interior designers, architects, contractors',
          targetCity: cityStrategy?.cityName || post.target_city || '',
          targetCountry: post.target_country || cityStrategy?.countryCode || '',
          localTerms: cityStrategy?.localTerms?.join(', ') || '',
          internalLinks: cityStrategy?.blogTopics.map(t => `- [${t.title}](${t.targetUrl})`).join('\n') || '',
        }, LOVABLE_API_KEY);

        // Create the blog post
        const slug = generateSlug(post.topic);
        const { data: blogPost, error: insertError } = await supabase
          .from('blog_posts')
          .insert({
            title: post.topic,
            slug: slug,
            excerpt: content.excerpt || '',
            content: content.content,
            published: true, // Auto-publish
            author_id: post.created_by,
          })
          .select()
          .single();

        if (insertError) {
          throw new Error(`Failed to insert blog post: ${insertError.message}`);
        }

        // Update scheduled post as published
        await supabase
          .from('scheduled_blog_posts')
          .update({
            status: 'published',
            blog_post_id: blogPost.id,
          })
          .eq('id', post.id);

        console.log(`Successfully published: ${post.topic}`);
        results.push({ id: post.id, status: 'published' });

      } catch (postError) {
        const errorMessage = postError instanceof Error ? postError.message : 'Unknown error';
        console.error(`Failed to process post ${post.id}:`, errorMessage);

        // Update scheduled post as failed
        await supabase
          .from('scheduled_blog_posts')
          .update({
            status: 'failed',
            error_message: errorMessage,
          })
          .eq('id', post.id);

        results.push({ id: post.id, status: 'failed', error: errorMessage });
      }
    }

    return new Response(JSON.stringify({
      message: "Processing complete",
      processed: results.length,
      results,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error processing scheduled blogs:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to process scheduled blogs";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function generateBlogContent(
  params: {
    topic: string;
    keywords: string;
    targetAudience: string;
    targetCity: string;
    targetCountry: string;
    localTerms: string;
    internalLinks: string;
  },
  apiKey: string
): Promise<{ content: string; excerpt: string }> {
  const { topic, keywords, targetAudience, targetCity, targetCountry, localTerms, internalLinks } = params;

  const systemPrompt = `You are an expert SEO content writer who creates human-like, engaging blog articles. Your writing style is:
- Extremely simple and easy to understand (an 8-year-old child should be able to read and enjoy it)
- Use short sentences and simple words
- Natural and conversational, like explaining something to a curious child
- Free from AI-detectable patterns (avoid repetitive structures, robotic phrasing)
- Engaging with fun real-world examples and relatable stories

IMPORTANT: Write content that feels genuinely human-written and super easy to read.`;

  const cityContext = targetCity ? `
CITY-SPECIFIC TARGETING:
- Target City: ${targetCity}
- Target Country: ${targetCountry || 'not specified'}
- Local Terms to naturally include: ${localTerms || 'none specified'}
- IMPORTANT: Mention ${targetCity} naturally throughout the article (aim for 8-12 mentions)

INTERNAL LINKING:
${internalLinks || `- [interior design software in ${targetCity}](/${targetCountry?.toLowerCase() || 'us'}/${targetCity.toLowerCase().replace(/\s+/g, '-')})`}
` : '';

  const userPrompt = `Write a comprehensive, SEO-optimized blog article about: "${topic}"

Target Keywords: ${keywords || 'interior design, quotation, invoice, project management'}
Target Audience: ${targetAudience}
${cityContext}

REQUIREMENTS:
1. READABILITY: Write so an 8-year-old can understand
2. LENGTH: 2500-3500 words
3. Use proper heading hierarchy (H1, H2, H3)
4. Include Table of Contents
5. Add 2-3 case studies with specific examples
6. Include 3-5 authoritative reference links
7. End with a call to action to try Intorza

At the very end, add:
---
EXCERPT: [2-3 sentence summary]
---`;

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
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
    throw new Error(`AI gateway error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const generatedContent = data.choices?.[0]?.message?.content;

  if (!generatedContent) {
    throw new Error("No content generated");
  }

  // Parse excerpt from content
  let content = generatedContent;
  let excerpt = '';

  const excerptMatch = content.match(/---\s*\nEXCERPT:\s*(.+?)\n---/s);
  if (excerptMatch) {
    excerpt = excerptMatch[1].trim();
    content = content.replace(/---\s*\nEXCERPT:.+?---/s, '').trim();
  }

  return { content, excerpt };
}