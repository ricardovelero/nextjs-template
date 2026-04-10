# Next.js SaaS Template

This repository is a starting point for authenticated SaaS-style apps built with Next.js App Router, Clerk, Prisma, and shadcn base components.

The template separates a public marketing surface from a protected dashboard, bootstraps a local profile for authenticated users, and already includes dashboard pages for overview, settings, and billing.

## What The App Does Today

- Serves a public marketing site under `app/(marketing)` with a shadcn `navigation-menu` header.
- Serves a protected dashboard under `app/(app)/dashboard`.
- Uses Clerk for authentication, sign-in/sign-up flows, and route protection.
- Upserts a local Prisma `Profile` record on authenticated dashboard access.
- Creates and maintains a related `UserSettings` record for app-owned preferences.
- Uses shadcn `base-lyra` styling with Tailwind CSS v4 and Remix Icon.
- Ships dashboard overview, billing, and settings screens built from shadcn source components.

## Current UI Surface

### Marketing

- Hero-style landing page under `/`
- Top navigation with Clerk auth actions
- CTA buttons into the dashboard and settings
- Card-based feature summary using shared UI primitives

### Dashboard

- Shared sidebar shell with dashboard, billing, and settings navigation
- Overview page showing current profile and settings state
- Billing placeholder page using the same card composition as the rest of the app
- Settings page with:
  - Profile settings
  - User settings
  - Theme selection
  - Notification toggles
  - A visible active tab state for the selected settings section

## Current Flow

1. A signed-out visitor lands on the marketing site.
2. Clerk handles sign in and sign up from the main navigation.
3. When an authenticated user enters the dashboard, the app calls `ensureProfile()`.
4. The app upserts a local Prisma `Profile` using the Clerk user ID as the stable key.
5. Default `UserSettings` are created on first access.
6. The dashboard reads local settings such as theme and notification preferences from Prisma-backed app data.

## Tech Stack

- Next.js 16 App Router
- React 19
- Clerk
- Prisma with PostgreSQL
- shadcn CLI and shadcn base component source
- Base UI primitives under the hood
- Tailwind CSS 4

## shadcn Setup

Current project config:

- Style: `base-lyra`
- Base: `base`
- Icons: `remixicon`
- Tailwind: v4
- Global CSS: `app/globals.css`

Shared UI primitives live under `components/ui/` and are source-controlled as local files.

Notable installed primitives include:

- `button`
- `card`
- `dropdown-menu`
- `field`
- `input`
- `navigation-menu`
- `separator`
- `sheet`
- `sidebar`
- `switch`
- `tabs`
- `toggle`
- `toggle-group`
- `tooltip`

## Project Structure

```text
app/
  (marketing)/                 Public-facing landing page and layout
  (app)/dashboard/             Protected dashboard routes
  (auth)/                      Clerk sign-in and sign-out routes
components/
  main-menu.tsx                Marketing navigation with Clerk actions
  ui/                          Shared shadcn/base UI primitives
features/
  dashboard/
    actions/                   Server actions for settings updates
    components/                Dashboard shell, theme, and settings UI
lib/
  prisma.ts                    Prisma client setup
  profile.ts                   Clerk -> local profile sync helper
prisma/
  schema.prisma                Database schema
  migrations/                  Prisma migrations
```

## Data Model

The template keeps identity and app-owned data separate:

- Clerk is the source of truth for authentication and identity.
- Prisma `Profile` stores a local snapshot of user information.
- `UserSettings` stores app preferences such as theme and notification toggles.

Current profile fields:

- `clerkUserId`
- `email`
- `firstName`
- `lastName`
- `displayName`
- `imageUrl`
- timestamps

## Local Development

Install dependencies and start the app:

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Environment

This template expects:

- `DATABASE_URL` for Prisma/PostgreSQL
- Clerk environment variables required by `@clerk/nextjs`

## Database

Generate the Prisma client:

```bash
pnpm exec prisma generate
```

Create and apply migrations during development:

```bash
pnpm exec prisma migrate dev
```

## Recent Changes And Fixes

- Reworked the marketing and dashboard surfaces to use shadcn source components instead of placeholder markup.
- Added local `card`, `field`, `toggle`, and `toggle-group` primitives to support standard shadcn composition.
- Refactored dashboard settings to use `Field`, `FieldSet`, `ToggleGroup`, `Switch`, and `Tabs` patterns.
- Added a visible active state for the selected settings tab.
- Corrected Base UI button semantics for link-rendered buttons by using `nativeButton={false}` where required.
- Brought the dashboard sidebar and account dropdown closer to standard shadcn/base composition.

## Template Principles

- Keep authentication and identity in Clerk.
- Keep app-specific state, preferences, and product data in Prisma.
- Use `clerkUserId` as the stable user key for local records.
- Treat request-time profile bootstrap as a safety net, not the long-term replacement for webhooks.
- Keep the marketing area and dashboard area separated by route groups and layout boundaries.
- Prefer extending `features/` for domain features and `components/ui/` for shared primitives.
- Follow shadcn base conventions when composing components, especially for `render`, field layouts, tabs, and option groups.

## Suggested Next Additions

- Add Clerk webhooks for `user.created`, `user.updated`, and `user.deleted`
- Add product-specific Prisma models
- Replace billing placeholder content with a real provider integration
- Add tests around auth, profile bootstrap, and settings updates
- Add more domain workflows on top of the current dashboard shell
