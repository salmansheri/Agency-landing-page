# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js App Router landing page. Application entry points live in `src/app/`: `layout.tsx` defines global metadata and providers, `page.tsx` composes the landing-page sections, and `globals.css` holds global styles and Tailwind imports. Reusable page sections and client-side interaction components belong in `src/components/` (for example, `Hero.tsx` and `Navbar.tsx`). Keep shared animation variants in `src/lib/animations.ts`. Place static images and other browser-served assets in `public/`.

## Build, Test, and Development Commands

Use pnpm, matching the checked-in `pnpm-lock.yaml`.

- `pnpm dev` starts the local Next.js development server.
- `pnpm lint` runs Biome checks for formatting and lint issues.
- `pnpm format` applies Biome formatting and import organization.
- `pnpm build` produces a production build and validates TypeScript through Next.js.
- `pnpm start` serves a completed production build.

Run `pnpm lint` and `pnpm build` before opening a pull request.

## Coding Style & Naming Conventions

Write TypeScript and React function components. Use PascalCase filenames and exported component names for components, such as `DevelopmentProcess.tsx`; use camelCase for variables and functions. Biome enforces two-space indentation, and its import organizer is enabled. Prefer the existing `@/` alias for imports from `src/`. Add `"use client"` only to components that need browser APIs, hooks, animations, or interactive state. Keep shared Motion variants in `src/lib/animations.ts`.

## Testing Guidelines

There is no automated test suite configured. Treat `pnpm lint` and `pnpm build` as required validation. For visual or animation changes, verify responsive behavior and light/dark themes with `pnpm dev`; check that scroll-triggered effects clean up correctly on navigation or unmount.

## Commit & Pull Request Guidelines

Follow the conventional commit style used in history: `feat: ...`, `fix: ...`, and `docs: ...`. Keep commits focused and written in the imperative. Pull requests should explain the user-visible change, link the relevant issue when one exists, list validation commands run, and include desktop and mobile screenshots for visual changes. Do not commit generated output such as `.next/`, dependency directories, or `.env*` files.
