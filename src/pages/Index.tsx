import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ExampleOutput from "@/components/ExampleOutput";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <ExampleOutput />

    {/* CTA */}
    <section className="py-20">
      <div className="container text-center">
        <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl mb-4">
          Ready to Analyze Financial News?
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-muted-foreground font-body text-lg">
          Start extracting actionable intelligence from news articles in seconds.
        </p>
        <Link to="/dashboard">
          <Button variant="hero" size="lg" className="gap-2 text-base px-8 py-6">
            Go to Dashboard <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>

    {/* Footer */}
    <footer className="border-t border-border bg-muted/30 py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground font-body">
          © 2026 FinEntityAI — Financial News Entity Extraction
        </p>
        <p className="text-sm text-muted-foreground font-body">
          Built by Ravi Chandra Sekhar Reddy
        </p>
      </div>
    </footer>
  </div>
);

export default Index;
