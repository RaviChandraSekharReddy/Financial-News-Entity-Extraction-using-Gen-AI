import {
  Building2, User, Calendar, DollarSign, TrendingUp, Tag,
  AlertCircle, Lightbulb, BookOpen, Target, BarChart3, FileText, Quote
} from "lucide-react";

export interface FinancialAnalysis {
  headline_summary: string;
  key_facts: string[];
  entities: {
    companies: string[];
    tickers: string[];
    people: string[];
    events: string[];
    monetary_values: string[];
    dates: string[];
  };
  sentiment: {
    overall: string;
    market_impact: string;
    explanation: string;
  };
  investment_highlights: string[];
  term_explanations: { term: string; explanation: string }[];
  investor_takeaway: string;
}

const sentimentColor: Record<string, string> = {
  "Very Positive": "text-success",
  "Positive": "text-success",
  "Neutral": "text-muted-foreground",
  "Negative": "text-destructive",
  "Very Negative": "text-destructive",
};

const impactColor: Record<string, string> = {
  Bullish: "text-success",
  Bearish: "text-destructive",
  Neutral: "text-muted-foreground",
  Uncertain: "text-warning",
};

const entityMeta = [
  { key: "companies" as const, label: "Companies", icon: Building2, color: "bg-accent/15 text-accent border-accent/20" },
  { key: "tickers" as const, label: "Tickers", icon: TrendingUp, color: "bg-primary/15 text-primary border-primary/20" },
  { key: "people" as const, label: "People", icon: User, color: "bg-success/15 text-success border-success/20" },
  { key: "events" as const, label: "Events", icon: Tag, color: "bg-warning/15 text-warning border-warning/20" },
  { key: "monetary_values" as const, label: "Monetary Values", icon: DollarSign, color: "bg-destructive/15 text-destructive border-destructive/20" },
  { key: "dates" as const, label: "Dates", icon: Calendar, color: "bg-muted-foreground/15 text-muted-foreground border-muted-foreground/20" },
];

const SectionCard = ({ icon: Icon, title, children, delay = 0 }: {
  icon: React.ElementType; title: string; children: React.ReactNode; delay?: number;
}) => (
  <div
    className="rounded-xl border border-border bg-card p-5 shadow-card animate-fade-in opacity-0"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="mb-3 flex items-center gap-2.5">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent">
        <Icon className="h-4 w-4" />
      </div>
      <h3 className="font-display text-sm font-semibold text-foreground">{title}</h3>
    </div>
    {children}
  </div>
);

interface Props {
  analysis: FinancialAnalysis;
}

const AnalysisResults = ({ analysis }: Props) => {
  return (
    <div className="space-y-4">
      {/* 1. Headline Summary */}
      <SectionCard icon={FileText} title="Headline Summary" delay={0}>
        <p className="text-sm text-foreground font-body leading-relaxed">{analysis.headline_summary}</p>
      </SectionCard>

      {/* 2. Key Facts */}
      <SectionCard icon={Target} title="Key Facts" delay={60}>
        <ul className="space-y-1.5">
          {analysis.key_facts.map((fact, i) => (
            <li key={i} className="flex gap-2 text-sm text-foreground/90 font-body">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {fact}
            </li>
          ))}
        </ul>
      </SectionCard>

      {/* 3. Extracted Entities */}
      <SectionCard icon={Building2} title="Extracted Financial Entities" delay={120}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {entityMeta.map(({ key, label, icon: EIcon, color }) => {
            const items = analysis.entities[key];
            if (!items?.length) return null;
            return (
              <div key={key} className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <EIcon className={`h-3.5 w-3.5 ${color.split(" ")[1]}`} />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</span>
                  <span className="ml-auto rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">{items.length}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {items.map((val) => (
                    <span key={val} className={`rounded-md border px-2 py-0.5 text-xs font-medium ${color}`}>{val}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>

      {/* 4. Sentiment & Market Impact */}
      <SectionCard icon={BarChart3} title="Sentiment & Market Impact" delay={180}>
        <div className="flex flex-wrap gap-4 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Sentiment:</span>
            <span className={`text-sm font-bold ${sentimentColor[analysis.sentiment.overall] || "text-foreground"}`}>
              {analysis.sentiment.overall}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Impact:</span>
            <span className={`text-sm font-bold ${impactColor[analysis.sentiment.market_impact] || "text-foreground"}`}>
              {analysis.sentiment.market_impact}
            </span>
          </div>
        </div>
        <p className="text-sm text-foreground/90 font-body leading-relaxed">{analysis.sentiment.explanation}</p>
      </SectionCard>

      {/* 5. Investment Highlights */}
      <SectionCard icon={Lightbulb} title="Investment Highlights" delay={240}>
        <ul className="space-y-1.5">
          {analysis.investment_highlights.map((h, i) => (
            <li key={i} className="flex gap-2 text-sm text-foreground/90 font-body">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-warning" />
              {h}
            </li>
          ))}
        </ul>
      </SectionCard>

      {/* 6. Term Explanations */}
      {analysis.term_explanations?.length > 0 && (
        <SectionCard icon={BookOpen} title="Key Term Explanations" delay={300}>
          <div className="space-y-2.5">
            {analysis.term_explanations.map(({ term, explanation }, i) => (
              <div key={i}>
                <span className="text-sm font-semibold text-foreground">{term}: </span>
                <span className="text-sm text-foreground/80 font-body">{explanation}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* 7. Investor Takeaway */}
      <div
        className="rounded-xl border-2 border-accent/30 bg-accent/5 p-5 shadow-card animate-fade-in opacity-0"
        style={{ animationDelay: "360ms" }}
      >
        <div className="flex items-start gap-3">
          <Quote className="h-6 w-6 text-accent shrink-0 mt-0.5" />
          <div>
            <h3 className="font-display text-sm font-semibold text-accent mb-1">Investor Takeaway</h3>
            <p className="text-sm font-medium text-foreground font-body leading-relaxed">{analysis.investor_takeaway}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
