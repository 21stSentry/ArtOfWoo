# Migration Plan: artofwoo.org → Cloudflare

---

## Phase 1 — Preparation (do before touching anything live)

1. **Confirm Namecheap access** — log in and verify you can manage `artofwoo.org`. If someone else set it up, get the credentials now before you need them.

2. **Export Squarespace subscriber list** — Squarespace dashboard → Communications → Email Campaigns → Export contacts as CSV. Do this before cancelling anything.

3. **Sign up for a mailing list service** — Buttondown or Mailchimp. Import the CSV. Wire up the form in the React code (10 min job).

4. **Run a production build locally** — `bun run build` — confirm the `dist/` folder generates cleanly with no errors.

---

## Phase 2 — Cloudflare Setup

5. **Sign up for Cloudflare** — free account at cloudflare.com.

6. **Add your site** — in Cloudflare dashboard, click Add Site → enter `artofwoo.org`. Choose the Free plan.

7. **Deploy to Cloudflare Pages** — Cloudflare dashboard → Pages → Create project → Connect to GitHub → select your repo. Auto-detects Vite, set:
   - Build command: `bun run build`
   - Output directory: `dist`

8. **Test on the Pages URL** — Cloudflare gives you a temporary URL like `artofwoo.pages.dev`. Click through every section, test the form, check images load, check the video plays. Fix anything before going live.

---

## Phase 3 — Go Live

9. **Add custom domain in Cloudflare Pages** — Pages → your project → Custom Domains → add `artofwoo.org`.

10. **Switch name servers at Namecheap** — Namecheap dashboard → `artofwoo.org` → Manage → Nameservers → Custom DNS → enter the two Cloudflare nameservers provided (e.g. `ada.ns.cloudflare.com`).

11. **Wait for propagation** — usually 30 minutes to a few hours. The site flips from Squarespace to Cloudflare automatically once DNS updates. SSL certificate provisions automatically during this time.

12. **Verify** — visit `artofwoo.org`, confirm it loads the new site over HTTPS.

---

## Phase 4 — Clean Up

13. **Cancel Squarespace** — only after step 12 is confirmed working. Squarespace dashboard → Settings → Billing → Cancel plan.

14. **Note Namecheap renewal** — domain renews December 2026, ~$12/yr. Set a calendar reminder so it doesn't lapse.

---

## Timeline

Everything in Phase 1 can be done today without affecting the live site. Phases 2–4 can be completed in a single afternoon. Actual downtime during DNS switchover is zero — the old Squarespace site stays live until DNS propagates to the new one.

---

## Total Ongoing Cost After Migration

| Item | Cost |
|---|---|
| Domain (Namecheap) | ~$12/yr |
| Hosting (Cloudflare Pages) | Free |
| SSL | Free |
| Mailing list (Buttondown) | Free to 100 subscribers |
| **Total** | **~$12/yr** |

---

## Background: Why These Choices

- **Cloudflare Pages** — free hosting, free SSL, auto-deploys on git push, supports private GitHub repos on free tier, no surprise costs.
- **Namecheap** — domain is already registered here, independent of Squarespace. No transfer needed — just a nameserver change.
- **Buttondown** — simplest mailing list API for a small list. One `fetch()` call in the React form code. Free up to 100 subscribers.
- **No IONOS SSL** — Cloudflare provisions SSL automatically. The $25/yr IONOS certificate is unnecessary.
