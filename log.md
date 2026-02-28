## 2026-02-28 Session

**Done:**
- Built full Church of Woo homepage in `src/designs/Design2.tsx` (Art Nouveau aesthetic, dark gold palette)
- Integrated 7 real images from artofwoo.org (moved to `public/images/` for Vite)
- Added YouTube embed (video ID: 1t7PijAeAjU)
- Implemented lightbox for gallery images and artist portraits
- Updated all 3 artist bios with verbatim text from artofwoo.org + links (Mr. Tea, Dalyte Kodzis, Ambscience)
- Added Testimonials section with 4 real quotes (Jon, Ruby, Serena, Ganesh)
- Added Contact form wired to Formspree (`https://formspree.io/f/mbdabpdo`)
- Wired mailing list form to Buttondown public embed endpoint (`/api/emails/embed-subscribe/michaeldevin`) — no API key in code
- Created Vercel serverless function `api/subscribe.ts` (now unused but harmless)
- Removed leaked Buttondown API key from code (old key `3152ddc4...` revoked, new key `f6e257d9...` stored in Vercel env vars only)
- Fixed all internal nav links with `scrollTo()` helper to prevent React Router interference
- Simplified routing — Design2 only, no design switcher
- Added `vercel.json` for SPA routing on Vercel
- Pushed to GitHub: `https://github.com/21stSentry/ArtOfWoo`
- Deployed live on Vercel: `https://art-of-woo.vercel.app/`
- Also deployed manually to IONOS: `https://www.michaeldevin.com`
- SEO improvements: descriptive hyphenated image filenames, alt + title attributes on all images

**Pending:**
- Add meta description, Open Graph tags, and page title to `index.html` for SEO (discussed but not done)
- Point `artofwoo.org` (Namecheap) DNS to Vercel — nameserver change not yet done
- Download and verify `bowrain-betscher-artist.jpg` is removed from root `/images/` folder (code reference removed, hidden section)
- Upload latest `dist/` build to IONOS michaeldevin.com after recent changes
- Cancel Squarespace after artofwoo.org is confirmed live on Vercel

**Notes:**
- Stack: Vite 7 + React 19 + TypeScript + Tailwind v4 + Bun
- All CSS is a template literal injected via `<style dangerouslySetInnerHTML>` in Design2.tsx
- Images must live in `public/images/` (not root `/images/`) for Vite to serve them
- Buttondown username: `michaeldevin` — uses public embed, no API key needed
- Formspree endpoint: `https://formspree.io/f/mbdabpdo`
- IONOS uses `.htaccess` in `public/` for SPA routing; Vercel uses `vercel.json`
- Domain `artofwoo.org` registered at Namecheap (not Squarespace), renewal Dec 2026 ~$12/yr
- Vercel env var `BUTTONDOWN_API_KEY` = `f6e257d9-1fd4-4526-ac8f-ecc1e24b8b91` (set in Vercel dashboard, never in code)

---
