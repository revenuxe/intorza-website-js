import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Clock, Send, ArrowRight, Linkedin, Twitter, Instagram, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import intorzaLogo from "@/assets/intorza-logo.png";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be less than 255 characters"),
  subject: z.string().trim().min(5, "Subject must be at least 5 characters").max(200, "Subject must be less than 200 characters"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Message must be less than 2000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("inquiries").insert({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      });

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you within 24 hours.",
      });

      form.reset();
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later or email us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      detail: "intorza.com@gmail.com",
      description: "We'll respond within 24 hours",
      href: "mailto:intorza.com@gmail.com",
    },
    {
      icon: MapPin,
      title: "Our Location",
      detail: "Bangalore, India",
      description: "Interior design hub of India",
      href: null,
    },
    {
      icon: Clock,
      title: "Business Hours",
      detail: "Mon - Sat: 9AM - 6PM",
      description: "IST (Indian Standard Time)",
      href: null,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us - Intorza | Get in Touch with Our Team</title>
        <meta
          name="description"
          content="Have questions about Intorza? Contact our team for support, partnerships, or general inquiries. We're here to help streamline your interior design business."
        />
        <meta name="keywords" content="contact intorza, interior design software support, business management help, customer service" />
        <link rel="canonical" href="https://intorza.com/contact" />
      </Helmet>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container-custom flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <img src={intorzaLogo} alt="Intorza" className="h-10 w-auto" />
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Button asChild variant="default" size="sm">
              <a href="https://app.intorza.com/auth">Login</a>
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 lg:py-28 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          </div>

          <div className="container-custom relative">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
                <MessageSquare className="w-4 h-4" />
                <span>We'd Love to Hear From You</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                Get in <span className="text-primary">Touch</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Have questions about Intorza or need assistance? Our team is here to help you streamline your interior design business.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="py-12 -mt-8 relative z-10">
          <div className="container-custom">
            <div className="grid md:grid-cols-3 gap-6">
              {contactInfo.map((item, index) => (
                <div
                  key={item.title}
                  className="group bg-card border border-border rounded-2xl p-6 text-center hover:shadow-xl hover:border-primary/30 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <item.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                  {item.href ? (
                    <a href={item.href} className="text-primary font-medium hover:underline">
                      {item.detail}
                    </a>
                  ) : (
                    <p className="text-foreground font-medium">{item.detail}</p>
                  )}
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Contact Section */}
        <section className="py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Left - Form */}
              <div className="bg-card border border-border rounded-3xl p-8 lg:p-10 shadow-lg animate-fade-in">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
                  Send Us a Message
                </h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-medium">Full Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="John Doe"
                                className="h-12 bg-background border-border/50 focus:border-primary"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-medium">Email Address</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="john@company.com"
                                className="h-12 bg-background border-border/50 focus:border-primary"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground font-medium">Subject</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="How can we help you?"
                              className="h-12 bg-background border-border/50 focus:border-primary"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground font-medium">Your Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your inquiry, questions, or how we can assist you..."
                              className="min-h-[150px] bg-background border-border/50 focus:border-primary resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-14 text-lg font-semibold group"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Send Message
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>

              {/* Right - Info */}
              <div className="space-y-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                    Let's Build Something Amazing Together
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Whether you're looking to streamline your interior design business, have questions about our platform, 
                    or want to explore partnership opportunities, we're here to help.
                  </p>
                </div>

                {/* Quick Links */}
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 border border-primary/20">
                  <h3 className="font-display font-semibold text-lg text-foreground mb-4">Quick Links</h3>
                  <div className="space-y-3">
                    <Link 
                      to="/about" 
                      className="flex items-center justify-between p-3 bg-background/50 rounded-xl hover:bg-background transition-colors group"
                    >
                      <span className="text-foreground font-medium">Learn About Us</span>
                      <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link 
                      to="/careers" 
                      className="flex items-center justify-between p-3 bg-background/50 rounded-xl hover:bg-background transition-colors group"
                    >
                      <span className="text-foreground font-medium">Join Our Team</span>
                      <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link 
                      to="/blog" 
                      className="flex items-center justify-between p-3 bg-background/50 rounded-xl hover:bg-background transition-colors group"
                    >
                      <span className="text-foreground font-medium">Read Our Blog</span>
                      <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-4">Connect With Us</h3>
                  <div className="flex gap-4">
                    <a
                      href="#"
                      className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-secondary-foreground/70 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-secondary-foreground/70 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-secondary-foreground/70 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* FAQ Teaser */}
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">Frequently Asked Questions</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Find quick answers to common questions about Intorza, pricing, and features.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <a href="https://app.intorza.com" className="flex items-center justify-center gap-2">
                      Explore Intorza
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-primary/80">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-4">
              Ready to Transform Your Interior Business?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Join hundreds of interior designers and contractors who trust Intorza to manage their business.
            </p>
            <Button asChild size="lg" variant="secondary" className="font-semibold">
              <a href="https://app.intorza.com/auth" className="flex items-center gap-2">
                Get Started Today
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link to="/">
              <img src={intorzaLogo} alt="Intorza" className="h-8 w-auto brightness-0 invert" />
            </Link>
            <p className="text-secondary-foreground/60 text-sm">
              © {new Date().getFullYear()} Intorza. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <Link to="/terms" className="text-secondary-foreground/60 hover:text-primary transition-colors">
                Terms
              </Link>
              <Link to="/privacy" className="text-secondary-foreground/60 hover:text-primary transition-colors">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Contact;
