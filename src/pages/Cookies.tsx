import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Cookies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <section className="section-padding">
          <div className="container-custom max-w-4xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8">
              Cookie Policy
            </h1>
            <p className="text-muted-foreground mb-8">
              Last updated: December 9, 2024
            </p>

            <div className="prose prose-lg max-w-none text-foreground/80">
              <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                1. What Are Cookies
              </h2>
              <p className="mb-4">
                Cookies are small text files that are placed on your computer or mobile device 
                when you visit a website. They are widely used to make websites work more 
                efficiently and to provide information to the owners of the site.
              </p>

              <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                2. How We Use Cookies
              </h2>
              <p className="mb-4">
                Intorza uses cookies for several purposes:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly. These cannot be disabled.</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website.</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences and settings.</li>
                <li><strong>Marketing Cookies:</strong> Track your activity to deliver relevant advertisements.</li>
              </ul>

              <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                3. Types of Cookies We Use
              </h2>
              
              <h3 className="font-display text-xl font-semibold text-foreground mt-6 mb-3">
                Session Cookies
              </h3>
              <p className="mb-4">
                These are temporary cookies that expire when you close your browser. They are 
                essential for the website to function and cannot be switched off.
              </p>

              <h3 className="font-display text-xl font-semibold text-foreground mt-6 mb-3">
                Persistent Cookies
              </h3>
              <p className="mb-4">
                These cookies remain on your device for a set period or until you delete them. 
                They help us recognize you when you return to our website.
              </p>

              <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                4. Managing Cookies
              </h2>
              <p className="mb-4">
                Most web browsers allow you to control cookies through their settings. You can:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>View what cookies are stored on your device</li>
                <li>Delete all or specific cookies</li>
                <li>Block cookies from being set</li>
                <li>Set your browser to notify you when cookies are being set</li>
              </ul>
              <p className="mb-4">
                Please note that blocking certain cookies may affect your experience on our website 
                and limit the services we can provide.
              </p>

              <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                5. Third-Party Cookies
              </h2>
              <p className="mb-4">
                We may use third-party services that set their own cookies, including:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Google Analytics for website analytics</li>
                <li>Payment processors for secure transactions</li>
                <li>Social media platforms for sharing features</li>
              </ul>

              <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                6. Updates to This Policy
              </h2>
              <p className="mb-4">
                We may update this Cookie Policy from time to time. Any changes will be posted 
                on this page with an updated revision date.
              </p>

              <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                7. Contact Us
              </h2>
              <p className="mb-4">
                If you have any questions about our use of cookies, please contact us at:{" "}
                <a href="mailto:intorza.com@gmail.com" className="text-primary hover:underline">
                  intorza.com@gmail.com
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Cookies;
