import Navbar from "@/components/Navbar";
import { FileText, Cpu, Database, ArrowRight, Sparkles, BarChart3, Shield } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Input",
    desc: "Paste raw financial news text from any source — articles, press releases, or earnings reports.",
  },
  {
    icon: Cpu,
    title: "AI Processing",
    desc: "Our Gen AI model analyzes text using domain-aware NLP to identify financial entities with high precision.",
  },
  {
    icon: Database,
    title: "Structured Output",
    desc: "Entities are categorized into companies, tickers, people, events, monetary values and dates in clean JSON.",
  },
];

const useCases = [
  { icon: BarChart3, title: "Market Intelligence", desc: "Track company mentions and events across news in real-time." },
  { icon: Shield, title: "Risk & Compliance", desc: "Monitor regulatory events and flag relevant entities automatically." },
  { icon: Sparkles, title: "FinTech Analytics", desc: "Power automated research pipelines and trading signal generation." },
];

const About = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="container py-16">
      <div className="mx-auto max-w-3xl text-center mb-16">
        <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl mb-4">
          How It Works
        </h1>
        <p className="text-muted-foreground font-body text-lg">
          A Generative AI-based system that extracts key financial entities from news articles,
          automating preprocessing, extraction, and structured output generation.
        </p>
      </div>

      {/* Pipeline */}
      <div className="mx-auto max-w-4xl mb-20">
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="relative">
              <div className="rounded-xl border border-border bg-card p-6 shadow-card h-full animate-fade-in opacity-0" style={{ animationDelay: `${i * 120}ms` }}>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 mb-4">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <div className="mb-1 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
                </div>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{desc}</p>
              </div>
              {i < 2 && (
                <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                  <ArrowRight className="h-5 w-5 text-accent" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Use Cases */}
      <div className="mx-auto max-w-3xl text-center mb-10">
        <h2 className="font-display text-3xl font-bold text-foreground mb-4">Use Cases</h2>
        <p className="text-muted-foreground font-body">Built for finance professionals and investors</p>
      </div>
      <div className="mx-auto max-w-4xl grid gap-6 md:grid-cols-3 mb-16">
        {useCases.map(({ icon: Icon, title, desc }, i) => (
          <div
            key={title}
            className="rounded-xl border border-border bg-card p-6 shadow-card animate-fade-in opacity-0"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-4">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-display text-base font-semibold text-foreground mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground font-body">{desc}</p>
          </div>
        ))}
      </div>

      {/* Tech Stack */}
      <div className="mx-auto max-w-2xl rounded-xl border border-border bg-card p-8 shadow-card text-center">
        <h2 className="font-display text-2xl font-bold text-foreground mb-4">Tech Stack</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {["React", "TypeScript", "Tailwind CSS", "Supabase", "Generative AI", "NLP"].map((t) => (
            <span key={t} className="rounded-lg border border-border bg-muted px-3 py-1.5 text-sm font-medium text-foreground">
              {t}
            </span>
          ))}
        </div>
      </div>
    </main>
  </div>
);

export default About;
