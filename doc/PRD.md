# PRD — Campaign Amplification Platform (Mobile Prototype)

## 1. Vision
Help important messages travel beyond their creators' existing networks. Creators build campaigns, the platform reviews them, and backers pool money toward **advertising distribution**.

> **This is not a donation platform.** Contributions fund the *distribution and reach* of a message, not the cause, person, or organization in it.

## 2. Goals & Success Criteria
- A first-time user can explain what the platform does, what their money pays for, and what happens next, unaided.
- The key journey works end-to-end: create → draft → submit → review status → discover → back → track.
- Premium, calm, credible UX; strong hierarchy; no dead ends.
- Deliverables: Android APK, demo video, (optional) TestFlight.

## 3. Non-Goals
- Production ad-network integration, real payments, real AI/speech (demo mode acceptable).
- Admin/reviewer product (conceptual only; optional minimal dev panel).
- Source-code submission.

## 4. Users & Roles
| Role | Description | In scope |
|---|---|---|
| Audience | Browses, reads, shares, gives feedback; no account needed | ✅ |
| Creator | Builds & submits campaigns, monitors funding/reports | ✅ |
| Backer | Contributes toward promotion cost; guest allowed | ✅ |
| Reviewer/Admin | Approves/rejects, prepares distribution | ❌ (concept; optional mock) |
One account can be audience + creator + backer (no separate logins).

## 5. Information Architecture
Bottom tabs: **Home · Explore · Create · Activity · Profile**.
Secondary (from Profile / Home): Partners, About, How It Works, FAQs, Help, Contact, Terms, Privacy, Community Guidelines.
Detail routes: Campaign Detail, Back flow, Creation steps, Receipt, Report, Dashboard.

## 6. Functional Requirements

### FR-1 Home
- Hero: headline, explanation, CTAs **Explore Campaigns** / **Start a Campaign**.
- Illustrative reach per $ from configurable assumptions, labelled "Estimate, not a guarantee".
- Featured carousel + campaign feed. Card: cover, category, title, creator, summary, raised/goal, progress bar, estimated reach at goal, **Back This Campaign**.
- How it works: **Create → Review → Amplify**.

### FR-2 Explore
Search, categories (Environment, Health, Science, Education, Public Policy, Economic Policy, Community, Arts & Culture, Business, Other), sort (Trending, Newest, Most funded, Ending soon, Closest to goal), filters (category, status, funding %, reach range). Loading/empty/error/no-results states. Filters genuinely change results.

### FR-3 Campaign Creation (most important)
- Entry: **Create Manually** or **Create with Your Voice**; **Resume Draft** list.
- Persistent 5-step progress indicator, autosave, state preserved on back navigation, inline validation.
- **Step 1 Basics:** title (req, ≤60 chars + counter, note about ad headline), category (req), creator/org name (req), summary, optional cover, AI-suggest (optional), Save Draft, Continue.
- **Step 2 Story:** editorial composer; headline/intro; sections (add, reorder, delete); simple formatting toolbar; images with caption + credit; statistics; sources (title + URL); suggested audience actions; live preview.
- **Step 3 Campaign & Ad Visuals:** cover, ad images, video (where supported), ad headline, description, CTA text, placement previews, upload, file validation, missing-asset warnings, optional creative-quality feedback.
- **Step 4 Reach:** geo targets, audience interests, channels, budget allocation, duration, audience preview; labels "You selected" vs "Platform may finalize in review"; never fixed audience size.
- **Step 5 Submit:** full preview, **creator sets funding goal**, estimated reach, duration, fees/policies, rules confirmation checkbox; actions Back / Save Draft / Preview / Submit for Review. Then confirmation + status timeline.
- AI/voice: always editable/deletable, demo fallback.

### FR-4 Campaign Detail
Header (back, cover, category, title, creator, date, share, status). Story & sources inline. Sticky progress panel (raised, goal, %, time left, est. reach, Back + Share). Expandables: Use of Funds, Audience & Distribution, Review/Trust/Feedback. Feedback prompt: No / Somewhat / Yes. Demo data labelled.

### FR-5 Back a Campaign (6 steps)
1 Inspect → 2 Choose amount (presets + custom, live reach) → 3 Review (amount, fees, total, est. reach, progress, terms/refund, "amplification not donation") → 4 Simulated payment (guest OK; pending/failed/rejected/cancelled states) → 5 Confirmation (receipt, updated progress, share) → 6 Track (updates, final report).

### FR-6 Creator Dashboard
Tabs: Drafts, Under Review, Published/Funding, Promoting, Completed, Requires Action. Per-campaign: thumbnail, status, progress, goal, deadline, est. reach. Actions: edit draft, preview, moderation feedback, respond to changes, share, milestones, updates, promotion progress, final report. Analytics separate **estimated** from **measured**.

### FR-7 Activity
In-app notifications for events listed in §9; preference toggles; followed campaigns; avoid noisy/low-value alerts.

### FR-8 Profile
Account, created/backed/saved campaigns, payment history, settings, help, secondary pages.

## 7. Business Logic (demo configurable in `config/assumptions.ts`)
- `CPM_USD` (default 8) → impressions per $ = 1000/CPM.
- `UNIQUE_REACH_FACTOR` (default 0.6) → est. reach per $ = (1000/CPM) × factor.
- Platform fee 10% of contributions (shown); payment processing 2.9% + $0.30 (demo); ad spend = remainder.
- Min contribution $5; presets $5/$10/$25/$50/$100.
- Fees disclosed before payment. Refund if goal not reached/rejected; unspent funds refunded or rolled per policy text.

## 8. Lifecycle (summary; see `CAMPAIGN_LIFECYCLE.md`)
Draft → Submitted → Changes Requested/Approved → Available for Funding → Goal Reached/Period Ends → Distribution Preparation → Promoting → Completed; exceptions: Rejected, Cancelled, Refund Pending, Failed.

## 9. Notification Events
Submission received; approved/rejected/changes requested; available for backing; milestone (25/50/75/100%); deadline approaching; contribution success/failure; promotion begins; distribution progress; completed; report available; comments/updates; security events.

## 10. Privacy & Trust Principles
Backer names private by default; no unnecessary profile data; no invented trust score; clear review explanation; sources always public.

## 11. Evaluation Priorities
UI/UX (critical) · product thinking · code quality · end-to-end functionality · state handling · security/privacy · thoughtful AI use · scoped prototype.

## 12. Deliverables
APK, demo video (complete walkthrough), optional TestFlight, submission via Telegram group.

## 13. Risks
| Risk | Mitigation |
|---|---|
| Time | Follow P0/P1/P2 in AGENT.md |
| Backend complexity | Mock-compatible service layer; swap to Supabase |
| Confusing concepts | Contextual explainers, expandable sections |
| Demo inconsistency | Single seed dataset |
