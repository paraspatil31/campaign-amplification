# SECURITY AND ACCESS

## 1. Principles
Validate on the server; least privilege; protect secrets; minimize data; never expose private backer/payment details.

## 2. Identity & Sessions
- **Guest:** can browse, view campaigns, and back as guest (email optional for receipt).
- **Registered user:** single account may act as audience, creator, and backer (per Loom briefing, no separate logins).
- **Reviewer/Admin:** role exists in the schema; UI out of scope; optional dev-only panel behind `ENABLE_DEV_REVIEW=true`.
- Tokens in `expo-secure-store`; short-lived JWT + refresh; logout clears all local drafts cache on request.

## 3. Permission Matrix
| Action | Guest | User | Owner (creator) | Reviewer |
|---|---|---|---|---|
| Browse/search/view campaign | ✅ | ✅ | ✅ | ✅ |
| Share, feedback (No/Somewhat/Yes) | ✅ | ✅ | ✅ | ✅ |
| Back campaign | ✅ (guest checkout) | ✅ | ✅ (own: allowed w/ label) | – |
| Save/follow campaign | ❌ prompt | ✅ | ✅ | – |
| Create/edit draft | ❌ prompt | ✅ | ✅ own only | – |
| Submit for review | ❌ | ✅ | ✅ own only | – |
| Edit published content | ❌ | ❌ | Material changes → re-review | ✅ |
| View backer list/amounts | ❌ | ❌ | Aggregates only | ✅ |
| Approve/reject/request changes | ❌ | ❌ | ❌ | ✅ |
| Authorize distribution | ❌ | ❌ | ❌ | ✅ |
Guest prompted to sign in only when needed (save, create, dashboard), never to browse.

## 4. Enforcement Rules
1. Server-side RBAC middleware on every route; client checks are UX only.
2. Ownership checks: `campaign.creator_id === req.user.id` for edits.
3. State transitions only through `lifecycle.ts` guards; reject illegal transitions (HTTP 409).
4. **Publish/distribution gate:** campaign cannot reach `available_for_funding` without reviewer approval; cannot reach `promoting` without approval + payment settled + budget + ad setup flags.
5. Funding goal only writable by the creator in the submit step; server rejects AI/system overwrites (`goal_set_by = creator`).
6. Material edits to published campaigns create a revision → status `changes_pending_review`; ads not updated until approved.

## 5. Input Validation (Zod, client + server)
- Title: 1–60 chars, trimmed; category enum; org name required; summary ≤ 280.
- URLs: `https` only, valid host, no `javascript:`; titles ≤ 120.
- Rich text: sanitized to allow-list (p, h2, h3, strong, em, ul/ol/li, blockquote, a); strip scripts and inline handlers.
- Images: types jpg/png/webp, ≤ 5 MB, min dimensions per placement; video mp4 ≤ 50 MB (if supported); server re-validates MIME and size.
- Amounts: integer cents, min $5, max $5,000 per transaction (demo); reject negatives/NaN.
- Rate-limit auth, contributions, drafts, and AI endpoints.

## 6. Privacy
- Public backer names **private by default** ("Anonymous backer"); opt-in toggle at checkout.
- Payment records stored accurately (amount, fee, status, timestamps, masked reference) for compliance; never store card numbers (checkout simulated, no PAN fields).
- Collect only: email (receipt, optional for guests). No unnecessary profile fields.
- Receipts accessible only to the payer (token/ID bound).
- Targeting is aggregate/interest-based; no individual-level data shown. Include advertising & privacy disclosure on detail page.
- Data export/delete request link in Settings (UI placeholder acceptable).
- Analytics: no third-party trackers in prototype.

## 7. Secrets & Config
`.env` ignored by git; `.env.example` committed; only `EXPO_PUBLIC_*` values in client; service keys server-side only; rotate any leaked key.

## 8. Transport & Storage
HTTPS only; CORS allow-list; parameterized queries/ORM; RLS enabled in Supabase tables; hashed passwords (argon2/bcrypt) if custom auth.

## 9. Moderation & Abuse
Report campaign action; Community Guidelines page; prohibited-content checklist in submit confirmation; audit log (`moderation_events`) records decision, actor, timestamp, reason, and diff of significant changes. Comments (if built) require report/block controls.

## 10. Security Events (Activity feed)
New login, password change, email change; shown in Activity under "Security".

## 11. Pre-Submission Security Checklist
- [ ] No secrets in APK or repo
- [ ] Server validation present on all write routes
- [ ] RBAC tests for each matrix row
- [ ] Backer privacy default verified
- [ ] HTML/link sanitization verified
