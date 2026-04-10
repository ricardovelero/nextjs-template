# Next.js Template App

This repository is a starting point for building authenticated SaaS-style applications with Next.js App Router, Clerk, Prisma, and a small set of UI primitives already wired in.

The app is intentionally minimal. It already separates a public marketing area from a protected app area, creates local profile records for authenticated users, and provides a dashboard shell you can extend into product features.

## What The App Does Today

- Serves a public marketing area under `app/(marketing)` with a top navigation menu.
- Serves a protected dashboard area under `app/(app)/dashboard`.
- Uses Clerk for authentication and route protection.
- Creates and syncs a local `Profile` row for each authenticated Clerk user.
- Creates a `UserSettings` row alongside each profile for app-owned preferences.
- Provides reusable UI building blocks for buttons, navigation menu, sidebar, sheets, inputs, tooltips, separators, and skeletons.

## Current Flow

1. A signed-out visitor lands on the marketing site.
2. Clerk handles sign in and sign up from the main navigation.
3. When an authenticated user enters the dashboard, the app calls `ensureProfile()`.
4. The app upserts a local Prisma `Profile` using the Clerk user ID as the stable key.
5. Default `UserSettings` are created on first access.

## Tech Stack

- Next.js 16 App Router
- React 19
- Clerk for authentication
- Prisma with PostgreSQL
- Base UI and shadcn-style component wrappers
- Tailwind CSS 4

## Project Structure

```text
app/
  (marketing)/         Public-facing layout and homepage
  (app)/dashboard/     Protected dashboard shell
components/
  main-menu.tsx        Marketing navigation with Clerk auth actions
  ui/                  Shared UI primitives
features/
  dashboard/           Dashboard-specific components
lib/
  prisma.ts            Prisma client setup
  profile.ts           Clerk -> local profile sync helper
prisma/
  schema.prisma        Database schema
  migrations/          Prisma migrations
```

## Data Model

The current template uses a simple split between identity and app data:

- Clerk is the source of truth for authentication and identity.
- Prisma `Profile` stores a local snapshot of user information and the app-owned relation to settings.
- `UserSettings` is the place for product preferences such as theme, notifications, and future dashboard options.

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

## Current State Of The Template

Included now:

- Route groups for public and authenticated areas
- Clerk provider in the root layout
- Dashboard route protection
- Local user/profile bootstrap on authenticated dashboard access
- Starter dashboard sidebar shell
- Starter marketing navigation

Still intentionally minimal:

- Marketing content is placeholder content
- Dashboard pages are mostly empty shells
- No Clerk webhooks yet for background sync
- No domain-specific product models yet
- No billing, teams, or admin workflows yet

## Template Principles

- Keep authentication and identity in Clerk.
- Keep app-specific state, preferences, and product data in Prisma.
- Use `clerkUserId` as the stable user key for local records.
- Treat request-time profile bootstrap as a safety net, not the long-term replacement for webhooks.
- Keep the marketing area and dashboard area separated by route groups and layout boundaries.
- Add new product features inside `features/` and keep shared UI primitives in `components/ui/`.
- Prefer extending `UserSettings` and related app-owned models instead of duplicating Clerk-managed user fields.

## Suggested Next Additions

- Build out dashboard settings pages backed by `UserSettings`
- Add Clerk webhooks for `user.created`, `user.updated`, and `user.deleted`
- Add product-specific Prisma models
- Replace placeholder marketing content with the actual template positioning
- Add tests around auth and profile bootstrap behavior
