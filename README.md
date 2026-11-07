# Taporaa website — AdSense readiness rebuild

This is a no-build static website intended for GitHub Pages on the custom domain `taporaa.com`.

## What's included

- Reworked home page with accurate service-platform positioning.
- Separate About, Services, How it Works and Contact pages.
- Four original vehicle-care guides plus a guide index.
- Privacy Policy, Terms of Use and Editorial Policy pages.
- Responsive, accessible navigation; semantic HTML; page titles/descriptions; canonical URLs; Open Graph metadata.
- `robots.txt`, `sitemap.xml`, `ads.txt`, `.nojekyll` and `CNAME`.
- Existing Google Analytics 4 measurement ID and AdSense publisher code retained from the public source.

## Required configuration before deployment

1. Open `assets/js/site-config.js`.
2. Set `legalOperatorName` to the exact legal name of the person or entity operating Taporaa.
3. Set `contactEmail` to a monitored business email.
4. Set `privacyEmail` to a monitored privacy/data-request email (it may be the same address).
5. Optionally set `contactPhone` and `postalAddress` to verified public business details.
6. Read the Privacy Policy and Terms of Use carefully and update them so they exactly describe the real website, hosting, email, analytics, advertising and any service workflow. Do not publish bracketed configuration reminders.
7. Confirm `G-NDCK1PM405` and `ca-pub-1390238086527698` are still the correct accounts before going live. If either is no longer used, remove or replace it consistently in all files.
8. The custom-domain `CNAME` file is set to `taporaa.com`. Keep DNS records and GitHub Pages custom-domain settings aligned with your existing deployment.

The contact form is static: it opens the visitor's email application using `mailto:`. It does not store messages on a server. No fake phone number or guessed email address has been added.

## Local preview

From this folder, run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy to GitHub Pages

1. Back up or create a branch from the current `main` branch.
2. Replace the published root files with the contents of this package (keep any unrelated files you still need, but remove obsolete conflicting CSS/JS/assets if not used).
3. Confirm GitHub Pages publishes from the correct branch and `/ (root)`.
4. Preserve `CNAME` as `taporaa.com` and confirm HTTPS is enabled in the Pages settings.
5. Verify the live canonical pages, images, navigation, `robots.txt`, `sitemap.xml` and `ads.txt` after deployment.
6. Submit the sitemap in Google Search Console if you use it.

## AdSense notes

- The AdSense site-review tag from the existing site is retained on the homepage and content-oriented pages. It is intentionally omitted from Contact, Privacy Policy, Terms and Editorial Policy utility pages. No ad units have been added.
- `ads.txt` is included for the publisher ID found in the existing source. Verify ownership and the seller relationship in your AdSense account before relying on it.
- This code cannot guarantee approval. Google makes the decision after its crawler and policy review.
- Check AdSense → Sites for the exact reason/status and Policy Center for page-level or site-level issues before requesting another review.
- If serving ads to users in jurisdictions that require a certified consent solution, configure an appropriate Google-certified CMP and consent signals; this project does not implement a certified CMP or Consent Mode setup.

## Important content ownership / accuracy note

The pages are a starting point and should be reviewed by the actual business operator and a qualified vehicle-service professional before publication. Add real service-area details, operational contact information, provider-screening information and any actual booking/complaint process only after verifying them. Do not invent reviews, partner garages, prices, certifications, guarantees or 24/7 availability to make the site look more complete.
