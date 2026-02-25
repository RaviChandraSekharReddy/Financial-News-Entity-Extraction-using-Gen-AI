# FinEntityAI — Setup Guide

This guide walks you through setting up FinEntityAI from scratch.

---

## Prerequisites

- **Node.js 18+** — [Download](https://nodejs.org/)
- **npm** or **bun** — Package manager
- **Supabase Account** — [Sign up free](https://supabase.com/)
- **Supabase CLI** — For deploying edge functions

---

## Step 1: Clone the Repository

```bash
git clone https://github.com/RaviChandraSekharReddy/Financial-News-Entity-Extraction-using-Gen-AI.git
cd Financial-News-Entity-Extraction-using-Gen-AI
npm install
```

---

## Step 2: Create Supabase Project

1. Go to [supabase.com](https://supabase.com/) and create a new project
2. Note your **Project URL** and **Anon Key** from Settings → API

---

## Step 3: Configure Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key_here
VITE_SUPABASE_PROJECT_ID=YOUR_PROJECT_ID
```

---

## Step 4: Deploy Edge Functions

The AI extraction backend runs as a Supabase Edge Function.

```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref YOUR_PROJECT_ID

# Set the AI API key secret
supabase secrets set GEMINI_API_KEY=your_gemini_api_key

# Deploy the extraction function
supabase functions deploy extract-entities
```

### Edge Function: `extract-entities`

This function:
- Accepts raw financial news article text via POST request
- Sends it to **Google Gemini 3 Flash** via the Gemini API
- Uses structured tool calling to enforce a 7-section JSON output
- Returns: headline summary, key facts, entities, sentiment, investment highlights, term explanations, investor takeaway

---

## Step 5: Run the Application

```bash
# Start development server
npm run dev

# The app will be available at http://localhost:8080
```

---

## Step 6: Build for Production

```bash
npm run build
npm run preview
```

---

## Troubleshooting

### "AI service not configured" error
- Ensure `GEMINI_API_KEY` is set in your Supabase secrets
- Run: `supabase secrets list` to verify

### "Rate limit exceeded" error
- The AI Gateway has rate limits — wait a moment and try again

### Edge function not responding
- Check function logs: `supabase functions logs extract-entities`
- Ensure the function is deployed: `supabase functions list`

---

## Architecture

```
User → Dashboard UI → Supabase Client → extract-entities Edge Function → Gemini 3 Flash API → Structured JSON Response → UI Display
```

For more details, see the [README](README.md).
