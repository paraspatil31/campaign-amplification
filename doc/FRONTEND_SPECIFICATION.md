# FRONTEND SPECIFICATION (Mobile-First)

## 1. Navigation
Bottom tab bar (always visible on top-level screens): **Home · Explore · Create · Activity · Profile**. Activity tab shows unread badge. Stack screens (detail, back flow, creation steps) hide tabs but always show a clear back button. Back behavior is consistent: step back inside flows; exit prompts "Save draft?" when leaving creation.

## 2. Global UX Rules
- One primary action per screen; secondary details collapsible.
- Next-action clarity: sticky bottom CTA bar in flows.
- Every screen: loading (skeleton), empty, error (retry), success.
- Toasts for save/submit/back/status change; haptic on success.
- "Demo data" chip wherever sample figures appear; "Estimate" label on reach.
- Safe-area aware; one-handed reach for primary buttons (bottom).
- Min touch 44pt; text ≥ 16 body; supports dynamic type; labels on icons.
- Motion: 150–250 ms, purposeful (progress fill, accordion, step slide); respect reduced-motion.

## 3. Screens

### 3.1 Home
Hero (headline "Help important messages travel further", sub-copy, CTAs Explore / Start a Campaign, reach-per-dollar estimate chip with info sheet) → Featured carousel → How It Works (3-step Create → Review → Amplify, with one-line each) → Campaign feed (infinite) → "Not a donation" explainer strip.

### 3.2 Explore
Sticky search bar → category chips (horizontal) → sort & filter button (bottom sheet: sort, category multi, status, funding %, reach range, Apply/Reset, active-filter count) → results list/cards. States: skeleton list, no-results (suggest clearing filters), error with retry, empty-category.

### 3.3 Campaign Card (reusable)
Rounded 16–20 radius, cover image, category pill, title (2 lines), creator, 2-line summary, raised/goal, progress bar + %, "Est. reach at goal ≈ X–Y people", **Back This Campaign** button. Tap card → detail. Bookmark icon (auth prompt for guests).

### 3.4 Campaign Detail
- Header: cover, back, share, category, title, creator, date, status chip.
- Story: editorial typography (line length ≤ ~65 chars equivalent, 17pt/26 leading), images inline with captions/credits, stat callouts, **Sources** section (title + link, opens in-app browser).
- Sticky bottom funding bar: raised/goal, %, days left, Back button; tap expands panel with est. reach and Share.
- Expandables: Use of Funds (fees, ad portion, allocation, refunds, unspent funds, "funds distribution not the cause"), Audience & Distribution (+ privacy/ad disclosure), Review & Trust (process, sources, verification wording as supported, partners), Feedback (No/Somewhat/Yes ×2 questions), Updates, optional comments.
- Status banners for non-funding states (Under review, Promoting, Completed → View report).

### 3.5 Create Tab
Two cards: **Create Manually**, **Create with Your Voice**. Below: **Resume draft** list (title, step, last saved, progress ring, delete). Empty state if no drafts.

### 3.6 Creation Wizard (shared shell)
Header: close (save-draft prompt), step title, "Saved · 12:04" indicator. **5-segment progress indicator pinned** with labels: Basics · Story · Visuals · Reach · Submit (tap completed steps to jump). Bottom bar: Back · Save Draft · Continue. Autosave debounce. Mode badge: Editing / Previewing / Submitting.

**Step 1 Basics:** title input w/ counter x/60 and helper about ad headline; category picker (sheet); creator/org; summary (counter); cover upload; "✨ Suggest with AI" (optional; shows editable suggestions with Accept / Edit / Dismiss).
**Step 2 Story:** block-based composer: Headline, Intro, then blocks (Section heading + paragraph, Image, Statistic, Quote, Source list). Block actions: drag handle / up-down arrows (accessible), duplicate, delete. Formatting toolbar: Bold, Italic, H2, List, Link. Sources manager (title+URL validation, reorder). Suggested audience actions (up to 3 chips editable). Toggle: Edit ⇄ Live Preview.
**Step 3 Visuals:** cover picker; ad images grid with validation badges; optional video; ad headline (default from title start), description, CTA select/text; placement preview carousel (Feed, Story, Banner); missing-asset warnings; optional "Get creative feedback" (stubbed AI).
**Step 4 Reach:** location multi-select (search + chips), interests chips, channels toggles (e.g., Social feed, Search, Display — demo), budget allocation per channel (sliders sum to 100%), duration (7/14/30/custom), audience preview card (who/where/how it may appear), two-section layout: "You selected" vs "Platform may finalize in review"; disclaimer "No fixed audience size is guaranteed."
**Step 5 Submit:** full preview (collapsible sections w/ Edit links to each step), **Funding goal input (creator-set, required, min/max, shows est. reach range live)**, fees & policies summary, duration, rules checkbox(es), buttons Back / Save Draft / Preview Campaign / Submit for Review. Validation summary lists missing items with jump links.
**Done:** success illustration, submission ID, status timeline (Submitted → In review → Approved/Changes → Available for funding → Funding → Distribution prep → Promoting → Completed), CTAs "View in Dashboard", "Create another".

### 3.7 Voice Creation
Permission prompt → guided questions one at a time (What's the idea? Who should hear it? Why does it matter? What evidence supports it?) with waveform + live transcript (editable) → "Generating draft…" → lands in Step 1 prefilled, with banner "AI-drafted — review and edit everything". Fallback: if mic/AI unavailable, show demo mode (prefilled sample transcript) or "Continue manually".

### 3.8 Backing Flow
Stack with 4-dot indicator: Amount → Review → Payment → Result (Inspect = detail page).
- **Amount:** presets, custom input, live "Est. reach ≈ X–Y people" (labelled estimate), info card "Funds distribution, not the cause". Optional "Show my name publicly" off by default.
- **Review:** breakdown (contribution, platform fee, processing fee, total), ad budget portion, reach estimate, funding progress after contribution, terms & refund link, mandatory acknowledgement checkbox.
- **Payment (simulated):** banner "Simulated checkout — no real charge"; method selector (Test card, Wallet demo); guest email optional; Pay button; processing spinner; outcomes: **Success, Pending, Failed, Rejected, Cancelled** each with accurate copy and next step (retry / change method / back).
- **Result:** confirmation, receipt button (receipt screen with ID, date, masked method, breakdown), updated progress animation, Share, "Follow this campaign".

### 3.9 Activity
Segmented: All · Funding · Updates · Following · Security. Grouped by day, unread dot, deep-link into campaign/receipt/report. "Mark all read". Settings gear → notification preferences (per category toggles, push/email placeholders). Empty & error states.

### 3.10 Profile
Header (avatar, name, role switch not needed—single account) → Created Campaigns (→ Dashboard) · Backed · Saved · Payment History · Notification & Account Settings · Help (FAQs, Contact) · About, How It Works, Partners, Terms, Privacy, Community Guidelines · Sign out. Guest state: sign-in/sign-up card with note that browsing/backing works without account.

### 3.11 Creator Dashboard
Tabs: Drafts · Under Review · Published/Funding · Promoting · Completed · Requires Action (badge count). Campaign row card: thumbnail, title, status chip, progress, goal, deadline, est. reach, primary action by state. Detail: moderation feedback thread, respond/edit, milestones, updates composer, promotion progress, analytics section, final report.

### 3.12 Reports
Metrics grouped: **Funds** (raised, fees, ad budget) · **Spend** (allocated vs spent) · **Delivery (measured)**: impressions, clicks, CTR · **Reach** (labelled *Estimated* vs *Measured*). Legend explaining difference. Download/share report (stub).

### 3.13 Secondary Pages
Simple readable content pages with shared layout; FAQ accordion; Contact form (validation + success); Help.

### 3.14 Optional Dev Review Panel (hidden)
Triggered from Profile → long-press version / env flag; list of submitted campaigns with Approve / Request changes / Reject to advance seeded flow for demo recording. Not in the main nav.

## 4. Component Library
Button (primary/secondary/ghost/destructive, loading), Input, TextArea w/ counter, Select/Sheet, Chip, Badge/StatusChip, ProgressBar, StepIndicator, CampaignCard, CampaignCardSkeleton, Accordion, BottomSheet, Toast, EmptyState, ErrorState, InfoTooltip/ExplainerSheet, StickyFundingBar, StatBlock, SourceItem, ImageWithCaption, BlockEditor, TimelineList, NotificationItem, Receipt, MetricTile.

## 5. Copy Guidelines
Plain language; "Back this campaign"; "Estimated reach"; "Review"; "Funds go to advertising distribution"; avoid "donate", "guaranteed", "verified" (unless process supports).

## 6. Accessibility Checklist
Contrast AA, labels/roles/hints, focus order, no color-only status (icon+text), error messages tied to fields, reduce-motion, screen-reader order of sticky bars, large-text layout tested.

## 7. Responsive Targets
360×640, 390×844, 430×932; tablet graceful max-width container (600).
