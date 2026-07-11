# AETHER — Award-Winning Digital Product Agency Landing Page

Aether is a premium, modern, conversion-focused software development agency landing page designed with cinematic animations, fluid scroll triggers, custom responsive grids, and high-fidelity project showcases. The platform is engineered to deliver a seamless, high-performance experience matching top design-centric sites like Vercel, Linear, Stripe, Apple, and Raycast.

This documentation serves as a comprehensive guide for local development, system architecture understanding, and production deployment.

## Table of Contents
1. [Key Features](#key-features)
2. [Tech Stack](#tech-stack)
3. [Prerequisites](#prerequisites)
4. [Getting Started](#getting-started)
5. [Architecture & Request Flow](#architecture--request-flow)
6. [Available Scripts](#available-scripts)
7. [Environment Variables](#environment-variables)
8. [Testing & Validation](#testing--validation)
9. [Deployment](#deployment)
10. [Troubleshooting & Browser Bug Fixes](#troubleshooting--browser-bug-fixes)

---

## Key Features

- **Cinematic Entrance Animations:** Staggered navigation links, sliding theme switch thumbs, and character/word-based typography reveals using GSAP.
- **Buttery-Smooth Scrolling:** Lenis Smooth Scroll engine fully synchronized with GSAP `ScrollTrigger` updates for scroll-scrub timelines.
- **Interactive Parallax Cards:** Suspended 3D code mocks and metrics panels in the Hero section responsive to mouse move coordinates.
- **Horizontal Scroll Timelines:** A desktop-pinned horizontal track panel demonstrating step-by-step development process, with a responsive vertical cascade fallback for mobile viewports.
- **Adaptive Bento Grids:** Custom dashboard layouts housing 9 core agency services and technical competency matrices.
- **Double-Safe Theme Toggle:** Pill-shaped sliding thumb supporting light/dark theme persistence via `next-themes` and guarded with client-mounted wrappers to block hydration mismatches.
- **Tactile Micro-interactions:** Magnetic button pulls, bouncing spring transitions, and interactive accordion panels.

---

## Tech Stack

- **Framework:** Next.js 16.2.10 (App Router)
- **Library:** React 19.2.0
- **Language:** TypeScript 5.0+
- **Styling:** Tailwind CSS v4 + PostCSS
- **Animations:** GSAP 3.15+ & `@gsap/react` (`useGSAP`)
- **Scroll Engine:** Lenis Smooth Scroll 1.3+
- **Icons:** Lucide React 1.2+ & Custom Inline SVG Vectors
- **Theme Provider:** `next-themes` 0.4+
- **Code Linter/Formatter:** Biome 2.2+

---

## Prerequisites

Ensure you have the following tools installed on your environment before starting:

- **Node.js**: `v20.0.0` or higher (LTS recommended)
- **Package Manager**: `pnpm` (v9.0+ or v11.3+ recommended)
- **Browser Compatibility**: Chrome 111+, Safari 16.2+, Firefox 113+ (Required for `color-mix` CSS variables parsing)

---

## Getting Started

Set up the project locally on your machine in minutes:

### 1. Clone the Repository
```bash
git clone https://github.com/salmansheri/Agency-landing-page.git
cd Agency-landing-page
```

### 2. Install Dependencies
Always use `pnpm` to preserve lockfile configurations:
```bash
pnpm install
```

### 3. Environment Variables Setup
Create a local environment variables file (although the static app does not require external database secrets to render):
```bash
cp .env.example .env.local
```

### 4. Start the Development Server
Run the local next development compiler:
```bash
pnpm dev
```
If port `3000` is currently taken by another local process, Next.js will automatically fall back to the next free port (e.g. `http://localhost:3001`).

### 5. Open in Browser
Visit [http://localhost:3000](http://localhost:3000) (or the designated terminal port) to preview the site.

---

## Architecture & Request Flow

### Directory Organization
```
├── public/                 # Static assets (High-resolution generated showcase cards)
│   ├── aura_apparel.jpg
│   ├── helix_ai.jpg
│   └── zenith_crypto.jpg
├── src/
│   ├── app/                # Next.js App Router core entries
│   │   ├── globals.css     # CSS Variables, gradient mesh keyframes, dot grid overlays
│   │   ├── layout.tsx      # Core metadata, Geist fonts configuration, Provider wrappers
│   │   └── page.tsx        # Main layout page aggregating all section sections
│   ├── components/         # Modular layout sections & animation wrappers
│   │   ├── AnimateReveal.tsx  # Character/word text reveals & magnetic wrappers
│   │   ├── SmoothScroll.tsx   # Lenis initialization & GSAP ticker binding
│   │   ├── ThemeProvider.tsx  # Next-themes client provider wrapper
│   │   ├── Navbar.tsx         # Fixed navigation & sliding pill theme switcher
│   │   ├── Hero.tsx           # Floating mouse parallax visual cards & CTAs
│   │   ├── TrustedCompanies.tsx # Infinite marquee partner ticker
│   │   ├── Services.tsx       # 9-card Bento Services Grid
│   │   ├── WhyChooseUs.tsx    # Scroll-triggered stat counters & bullet points
│   │   ├── DevelopmentProcess.tsx # Pinned horizontal process workflow
│   │   ├── Portfolio.tsx      # Case studies clip-path reveal showcases
│   │   ├── Technologies.tsx   # Classified competency stack categories
│   │   ├── Testimonials.tsx   # Sliding customer review cards
│   │   ├── Pricing.tsx        # Subscription project tiers
│   │   ├── FAQ.tsx            # Tall animated height accordion panels
│   │   └── Contact.tsx        # Project scoping inquiry submission form
│   └── lib/
│       └── gsap.ts         # Unified central GSAP plugin registration file
```

### Client Execution & Render Lifecycle
```
HTML Page Requests (Next.js Static Pages)
      │
      ▼
Server Pre-renders HTML (Theme toggle matches SSR placeholders)
      │
      ▼
Client Hydration Complete (Mounted State = True)
      │
      ▼
Instantiates Unified GSAP & ScrollTrigger Registry (src/lib/gsap.ts)
      │
      ▼
Initializes Lenis Scroll ──► Appends update triggers to GSAP requestAnimationFrame
      │
      ▼
Fires useGSAP entrance timelines (Stagger reveals element opacities & clears transforms)
```

---

## Available Scripts

Inside `package.json`, the following tasks are exposed:

| Command | Action | Description |
|:---|:---|:---|
| `pnpm dev` | `next dev` | Launches local Turbopack compiler server with hot reloading |
| `pnpm build` | `next build` | Runs type checks and compiles optimized static HTML assets |
| `pnpm start` | `next start` | Serves compiled production code locally |
| `pnpm lint` | `biome check` | Validates code imports, formatting constraints, and lint rules |
| `pnpm format` | `biome format --write` | Instantly formats spacing, tabs, and syntax brackets |

---

## Environment Variables

| Variable | Scope | Purpose | Default |
|:---|:---|:---|:---|
| `PORT` | Local compiler | Sets Next.js active dev server port | `3000` (auto-falls back if taken) |
| `NODE_ENV` | Build status | Node environment flags | `development` / `production` |

---

## Testing & Validation

Execute these steps prior to submitting code to ensure zero build errors:

### 1. Code Style Compliance
Analyze components for imports order or syntax anomalies:
```bash
pnpm lint
```

Format spacing and styling:
```bash
pnpm format
```

### 2. TypeScript and Compile Validation
Compile the codebase to make sure there are no TypeScript interface mismatches or configuration errors:
```bash
pnpm build
```

---

## Deployment

### Vercel (Edge Distribution)
Vercel is the native host for Next.js App Router applications:
1. Connect your git repository to your Vercel Dashboard.
2. Select the framework preset: **Next.js**.
3. Configure build configurations:
   - Build Command: `pnpm run build`
   - Install Command: `pnpm install`
4. Click **Deploy**. Vercel will distribute static content to global edge points.

### VPS or Docker Container
For standard server setups, build the provided configuration:
```bash
# Build the production image
docker build -t aether-landing .

# Run container binding port 3000
docker run -d -p 3000:3000 -e NODE_ENV=production aether-landing
```

---

## Troubleshooting & Browser Bug Fixes

### 1. Header Theme Switcher Invisible on Mounting
* **Issue:** The Light/Dark pill toggler was permanently stuck at `opacity: 0` and translated `-15px` offscreen.
* **Cause:** A GSAP `.from` re-entry bug. The entrance animation hook ran on mount. However, because the dependency array `[]` was omitted, the state transition `setMounted(true)` triggered a re-render which executed the hook a second time. GSAP read the starting `0` opacity as the final destination, locking the button out of view.
* **Fix:** Converted the animation to `gsap.fromTo` to explicitly lock start and end states, and passed `dependencies: []` to all `useGSAP` hook configurations across the project so they only run once on mount.

### 2. Broken Gradient Clipping on Animated Headers
* **Issue:** Text containing text gradients (`bg-clip-text text-transparent`) would render as a solid block of color or become transparent.
* **Cause:** Modern browsers (Chromium/Webkit) fail to compute background-text-clip dimensions on elements that have active CSS transforms (`translate3d`, `rotate`, `scale`).
* **Fix:** Appended `clearProps: "transform"` to the completed parameter sets of all text reveals in [AnimateReveal.tsx](file:///mnt/projects/saas-landing/src/components/AnimateReveal.tsx). Once the slide animation completes, GSAP clears the inline `transform` styling, restoring perfect typography rendering.

### 3. Navigation Links Failing to Scroll
* **Issue:** Clicking links (`Services`, `Process`, `FAQ`) in the navbar occasionally did not trigger any scroll movement.
* **Cause:** The site uses Lenis for smooth scroll. Running native browser scrolling concurrently via `element.scrollIntoView({ behavior: "smooth" })` causes thread locks, as both engines fight to scroll to different delta coordinates.
* **Fix:** Registered the active `lenis` instance to the global window container (`window.lenis`) inside [SmoothScroll.tsx](file:///mnt/projects/saas-landing/src/components/SmoothScroll.tsx). Updated all click handlers in [Navbar.tsx](file:///mnt/projects/saas-landing/src/components/Navbar.tsx) and [Hero.tsx](file:///mnt/projects/saas-landing/src/components/Hero.tsx) to query the instance and execute scrolling smoothly using Lenis's native `.scrollTo(href)` API.
