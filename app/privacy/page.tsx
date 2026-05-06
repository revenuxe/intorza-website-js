import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy - How Intorza Protects Your Data",
  description: "Learn how Intorza collects, uses, and protects your personal and business data. Our privacy policy explains your rights and our data security practices.",
  keywords: "intorza privacy policy, data protection, GDPR compliance, data security, personal information protection, business data privacy",
  alternates: {
    canonical: "https://intorza.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          <Breadcrumbs items={[{ name: "Privacy Policy", url: "https://intorza.com/privacy" }]} className="mb-8" />
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mb-12">
            Last updated: December 9, 2025
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                1. Introduction
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Intorza ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
                explains how we collect, use, disclose, and safeguard your information when you use our 
                website and services (collectively, the "Service").
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Please read this Privacy Policy carefully. By accessing or using our Service, you acknowledge 
                that you have read, understood, and agree to be bound by this Privacy Policy. If you do not 
                agree with the terms of this Privacy Policy, please do not access the Service.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to make changes to this Privacy Policy at any time and for any reason. 
                We will alert you about any changes by updating the "Last updated" date of this Privacy Policy.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                2. Information We Collect
              </h2>
              
              <h3 className="font-display text-xl font-medium text-foreground mb-3 mt-6">
                2.1 Personal Data
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Personally identifiable information that you voluntarily provide to us when registering or 
                using our Service may include:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Name (first name and last name)</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Business name and address</li>
                <li>Billing address and payment information</li>
                <li>Job title and professional information</li>
                <li>Profile picture (optional)</li>
              </ul>

              <h3 className="font-display text-xl font-medium text-foreground mb-3 mt-6">
                2.2 Business Data
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Data related to your business operations that you enter into the Service:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Client information and contact details</li>
                <li>Project details and site measurements</li>
                <li>Quotations and invoices</li>
                <li>Payment records and transaction history</li>
                <li>Team member information</li>
                <li>Documents and files you upload</li>
              </ul>

              <h3 className="font-display text-xl font-medium text-foreground mb-3 mt-6">
                2.3 Automatically Collected Data
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Information automatically collected when you access the Service:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Referring URLs</li>
                <li>Device information</li>
                <li>Pages viewed and links clicked</li>
                <li>Time and date of your visit</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>To provide, operate, and maintain our Service</li>
                <li>To improve, personalize, and expand our Service</li>
                <li>To understand and analyze how you use our Service</li>
                <li>To develop new products, services, features, and functionality</li>
                <li>To communicate with you, either directly or through one of our partners</li>
                <li>To process your transactions and manage your orders</li>
                <li>To send you emails, including marketing communications (which you can opt out of)</li>
                <li>To find and prevent fraud</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                4. Data Security
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                5. Data Retention
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                6. Your Data Protection Rights
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Depending on your location, you may have certain rights regarding your personal data, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>The right to access – You have the right to request copies of your personal data.</li>
                <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate.</li>
                <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
                <li>The right to restrict processing – You have the right to request that we restrict the processing of your personal data.</li>
                <li>The right to object to processing – You have the right to object to our processing of your personal data.</li>
                <li>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization.</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                7. Contact Us
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, please contact us at intorza.com@gmail.com.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
