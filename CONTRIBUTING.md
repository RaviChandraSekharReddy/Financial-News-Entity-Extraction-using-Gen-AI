# Contributing to FinEntityAI

Thank you for your interest in contributing to FinEntityAI! This document provides guidelines and instructions for contributing.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Financial-News-Entity-Extraction-using-Gen-AI.git
   cd Financial-News-Entity-Extraction-using-Gen-AI
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📋 Development Guidelines

### Code Style
- Use **TypeScript** for all new files
- Follow the existing **Tailwind CSS** design system — use semantic tokens from `index.css`
- Use **shadcn/ui** components where possible
- Keep components small and focused

### Commit Messages
- Use clear, descriptive commit messages
- Format: `type: description` (e.g., `feat: add ticker lookup`, `fix: sentiment display bug`)

### Pull Requests
1. Ensure your code compiles without errors
2. Test your changes locally
3. Update documentation if needed
4. Submit a PR with a clear description of changes

## 🏗 Project Structure

- `src/components/` — React components
- `src/pages/` — Page-level components
- `src/hooks/` — Custom React hooks
- `supabase/functions/` — Edge functions (Deno runtime)
- `docs/` — Documentation and screenshots

## 🐛 Bug Reports

When filing a bug report, please include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser and OS information
- Console error messages (if any)

## 💡 Feature Requests

Feature requests are welcome! Please describe:
- The problem you're trying to solve
- Your proposed solution
- Any alternatives you've considered

---

Thank you for contributing! 🎉
