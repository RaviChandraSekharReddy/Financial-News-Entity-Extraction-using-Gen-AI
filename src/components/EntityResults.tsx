import { Building2, User, Calendar, DollarSign, TrendingUp, Tag, AlertCircle } from "lucide-react";

export interface ExtractedEntities {
  companies?: string[];
  people?: string[];
  tickers?: string[];
  events?: string[];
  monetary_values?: string[];
  dates?: string[];
}

const categoryMeta = [
  { key: "companies" as const, label: "Companies", icon: Building2, color: "bg-accent/15 text-accent border-accent/20" },
  { key: "tickers" as const, label: "Tickers", icon: TrendingUp, color: "bg-primary/15 text-primary border-primary/20" },
  { key: "people" as const, label: "People", icon: User, color: "bg-success/15 text-success border-success/20" },
  { key: "events" as const, label: "Events", icon: Tag, color: "bg-warning/15 text-warning border-warning/20" },
  { key: "monetary_values" as const, label: "Monetary Values", icon: DollarSign, color: "bg-destructive/15 text-destructive border-destructive/20" },
  { key: "dates" as const, label: "Dates", icon: Calendar, color: "bg-muted-foreground/15 text-muted-foreground border-muted-foreground/20" },
];

interface Props {
  entities: ExtractedEntities;
}

const EntityResults = ({ entities }: Props) => {
  const hasAny = categoryMeta.some((c) => entities[c.key]?.length);

  if (!hasAny) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-6 text-muted-foreground">
        <AlertCircle className="h-5 w-5" />
        No entities found in the provided text.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {categoryMeta.map(({ key, label, icon: Icon, color }, i) => {
        const items = entities[key];
        if (!items?.length) return null;
        return (
          <div
            key={key}
            className="rounded-xl border border-border bg-card p-5 shadow-card animate-fade-in opacity-0"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="mb-3 flex items-center gap-2.5">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${color.split(" ").slice(0, 2).join(" ")}`}>
                <Icon className="h-4 w-4" />
              </div>
              <h3 className="font-display text-sm font-semibold text-foreground">{label}</h3>
              <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                {items.length}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {items.map((val) => (
                <span
                  key={val}
                  className={`rounded-md border px-2.5 py-1 text-xs font-medium ${color}`}
                >
                  {val}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EntityResults;
