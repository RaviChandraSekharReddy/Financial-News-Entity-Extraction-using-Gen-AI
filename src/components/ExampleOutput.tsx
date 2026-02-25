import { Building2, User, Calendar, DollarSign, TrendingUp, Tag } from "lucide-react";

const sampleOutput = {
  companies: ["Tesla Inc.", "Apple Inc.", "NVIDIA Corp."],
  people: ["Elon Musk", "Tim Cook", "Jensen Huang"],
  tickers: ["TSLA", "AAPL", "NVDA"],
  events: ["Earnings Report", "Product Launch", "Acquisition"],
  monetary_values: ["$3.2B", "$197.5M", "$42.7B"],
  dates: ["2026-02-15", "2026-Q1", "FY2025"],
};

const categories = [
  { key: "companies", label: "Companies", icon: Building2, color: "bg-accent/15 text-accent" },
  { key: "people", label: "People", icon: User, color: "bg-success/15 text-success" },
  { key: "tickers", label: "Tickers", icon: TrendingUp, color: "bg-primary/15 text-primary" },
  { key: "events", label: "Events", icon: Tag, color: "bg-warning/15 text-warning" },
  { key: "monetary_values", label: "Monetary Values", icon: DollarSign, color: "bg-destructive/15 text-destructive" },
  { key: "dates", label: "Dates", icon: Calendar, color: "bg-muted-foreground/15 text-muted-foreground" },
] as const;

const ExampleOutput = () => (
  <section className="bg-muted/30 py-24">
    <div className="container">
      <div className="mx-auto max-w-2xl text-center mb-14">
        <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl mb-4">
          Structured Entity Output
        </h2>
        <p className="text-muted-foreground font-body text-lg">
          Our AI extracts and categorizes financial entities into clean, actionable data
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map(({ key, label, icon: Icon, color }, i) => (
          <div
            key={key}
            className="rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-elevated animate-fade-in opacity-0"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="mb-3 flex items-center gap-2.5">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <h3 className="font-display text-sm font-semibold text-foreground">{label}</h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {sampleOutput[key].map((val) => (
                <span
                  key={val}
                  className="rounded-md border border-border bg-muted px-2.5 py-1 text-xs font-medium text-foreground"
                >
                  {val}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ExampleOutput;
