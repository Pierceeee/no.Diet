# no.Diet — Mediterranean Diet Quiz Funnel

A personalized Mediterranean diet quiz and lead-capture funnel built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

Users land on a hero page, take a multi-step quiz (goals, body type, activity level, measurements, dietary preferences), provide their email, view a personalized summary, and are presented with a plan offer.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [App Flow](#app-flow)
- [Deployment](#deployment)

---

## Prerequisites

Make sure the following are installed on your machine:

| Tool | Version |
|------|---------|
| [Node.js](https://nodejs.org/) | **18.18+** (LTS recommended) |
| npm / yarn / pnpm / bun | Comes with Node or install separately |

> No environment variables or external services are required for local development.

---

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/<your-username>/carni-meat.git
   cd carni-meat/my-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open the app**

   Visit [http://localhost:3000](http://localhost:3000) in your browser. The page hot-reloads as you edit files.

---

## Available Scripts

Run these from the `my-app/` directory:

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Start Next.js development server with hot reload |
| `build` | `npm run build` | Create an optimized production build |
| `start` | `npm run start` | Serve the production build (run `build` first) |
| `lint` | `npm run lint` | Run ESLint to check for code issues |

---

## Project Structure

```
my-app/
├── app/                        # Next.js App Router pages & layouts
│   ├── page.tsx                # Landing page (hero, gender selection)
│   ├── layout.tsx              # Root layout with QuizProvider context
│   ├── globals.css             # Global styles (Tailwind + custom)
│   ├── quiz/
│   │   ├── page.tsx            # 22-step quiz flow
│   │   └── layout.tsx
│   ├── email/
│   │   └── page.tsx            # Email capture step
│   ├── summary/
│   │   └── page.tsx            # Personalized results summary
│   ├── offer/
│   │   ├── page.tsx            # Plan pricing & purchase CTA
│   │   └── layout.tsx
│   └── docs/                   # Design reference screenshots
│
├── components/
│   ├── quiz/                   # Quiz-specific components
│   │   ├── age-card.tsx
│   │   ├── body-type-option.tsx
│   │   ├── info-card.tsx
│   │   └── ...
│   └── ui/
│       └── quiz-section.tsx    # Reusable quiz section wrapper
│
├── lib/                        # Shared logic & state
│   ├── quiz-context.tsx        # React context for quiz state
│   ├── quiz-data.ts            # Question definitions & default values
│   ├── generate-analysis.ts    # BMI, body fat, target weight calculations
│   ├── use-quiz-keyboard.ts    # Keyboard navigation hook
│   └── utils.ts                # Formatting & unit helpers
│
├── public/                     # Static assets (images, SVGs)
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
└── tailwind.config.ts
```

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 16](https://nextjs.org/) | React framework with App Router |
| [React 19](https://react.dev/) | UI library |
| [TypeScript 5](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |
| [DM Serif Display / DM Sans](https://fonts.google.com/) | Custom typography via Google Fonts |
| [ESLint 9](https://eslint.org/) | Code linting |

---

## App Flow

```
Landing Page (/)
  ├── "Diet for men" ──┐
  └── "Diet for women" ─┤
                        ▼
               Quiz (/quiz)
          22 steps: goals, body type,
          measurements, activity, diet
                        │
                        ▼
           Email Capture (/email)
          "Claim my plan" CTA
                        │
                        ▼
             Summary (/summary)
        Personalized analysis &
        results based on quiz data
                        │
                        ▼
              Offer (/offer)
        Plan pricing (7-day, 1-month,
        3-month) with countdown timer
```

All quiz state is managed client-side via React Context (`lib/quiz-context.tsx`). No backend or database is required.

---

## Deployment

### Vercel (Recommended)

The easiest way to deploy is with [Vercel](https://vercel.com/new):

1. Push your repo to GitHub
2. Import the project in Vercel
3. Set the **Root Directory** to `my-app`
4. Deploy — Vercel auto-detects Next.js

### Other Platforms

Build and serve the production bundle:

```bash
npm run build
npm run start
```

The app will be available on port 3000 by default. You can set the `PORT` environment variable to change it.

---

## License

This project is private. All rights reserved.
