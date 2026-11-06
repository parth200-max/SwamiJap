# Swami Jap

**Thoughtfully designed everyday bags — storefront and admin console.**

Swami Jap is a Next.js 16 storefront and admin application built with React 19,
TypeScript, Tailwind CSS v4, Prisma, and NextAuth. This repository is being
delivered in phases. **Phase 3 — Design System & Visual Foundation** is complete.

---

## Preview locally

```bash
# 1. Install dependencies (first run only)
npm install

# 2. Start the development server
npm run dev
```

Open **http://localhost:3000** for the storefront.

Open **http://localhost:3000/admin/login** for the admin console:

- Email: `admin@swamijap.com`
- Password: `swamijap2026`

For a production-style preview:

```bash
npm run build
npm run start
```

### Important local notes

- PostgreSQL is not configured in this workspace. Storefront and admin pages
  fall back to the curated sample catalogue from `src/lib/products-data.ts`.
  No migrations have been run.
- The cart is local-state only. The checkout button is an explicit design
  preview and does **not** process payment or create an order.
- The demo admin credentials come from `.env.local`; rotate them before
  deployment.
- Product photography is still placeholder imagery. Final brand photography is
  required before launch.

---

## Design system (Phase 3)

The visual foundation is implemented in `src/app/globals.css` as a CSS-first
Tailwind v4 token system. `tailwind.config.ts` was removed because it was unused
and duplicated the token source of truth.

### Colour

| Token | Value | Use |
| --- | --- | --- |
| `brand-orange` | `#E43D12` | Brand accent |
| `brand-orange-cta` | `#DB3A10` | Accessible CTA base |
| `brand-orange-hover` | `#C7350F` | CTA hover |
| `dusty-rose` | `#D6536D` | Promotional surfaces |
| `dusty-rose-deep` | `#AD4057` | Rose text on light surfaces |
| `soft-pink` | `#FFA2B6` | Decorative accents |
| `mustard` | `#EFB11D` | Highlight surfaces |
| `ivory` | `#EBE9E1` | Main page background |
| `charcoal` | `#292929` | Primary text and navigation |
| `beige` | `#F5F1E9` | Secondary surface |
| `brown` | `#806B59` | Supporting accent |
| `brown-strong` | `#6F5C4C` | Accessible muted text |
| `border` | `#DED8CE` | Dividers and borders |

`#E43D12` with white text measures 4.22:1. Primary buttons therefore use the
visually equivalent `#DB3A10` (4.54:1) and hover to `#C7350F` (5.32:1) to meet
WCAG AA without changing the brand's orange relationship.

### Typography

- **Playfair Display** — headings, editorial titles, product names.
- **DM Sans** — navigation, body, prices, buttons, forms, admin UI.
- Loaded with `next/font/google`; no external font requests at runtime.

### Components

Reusable primitives live in `src/components/ui/`:

- `Button.tsx` — primary (orange), secondary, outline, ghost, gold, danger.
- `Input.tsx` / `Textarea.tsx` — labels, errors, helper text, focus rings.
- `Badge.tsx` — rose, mustard, neutral, success, danger, outline.
- `Modal.tsx` / `Drawer.tsx` — focus trap, Escape handling, scroll lock,
  restored focus, reduced-motion-aware animation.
- `SectionHeading.tsx` — shared editorial section header.

---

## Tech stack

- Next.js 16.4 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4 (CSS-first tokens)
- Prisma 5 with PostgreSQL
- NextAuth v4 credentials provider
- GSAP + Lenis (installed; full motion system belongs to Phase 5)
- Cloudinary upload widget
- React Hook Form + Zod
- Lucide icons

---

## Project structure

```text
src/
├── app/
│   ├── (admin)/admin/          # Dashboard, products, login
│   ├── (storefront)/           # Storefront shell and homepage
│   ├── api/auth/[...nextauth]  # NextAuth handler
│   ├── globals.css             # Tailwind v4 design tokens and base styles
│   └── layout.tsx              # Fonts, metadata, root shell
├── components/
│   ├── admin/                  # Admin shell, sidebar, table, form
│   ├── animations/             # Lenis + floating helpers
│   ├── storefront/             # Hero, collection, cart, footer
│   └── ui/                     # Design-system primitives
├── hooks/                      # Cart store and focus trap
├── lib/                        # Auth, Prisma, sample data, class merge
└── types/                      # Shared TypeScript interfaces
```

---

## Environment

Copy `.env.example` to `.env.local` and fill in real values before connecting
services. The app currently runs without a database by using the fallback
catalogue. Do not deploy the demo credentials or fallback collection to
production.

```env
DATABASE_URL="postgresql://user:password@localhost:5432/swami_jap_db?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="replace-with-a-long-random-secret"
ADMIN_EMAIL="admin@swamijap.com"
ADMIN_PASSWORD="swamijap2026"
```

---

## Scripts

```bash
npm run dev      # development server
npm run build    # production build
npm run start    # production server
npm run lint     # ESLint
npx tsc --noEmit # TypeScript check
```

---

## Phase status

- **Phase 1** — audit: complete.
- **Phase 2** — architecture: approved.
- **Phase 3** — design system and visual foundation: complete, awaiting review.
- **Phase 4+** — content, commerce, payments, admin security, deployment:
  not started.
