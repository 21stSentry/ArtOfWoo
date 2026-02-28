# Build Info

## The Stack

**Bun** — replaces Node.js as the JavaScript runtime, and replaces npm as the package manager. It's much faster at installing packages and running scripts. You use it the same way: `bun install`, `bun run dev`.

**Vite** — the build tool and dev server. Replaces Webpack/Parcel. It serves files natively as ES modules during development so there's no bundle step — the browser loads files directly. This is why the dev server starts in under 2 seconds. For production it bundles with Rollup under the hood.

**React 19** — you know React. Same component model, just the latest version with some new concurrent features (not used here).

**TypeScript** — JavaScript with type annotations. Files are `.tsx` (TypeScript + JSX). The types mainly catch mistakes at edit time; they compile away entirely and have no runtime cost.

**Tailwind CSS v4** — utility classes like `flex`, `gap-4`, `text-sm` that you add directly in HTML/JSX. V4 is a big change from what you may know — there's no `tailwind.config.js` anymore. You just do `@import "tailwindcss"` in your CSS file and it works. In this project Tailwind is actually barely used — most styling is plain CSS injected via `<style>` tags inside each component.

---

## Project Structure

```
src/
  main.tsx          ← app entry point, sets up routing
  index.css         ← just: @import "tailwindcss"
  designs/
    Design1.tsx     ← /1
    Design2.tsx     ← /2  (the one we're building out)
    Design3.tsx     ← /3
    Design4.tsx     ← /4
    Design5.tsx     ← /5
```

**React Router v7** handles the `/1` through `/5` routes — it's the standard client-side router, same concept as you'd know.

---

## How Design2 Specifically Works

Each design is a single `.tsx` file that is entirely self-contained:

- **CSS** lives in a template literal string at the top of the file (`const css = \`...\``) and gets injected into the page via `<style dangerouslySetInnerHTML={{ __html: css }} />`. This avoids needing separate `.css` files or CSS-in-JS libraries.
- **Google Fonts** are loaded with `@import url(...)` inside that same CSS string.
- **Animations** are pure CSS keyframes — no animation library.
- **The particles** are just `<div>` elements with random positions/delays set via inline styles and a CSS `animation` that moves them upward.
- **The images** are hotlinked directly from the original Squarespace CDN — no downloads, no local copies.
- **The email form** is local state only (`useState`) — it doesn't actually send anything, just shows a confirmation message.

---

## What's Different From "A Few Years Ago"

| Then | Now |
|---|---|
| Webpack | Vite (10-100x faster dev server) |
| npm / yarn | Bun (much faster installs) |
| Tailwind needed config file | Tailwind v4 is zero-config |
| `create-react-app` | Dead — Vite is the replacement |
| CSS Modules / Sass | Still valid, but CSS-in-JS and collocated styles are common |
| React Router v5 `<Switch>` | v7 uses `<Routes>` + `<Route>` |

The fundamentals — HTML, CSS, JavaScript, components — are identical to what you know. The tooling around them has just gotten faster and simpler.
