# FEATURE TICKETS

> **Reminder (AGENT.md §0):** present an implementation plan and get approval BEFORE starting any ticket.
Priority: P0 must-have · P1 should-have · P2 nice-to-have. Status tracked in `PROGRESS.md`.

## EPIC 0 — Foundation
- [x] **FT-001 (P0) Scaffold project** — Expo + TS + Router, ESLint/Prettier, folder structure. *AC:* app runs on Android/iOS sim; strict TS passes. ✅ (Done 2026-10-19)
- [x] **FT-002 (P0) Design tokens & base components** — Button, Input, Chip, Badge, ProgressBar, Toast, Accordion, BottomSheet. *AC:* matches DESIGN_SYSTEM; a11y labels. ✅ (Done 2026-10-19)
- [x] **FT-003 (P0) Bottom tab navigation** — 5 tabs, consistent back behavior. *AC:* no dead routes. ✅ (Done 2026-10-19)
- [x] **FT-004 (P0) Config & utilities** — `assumptions.ts`, `reach.ts`, `fees.ts`, formatters + unit tests. *AC:* tests pass; reach returns range. ✅ (Done 2026-10-19)
- [x] **FT-005 (P0) Seed data** — 12+ campaigns across all 10 categories & creator types, varied statuses, stories w/ sources, updates, reports. *AC:* consistent across feed/detail/dashboard; "Demo data" labelled. ✅ (Done 2026-10-19)
- [x] **FT-006 (P0) Service layer + mock/remote adapters** — typed services, `DATA_MODE` toggle. *AC:* app fully works in mock mode. ✅ (Done 2026-10-19)
- [x] **FT-007 (P0) Shared state components** — ScreenState (skeleton/empty/error), EmptyState, ErrorState. ✅ (Done 2026-10-19) 

## EPIC 1 — Backend & Data (P1; mock acceptable)
- **FT-010 Database schema & migrations** per DATA_MODEL_AND_API.
- **FT-011 Auth + guest sessions + RBAC middleware.**
- **FT-012 Campaign & draft endpoints** with Zod validation.
- **FT-013 Lifecycle service** (guards, transitions, audit log).
- **FT-014 Contribution endpoints + mock payment provider + receipts.**
- **FT-015 Activity/notification endpoints.**
- **FT-016 Reports endpoints.**
- **FT-017 Dev review endpoints** (optional, flag-protected).

## EPIC 2 — Home & Discovery
- [x] **FT-020 (P0) Home hero + CTAs + reach-per-dollar chip** with estimate info sheet. ✅
- [x] **FT-021 (P0) CampaignCard + skeleton.** ✅
- [x] **FT-022 (P0) Featured carousel + feed w/ pagination.** ✅
- [x] **FT-023 (P0) How It Works (Create → Review → Amplify).** ✅
- [x] **FT-024 (P0) Explore search + category chips.** *AC:* typing changes results (debounced). ✅
- [x] **FT-025 (P0) Sort & filter sheet.** *AC:* filters/sorts change data; active count; reset. ✅
- [x] **FT-026 (P0) Explore states** (loading, empty, no-results, error). ✅
- [x] **FT-027 (P1) Save/bookmark campaign** (guest sign-in prompt). ✅

## EPIC 3 — Campaign Detail
- [x] **FT-030 (P0) Header + status + share.** ✅
- [x] **FT-031 (P0) Story renderer** (headings, paragraphs, inline images w/ captions/credits, stats). ✅
- [x] **FT-032 (P0) Public Sources section.** ✅
- [x] **FT-033 (P0) Sticky funding bar + progress panel.** ✅
- [x] **FT-034 (P0) Use of Funds accordion** (fees, ad portion, refunds, unspent, "not direct support"). ✅
- [x] **FT-035 (P0) Audience & Distribution + disclosures.** ✅
- [x] **FT-036 (P0) Review/Trust/Feedback accordion** (no invented trust score; No/Somewhat/Yes). ✅
- [x] **FT-037 (P1) Updates tab/section.** ✅
- [ ] **FT-038 (P2) Comments with report/moderation.**

## EPIC 4 — Campaign Creation
- [x] **FT-040 (P0) Create tab entry + Resume Drafts list.** ✅
- [x] **FT-041 (P0) Wizard shell** — 5-step persistent indicator, save indicator, bottom bar, exit prompt, tap-to-jump. ✅
- [x] **FT-042 (P0) Draft store + autosave + resume** — state preserved on back; debounce; local + API. ✅
- [x] **FT-043 (P0) Step 1 Basics** — title ≤60 w/ counter, category, creator, summary, cover, validation, ad-headline note. ✅
- [x] **FT-044 (P0) Step 2 Story composer** — blocks (add/reorder/delete), toolbar, images w/ caption/credit, stats, sources (title+URL), audience actions, live preview. ✅
- [x] **FT-045 (P0) Step 3 Visuals** — cover, ad images/video, headline/description/CTA, placement previews, file validation, missing-asset warnings. ✅
- [x] **FT-046 (P0) Step 4 Reach** — geo, interests, channels, budget allocation, duration, audience preview, user-selected vs platform-finalized labels. ✅
- [x] **FT-047 (P0) Step 5 Submit** — full preview, creator-set funding goal, fees/policies, confirmations, Preview, Submit. *AC:* goal never auto-filled/overwritten. ✅
- [x] **FT-048 (P0) Submission confirmation + status timeline.** ✅
- [x] **FT-049 (P0) Validation framework** — field errors + summary with jump links. ✅
- [x] **FT-050 (P1) Voice creation flow** — questions, live transcript, editable output, demo fallback. ✅
- [x] **FT-051 (P1) AI suggest (Basics/Story)** — editable proposals; failure fallback. ✅
- [ ] **FT-052 (P2) Creative-quality feedback prompt.**

## EPIC 5 — Backing
- [x] **FT-060 (P0) Amount selection** — presets, custom, live reach estimate. ✅
- [x] **FT-061 (P0) Contribution review** — fee breakdown, terms/refund, "amplification not donation" acknowledgement. ✅
- [x] **FT-062 (P0) Simulated checkout** — guest allowed; states: success/pending/failed/rejected/cancelled. ✅
- [x] **FT-063 (P0) Confirmation + receipt + progress update + share.** ✅
- [x] **FT-064 (P0) Privacy toggle** — public name off by default. ✅
- [x] **FT-065 (P1) Follow campaign + tracking view.** ✅
- [x] **FT-066 (P1) Payment history in Profile.** ✅

## EPIC 6 — Dashboard, Reports, Activity, Profile
- [x] **FT-070 (P0) Creator Dashboard tabs** (6 states) with campaign cards. ✅
- [x] **FT-071 (P1) Campaign management** — edit draft, moderation feedback, respond to changes, updates, milestones. ✅
- [x] **FT-072 (P1) Analytics** — funds, spend, estimated vs measured reach, impressions, clicks. ✅
- [x] **FT-073 (P1) Final distribution report** screen. ✅
- [x] **FT-074 (P0) Activity center** — events list, filters, unread, deep links. ✅
- [x] **FT-075 (P1) Notification preferences.** ✅
- [x] **FT-076 (P0) Profile** — account, created/backed/saved, payment history, settings, help. ✅
- [x] **FT-077 (P1) Secondary pages** — Partners, About, How It Works, FAQs, Help, Contact, Terms, Privacy, Guidelines. ✅
- [x] **FT-078 (P1) Auth screens** — sign in/up, guest prompts, sign out. ✅

## EPIC 7 — Lifecycle & Review Simulation
- [x] **FT-080 (P0) Lifecycle engine** (client/server shared) and status chips. ✅
- [x] **FT-081 (P1) Optional dev review panel** to advance statuses for demo. ✅
- [x] **FT-082 (P1) Gate enforcement** — no publish/promote before approvals; funding complete ≠ promotion started. ✅
- [ ] **FT-083 (P2) Material-change re-review flow.**

## EPIC 8 — Polish, QA, Release
- [x] **FT-090 (P0) Accessibility & contrast pass.** (Touch targets ≥44, accessibilityRole/Labels, WCAG AA tokens) ✅
- [x] **FT-091 (P0) Small/large screen testing.** (SafeAreaInsets, flexible layout, scroll views) ✅
- [x] **FT-092 (P0) Copy audit.** (Zero "donation" wording, all reach figures labelled estimates) ✅
- [x] **FT-093 (P0) Demo data consistency audit.** (13 campaigns across 10 categories, synchronized in mock store) ✅
- [x] **FT-094 (P0) Unit tests.** (16/16 tests passing for fees, reach, lifecycle, store, rules) ✅
- [ ] **FT-095 (P0) EAS Android APK build.** (`eas.json` configured for APK generation)
- [ ] **FT-096 (P0) Demo video.** (Script and Dev Review Panel ready in Profile for recording)
- [ ] **FT-097 (P2) iOS TestFlight build.**

## Ticket Template
```
ID / Title / Priority / Epic
Description
Acceptance criteria (testable)
States covered: loading / empty / error / success
Dependencies
Implementation plan approved? [ ] yes (date)
```
