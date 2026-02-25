import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, BarChart3 } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  { icon: Zap, label: "AI-Powered Extraction" },
  { icon: Shield, label: "Real-Time Analysis" },
  { icon: BarChart3, label: "Structured Output" },
];

const HeroSection = () => (
  <section className="relative overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    />
    <div className="absolute inset-0 bg-navy-gradient opacity-80" />

    <div className="container relative z-10 flex min-h-[85vh] flex-col items-center justify-center py-24 text-center">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
        <Zap className="h-3.5 w-3.5" />
        Powered by Generative AI
      </div>

      <h1 className="mb-6 max-w-4xl font-display text-5xl font-bold leading-tight tracking-tight text-primary-foreground md:text-6xl lg:text-7xl animate-fade-in">
        Financial News{" "}
        <span className="text-gradient-gold">Entity Extraction</span>
      </h1>

      <p className="mb-10 max-w-2xl text-lg leading-relaxed text-primary-foreground/70 font-body animate-fade-in [animation-delay:150ms] opacity-0">
        Extract companies, tickers, people, events, and monetary values from
        financial news articles instantly. Built for investors, analysts, and
        fintech professionals.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in [animation-delay:300ms] opacity-0">
        <Link to="/dashboard">
          <Button variant="hero" size="lg" className="gap-2 text-base px-8 py-6">
            Start Analyzing <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
        <Link to="/about">
          <Button variant="heroOutline" size="lg" className="text-base px-8 py-6">
            Learn More
          </Button>
        </Link>
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-center gap-8 animate-fade-in [animation-delay:500ms] opacity-0">
        {features.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-2.5 text-sm font-medium text-primary-foreground/60"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent/15">
              <Icon className="h-4 w-4 text-accent" />
            </div>
            {label}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HeroSection;
