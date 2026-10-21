# Utah Telugu Association — Release readiness

**Current decision: NOT APPROVED FOR PRODUCTION.** Keep the live `main` branch unchanged.

## Confirmed development work

- Responsive cinematic homepage, scroll chapters, procedural 3D cultural courtyard and motion fallback
- Household-level multi-activity Sankranthi planning preview, browser-session draft and text export
- Database-backed news and staff announcement publication workflow with audit history
- Public membership validation privacy restrictions, current-role authorization checks
- Read-only event inventory and validated indicative ticket estimates, subject to content approval
- Registration and ticketing routes intentionally return HTTP 503; no customer payments or QR passes are issued
- No hardcoded authentication bypasses or fabricated checkout URLs in the replaced code paths
- PostgreSQL candidate schema at `prisma/schema.postgres.prisma`, separate from the SQLite development schema

## Current deployment blocker: external services

Project environment configuration was checked through Vercel on October 21, 2026 and showed no project-level environment variables exposed to the connection. Recheck in Vercel if shared vars or secrets have subsequently been added. Do not print secrets in issues or logs.

Before any real registration is taken:

1. Provision and secure a **durable PostgreSQL database** (managed Postgres or equivalent). Back it up and verify recovery. Run `npx prisma validate --schema prisma/schema.postgres.prisma`, create **reviewed versioned migrations**, and run them against an isolated staging database. Do NOT blindly run `prisma db push` on production. Configure `DATABASE_URL` in the intended environment and ensure the Prisma build uses the matching provider.
2. Add a cryptographically generated **32+ character `SESSION_SECRET`** through Vercel secrets; rotate any old cookie signing key. Never use a repository fallback value.
3. Verify the sender domain with an email provider. Configure **`RESEND_API_KEY`** and **`AUTH_FROM_EMAIL`** in Vercel; perform real inbox delivery and login/logout/replay/rate-limit tests. OTP challenges still require persistent server-side one-time use and abuse protection before unrestricted public release.
4. Choose a provider capable of confirmed server-side payments. For Zeffy, confirm official checkout-link and webhook/reconciliation capabilities for the actual organization account. Do not infer payment from redirects, reference prefixes, or user-supplied confirmation. Never send a receipt without verified settlement.
5. Build the replacement **transactional registration engine** on the PostgreSQL database. It must support immutable server-issued pricing, rate limits, **unique idempotency keys**, atomic conditional inventory reservation with TTL, finalized payment settlement, refund/cancellation release, waitlist promotion, and **QR issuance only after authorized confirmation**.
6. Establish the approved **2027 Sankranthi calendar, venues, fees, eligibility rules and capacities** from the UTA committee. Seeded placeholders may not be claimed as official. The new inventory/estimate interfaces remain gated behind `UTA_EVENT_CATALOG_APPROVED`, which should only be enabled when official data is verified and approved.
7. Set up roles through auditable administrator actions; never elevate an account because its email looks administrative.
8. Run build, static typing, integration and end-to-end security tests with realistic data: concurrent last-seat requests, duplicate webhook replay, failed payment, expired membership, refund, OTP brute force, check-in replay, draft-vs-published announcements, cross-site requests, mobile reduced-motion/WebGL fallback and keyboard navigation.
9. Confirm privacy policy, attendee consent, data retention, sponsor approvals, and accessibility acceptance.
10. Merge through reviewed pull request only after passing checks and approving a staging deployment. Keep the registration flag closed by design until replacement service has been certified.

## Staging verification commands

```bash
npm ci
npx prisma validate --schema prisma/schema.postgres.prisma
npx tsc --noEmit
npm run build
```

These are **commands to run**, not a claim that all checks were executed successfully. The assistant's execution environment had no dependency packages installed and no internet access to fetch them; Vercel deployment READY is evidence of a successful build, not a completed functional security review.

## Current preview entry points

- Home: `/`
- Festival planner: `/events/sankranthi-2027`
- Official news: `/news`
- Admin announcements: `/admin/announcements` (authorized users only)
- Admin registration ledger: `/admin/registrations` (authorized users only)
- Event readiness: `/api/events/sankranthi-2027/availability`
- Indicative quote: `/api/events/sankranthi-2027/estimate` (disabled until verified catalog approved)

## Visual acceptance pending

The active 3D environment is a lightweight procedural scene, **not** a photorealistic Active Theory-quality environment. To satisfy the approved brief, commission/license textured architecture, courtyard photography or authored 3D models, optimized mobile variants, and actual-device cinematic/motion QA. Do not use unlicensed assets.

**Release gate:** No real booking, no payment acceptance, no fake confirmation, no migration to live `main` until the above is reviewed and demonstrably verified.
