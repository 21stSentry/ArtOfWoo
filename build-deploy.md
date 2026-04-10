# Build / Deploy

For this project, the FTP process is:

1. Build locally.
```powershell
npm install
$env:VITE_CONVEX_URL="https://your-convex-deployment.convex.cloud"
npm run build
npm run build:event-ops
```

2. Upload the contents of `dist/` to your site's web root.
Example target: `/public_html/` or `/htdocs/`
Upload the files inside `dist/`, not the `dist` folder itself.

3. Upload the contents of `dist-event-ops/` to your `/event-ops/` folder on the server.
That build already includes its own `.htaccess` for SPA routing and basic auth.

4. Keep hidden files.
Make sure `.htaccess` uploads. If you use the event-ops password protection, `.htpasswd` must also exist on the server at the path referenced by the `.htaccess`.

Important details for this repo:

- Main site output: [dist](C:/ai/Websites/ArtOfWoo/dist)
- Event ops output: [dist-event-ops](C:/ai/Websites/ArtOfWoo/dist-event-ops)
- Do not upload `src/`, `node_modules/`, or the whole repo.
- `VITE_CONVEX_URL` is compiled into the Event Ops frontend. Convex itself is not uploaded by FTP.
- The old `api/subscribe.ts` serverless file will not run on plain FTP hosting. The main site currently appears to use Buttondown's public embed endpoint directly, so that should be fine.

Practical upload pattern with FileZilla/WinSCP:

- Open the server root for the main site.
- Replace `index.html`, `assets/`, `images/`, and `.htaccess` from `dist/`.
- Open `/event-ops/`.
- Replace `index.html`, `assets/`, `images/`, and `.htaccess` from `dist-event-ops/`.

If you want, I can give you the exact folder-to-folder mapping for your host once you tell me your FTP root path.
