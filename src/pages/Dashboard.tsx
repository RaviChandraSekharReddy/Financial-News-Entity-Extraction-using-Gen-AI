import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AnalysisResults, { FinancialAnalysis } from "@/components/AnalysisResults";
import { Loader2, Sparkles, FileText, Newspaper } from "lucide-react";
import Navbar from "@/components/Navbar";

const sampleArticle = `Tesla shares surged 8% on Tuesday after CEO Elon Musk announced a $3.2 billion investment in a new Gigafactory in Texas. The move comes amid growing competition from rivals like BYD and Rivian. Wall Street analysts at Goldman Sachs raised their price target for TSLA to $425, citing strong Q1 2026 earnings. Meanwhile, Apple Inc. (AAPL) reported record revenue of $197.5 billion for fiscal year 2025, driven by iPhone 17 sales. Tim Cook said the company plans an acquisition worth $42.7 billion in the AI sector. NVIDIA (NVDA) CEO Jensen Huang presented at CES 2026, unveiling the next-generation Blackwell Ultra GPUs.`;

const Dashboard = () => {
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState<FinancialAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleExtract = async () => {
    if (!text.trim()) {
      toast({ title: "Please enter some text", variant: "destructive" });
      return;
    }

    setLoading(true);
    setAnalysis(null);

    try {
      const { data, error } = await supabase.functions.invoke("extract-entities", {
        body: { text: text.trim() },
      });

      if (error) throw error;
      if (data?.error) {
        toast({ title: "Error", description: data.error, variant: "destructive" });
        return;
      }

      setAnalysis(data.analysis);
      toast({ title: "Analysis complete!", description: "Full financial intelligence report generated." });
    } catch (err: any) {
      console.error("Extraction error:", err);
      toast({
        title: "Analysis failed",
        description: err.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container py-10">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl mb-2">
            Financial Intelligence Dashboard
          </h1>
          <p className="text-muted-foreground font-body text-lg">
            Paste a financial news article to get a complete AI-powered intelligence report
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Input Panel */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-xl border border-border bg-card p-6 shadow-card lg:sticky lg:top-6">
              <div className="flex items-center gap-2 mb-4">
                <Newspaper className="h-5 w-5 text-accent" />
                <h2 className="font-display text-lg font-semibold text-foreground">Input Article</h2>
              </div>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your financial news article here..."
                className="min-h-[280px] resize-none font-body text-sm"
              />
              <div className="mt-4 flex gap-2">
                <Button
                  onClick={handleExtract}
                  disabled={loading || !text.trim()}
                  className="gap-2 flex-1"
                  variant="hero"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                  {loading ? "Analyzing..." : "Analyze Article"}
                </Button>
              </div>
              <button
                onClick={() => setText(sampleArticle)}
                className="mt-3 flex items-center gap-1.5 text-xs font-medium text-accent hover:text-accent/80 transition-colors"
              >
                <FileText className="h-3.5 w-3.5" />
                Load sample article
              </button>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-accent" />
              <h2 className="font-display text-lg font-semibold text-foreground">Intelligence Report</h2>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-16 shadow-card">
                <Loader2 className="h-8 w-8 animate-spin text-accent mb-4" />
                <p className="text-muted-foreground font-body">AI is generating your intelligence report...</p>
              </div>
            ) : analysis ? (
              <AnalysisResults analysis={analysis} />
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 p-16 text-center">
                <Sparkles className="h-10 w-10 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground font-body">
                  Paste an article and click "Analyze Article" to generate a full intelligence report
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
