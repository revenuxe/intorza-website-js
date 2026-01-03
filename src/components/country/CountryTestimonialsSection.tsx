import { Star, Quote } from "lucide-react";
import { CountryData } from "@/data/countries";

interface CountryTestimonialsSectionProps {
  country: CountryData;
}

const CountryTestimonialsSection = ({ country }: CountryTestimonialsSectionProps) => {
  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Interior Designer",
      company: "AJ Interiors",
      content: `Intorza has completely transformed how I manage my projects in ${country.name}. The quotation builder alone has saved me hours every week. Highly recommended!`,
      rating: 5,
    },
    {
      name: "Sarah Mitchell",
      role: "Founder",
      company: "Design Studio",
      content: `Finally, a tool built specifically for interior professionals. The payment tracking feature has helped me reduce outstanding dues by 60%.`,
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Project Manager",
      company: "Elite Furnishings",
      content: `Managing multiple projects across teams was a nightmare before Intorza. Now everything is organized, tracked, and accessible.`,
      rating: 5,
    },
  ];

  return (
    <section className="section-padding bg-secondary text-secondary-foreground overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary-foreground/80 font-semibold text-sm uppercase tracking-wider mb-4">
            Testimonials
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Loved by Interior{" "}
            <span className="text-primary">Professionals in {country.name}</span>
          </h2>
          <p className="text-lg text-secondary-foreground/70">
            See what our users in {country.name} have to say about how Intorza has helped 
            them grow their business.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="relative bg-secondary-foreground/5 backdrop-blur-sm rounded-2xl p-8 border border-secondary-foreground/10 hover:border-primary/50 transition-all duration-300 group"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/20 group-hover:text-primary/40 transition-colors duration-300" />

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-secondary-foreground/90 leading-relaxed mb-8">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-secondary-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-secondary-foreground/60">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountryTestimonialsSection;
