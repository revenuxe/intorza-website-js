import { MetadataRoute } from 'next';
import { createStaticClient } from '@/lib/supabase';
import { countries } from '@/data/countries';
import { cities } from '@/data/cities';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://intorza.com';
  const supabase = createStaticClient();

  // Fetch all blog posts
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug, updated_at')
    .eq('published', true);

  const blogEntries = (posts || []).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Country pages
  const countryEntries = countries.map((country) => ({
    url: `${baseUrl}/${country.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // City pages
  const cityEntries = cities.map((city) => ({
    url: `${baseUrl}/${city.countrySlug}/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/careers',
    '/contact',
    '/blog',
    '/terms',
    '/privacy',
    '/cookies',
    '/refund',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  return [...staticPages, ...blogEntries, ...countryEntries, ...cityEntries];
}
