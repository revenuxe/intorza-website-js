import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CountryHeroSection from "@/components/country/CountryHeroSection";
import ProCTA from "@/components/ProCTA";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import { countries, getCountryBySlug } from "@/data/countries";
import { getCitiesByCountrySlug } from "@/data/cities";
import { SITE_URL } from "@/lib/site";
import { softwareAppSchema } from "@/lib/seo";

export const revalidate = 3600;
export function generateStaticParams() { return countries.map(({ slug }) => ({ country: slug })); }
export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const country = getCountryBySlug((await params).country); if (!country) return {};
  const url = `${SITE_URL}/${country.slug}`;
  return { title: country.seoTitle, description: country.seoDescription, keywords: country.seoKeywords, alternates: { canonical: url }, robots: { index: true, follow: true }, openGraph: { title: country.seoTitle, description: country.seoDescription, url, locale: country.locale.replace("-", "_") } };
}
export default async function CountryPage({ params }: { params: Promise<{ country: string }> }) {
  const country = getCountryBySlug((await params).country); if (!country) notFound(); const cities = getCitiesByCountrySlug(country.slug); const url = `${SITE_URL}/${country.slug}`;
  return <div className="min-h-screen bg-background"><Header /><main><CountryHeroSection country={country} /><ProCTA price={country.price} currency={country.currency} countryName={country.name} /><FeaturesSection /><HowItWorksSection />{cities.length > 0 && <section className="section-padding bg-muted/30"><div className="container-custom max-w-5xl text-center"><h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Cities we serve in {country.name}</h2><p className="text-muted-foreground mb-8">Localized interior design software for every major city.</p><div className="flex flex-wrap justify-center gap-3">{cities.map((city) => <Link key={city.slug} href={`/${country.slug}/${city.slug}`} className="px-4 py-2 rounded-full bg-card border border-border hover:border-primary hover:text-primary transition-colors">{city.name}</Link>)}</div></div></section>}<TestimonialsSection countryName={country.name} /><CTASection countryName={country.name} trustedByText={country.trustedByText} /></main><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema({ url, price: String(country.priceValue), currency: country.currency, name: `Intorza — Interior Design Software ${country.name}` })) }} /></div>;
}
