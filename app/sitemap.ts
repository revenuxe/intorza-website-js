import type { MetadataRoute } from "next";
import { listPublishedPosts } from "@/lib/blog.server";
import { cities } from "@/data/cities";
import { countries, getCountryByCode } from "@/data/countries";
import { SITE_URL } from "@/lib/site";

const publicPages: MetadataRoute.Sitemap = [
	{
		url: SITE_URL,
		changeFrequency: "weekly",
		priority: 1,
		images: [`${SITE_URL}/og-image.jpg`],
	},
	{
		url: `${SITE_URL}/blog`,
		changeFrequency: "daily",
		priority: 0.9,
	},
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const posts = await listPublishedPosts();
	const countryPages = countries.map((country) => ({
		url: `${SITE_URL}/${country.slug}`,
		changeFrequency: "weekly" as const,
		priority: 0.8,
	}));
	const cityPages = cities.flatMap((city) => {
		const country = getCountryByCode(city.countryCode);
		return country
			? [{
					url: `${SITE_URL}/${country.slug}/${city.slug}`,
					changeFrequency: "monthly" as const,
					priority: 0.7,
				}]
			: [];
	});
	const blogPages = posts.map((post) => ({
		url: `${SITE_URL}/blog/${post.slug}`,
		lastModified: post.updated_at,
		changeFrequency: "monthly" as const,
		priority: 0.8,
		...(post.cover_image ? { images: [post.cover_image] } : {}),
	}));

	return [...publicPages, ...countryPages, ...cityPages, ...blogPages];
}
