import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text } = await req.json();

    if (!text || typeof text !== "string" || text.trim().length < 10) {
      return new Response(
        JSON.stringify({ error: "Please provide a valid news article (at least 10 characters)." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "AI service not configured." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = `You are an advanced financial intelligence assistant specialized in analyzing financial news, stock market events, and investment-related content. Your goal is to help investors understand news quickly, accurately, and deeply.

When given a financial news article, you MUST return a structured analysis following this EXACT format using the tool provided. Fill every field thoroughly.

Rules:
- Be extremely accurate — do NOT invent facts, exaggerate, or assume things not in the text
- Use neutral, professional language
- If something is unclear or uncertain, say so clearly
- Keep answers concise yet comprehensive
- Deduplicate entities
- Be thorough - extract every relevant entity`;

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/openai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GEMINI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: text.trim() },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "analyze_financial_article",
              description: "Perform a full 7-section financial intelligence analysis of a news article",
              parameters: {
                type: "object",
                properties: {
                  headline_summary: {
                    type: "string",
                    description: "1-2 sentence ultra-concise summary of the main event/story"
                  },
                  key_facts: {
                    type: "array",
                    items: { type: "string" },
                    description: "4-8 most important factual bullet points (who, what, when, where, how much, why)"
                  },
                  entities: {
                    type: "object",
                    properties: {
                      companies: { type: "array", items: { type: "string" } },
                      tickers: { type: "array", items: { type: "string" } },
                      people: { type: "array", items: { type: "string" } },
                      events: { type: "array", items: { type: "string" } },
                      monetary_values: { type: "array", items: { type: "string" } },
                      dates: { type: "array", items: { type: "string" } },
                    },
                    required: ["companies", "tickers", "people", "events", "monetary_values", "dates"],
                    additionalProperties: false,
                  },
                  sentiment: {
                    type: "object",
                    properties: {
                      overall: { type: "string", enum: ["Very Positive", "Positive", "Neutral", "Negative", "Very Negative"] },
                      market_impact: { type: "string", enum: ["Bullish", "Bearish", "Neutral", "Uncertain"] },
                      explanation: { type: "string", description: "1-3 sentence explanation of sentiment and market impact" },
                    },
                    required: ["overall", "market_impact", "explanation"],
                    additionalProperties: false,
                  },
                  investment_highlights: {
                    type: "array",
                    items: { type: "string" },
                    description: "3-6 bullet points: opportunities, risks, affected sectors, red flags"
                  },
                  term_explanations: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        term: { type: "string" },
                        explanation: { type: "string" },
                      },
                      required: ["term", "explanation"],
                      additionalProperties: false,
                    },
                    description: "Plain-English explanation of major companies, people, or unusual financial terms"
                  },
                  investor_takeaway: {
                    type: "string",
                    description: "The single most important thing an investor should remember from this article"
                  },
                },
                required: [
                  "headline_summary",
                  "key_facts",
                  "entities",
                  "sentiment",
                  "investment_highlights",
                  "term_explanations",
                  "investor_takeaway",
                ],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "analyze_financial_article" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add funds." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      return new Response(
        JSON.stringify({ error: "AI extraction failed. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiData = await response.json();

    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    let analysis;

    if (toolCall?.function?.arguments) {
      analysis = typeof toolCall.function.arguments === "string"
        ? JSON.parse(toolCall.function.arguments)
        : toolCall.function.arguments;
    } else {
      const content = aiData.choices?.[0]?.message?.content || "";
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Could not parse AI response");
      }
    }

    return new Response(
      JSON.stringify({ analysis }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("extract-entities error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Extraction failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
