"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createBrowserClient } from "@supabase/ssr";
import { toast } from "sonner";

const FeedbackCTA = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("feedback").insert({
        name: name.trim(),
        email: email.trim() || null,
        rating,
        message: message.trim() || null,
      });

      if (error) throw error;

      toast.success("Thank you for your feedback!");
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="md:hidden py-12 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="text-center">
          <div className="flex justify-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="w-8 h-8 fill-intorza-amber text-intorza-amber"
              />
            ))}
          </div>
          <h3 className="font-display text-xl font-bold text-foreground mb-2">
            Thank You!
          </h3>
          <p className="text-muted-foreground">
            Your feedback helps us improve Intorza.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="md:hidden py-12 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <h3 className="font-display text-xl font-bold text-foreground mb-2">
            Share Your Feedback
          </h3>
          <p className="text-muted-foreground text-sm">
            Help us make Intorza better for you
          </p>
        </div>

        {/* 5 Star Rating */}
        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="transition-transform hover:scale-110 active:scale-95"
            >
              <Star
                className={`w-10 h-10 transition-colors ${
                  star <= (hoveredRating || rating)
                    ? "fill-intorza-amber text-intorza-amber"
                    : "text-muted-foreground/30"
                }`}
              />
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Your Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-background"
            required
          />
          <Input
            type="email"
            placeholder="Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-background"
          />
          <Textarea
            placeholder="Your feedback (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-background min-h-[80px]"
          />
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default FeedbackCTA;
