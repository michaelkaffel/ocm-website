# Owl Chrysalis Medicine

A custom React web application built for health coach and podcast host Owl Chrysalis, migrated from an existing Wix site to a fully self-hosted, performance-optimized platform.

**Live site:** [owlchrysalismedicine.com](https://owlchrysalismedicine.com)

---

## Overview

The existing Wix site had outgrown what the platform could offer — limited layout control, no custom routing, and no real path to adding dynamic features. This project is a ground-up rebuild that preserves all existing content while giving the site a faster, more polished, and fully maintainable foundation.

---

## Stack

- **Framework:** Vite + React 18
- **Routing:** React Router v7
- **Styling:** Tailwind CSS v3 with CSS custom properties for theming
- **Email:** EmailJS (contact form)
- **Scheduling:** Calendly (external redirect)
- **Deployment:** Vercel (auto-deploy on push to `main`)

No backend. The podcast section pulls from an RSS feed client-side, articles are stored as static markdown files loaded at build time via `import.meta.glob`, and scheduling is handled via Calendly link — no server required.

---

## Features

### Content Migration
All 16 blog articles were migrated from Wix using a custom Node.js scraper built with Cheerio. The scraper extracted titles, body text, thumbnails, publish dates, and categories from each article URL. A cleanup script handled common formatting issues (concatenated dates, Wix "related posts" bleed, trailing category tags), with remaining edge cases resolved manually. Articles are stored as markdown with frontmatter in `src/content/articles/`.

### Articles System
- Static markdown articles loaded at build time — no API, no database
- `getAllArticles()` / `getArticleBySlug()` utility for listings and detail pages
- Markdown rendered via `react-markdown` with Tailwind Typography prose classes
- Social share buttons (Facebook, X, LinkedIn, copy-to-clipboard)
- "Recent Posts" sidebar on each article detail page
- Keyword/category tags on every article, filled in where Wix had gaps

### Open Graph / Link Preview Cards
Crawlers don't execute JavaScript, so every route was returning the same generic metadata when shared to iMessage, Facebook, etc. A post-build script (`scripts/generate-og-pages.mjs`) runs after `vite build` and generates per-route `index.html` files in `dist/` with injected Open Graph meta tags. For article pages, the script parses markdown frontmatter to extract the title, thumbnail, and auto-generates a 160-character description from the body. Vercel serves these static files before applying SPA rewrite rules, so crawlers get route-specific previews while users get the normal React SPA experience.

### Navigation
The navbar supports six routes with a responsive hamburger menu below the `lg` breakpoint. Hash links (Podcast, Contact) and route links (About, Articles, Coaching) are unified behind shared class constants and active-state logic. Hash link navigation is handled via `useNavigate` to keep all routing within React Router, working in tandem with a `ScrollToTop` component that handles both scroll-to-top on route changes and smooth hash-anchor scrolling.

### Design System
All brand colors and typography are defined as CSS custom properties in `:root`. Tailwind reads from those variables, meaning the full palette can be swapped by editing a single block in `index.css` — useful for a client whose branding may still evolve. Headings use Cormorant Garamond; body text uses Inter.

---

## Pages

| Route | Description |
|---|---|
| `/` | Hero, podcast embed, coaching CTA, book section, contact form |
| `/coaching` | Service overview and Calendly booking CTA |
| `/about` | Personal bio consolidated from scattered Wix content |
| `/articles` | Article listing with category tags and read time |
| `/articles/:slug` | Article detail with markdown rendering and social share |
| `/contact` | Contact form wired to EmailJS |

---

## Local Development

```bash
npm install
npm run dev
```

Requires a `.env` file with EmailJS credentials:

```
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```