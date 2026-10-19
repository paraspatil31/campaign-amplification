# QA AND ACCEPTANCE CHECKLIST

## Product Rules
- [ ] No "donate/donation" wording; "not a donation" explainer visible on Home, detail, backing
- [ ] Every reach figure labelled Estimate; no guarantees; ranges used
- [ ] Demo data labelled
- [ ] Sources visible on public campaign page
- [ ] No invented trust score or false verification claim
- [ ] Funding goal entered by creator at Step 5 only
- [ ] Funding complete does not auto-start promotion
- [ ] Backer names private by default

## Navigation
- [ ] 5 tabs stable; back behavior consistent; no dead buttons
- [ ] Secondary pages reachable (Partners, About, How It Works, FAQs, Help, Contact, Terms, Privacy, Guidelines)

## Home / Explore
- [ ] Hero CTAs work; reach-per-dollar estimate configurable
- [ ] Cards show all required fields; Back button works
- [ ] Search, category, sort, filters change results
- [ ] Loading / empty / no-results / error states

## Creation
- [ ] 5 steps in order, no extra setup screens; progress indicator persistent
- [ ] Title max 60 + counter; required validation messages
- [ ] Autosave; resume from Create tab; state kept on Back
- [ ] Story: add/reorder/delete sections, images + captions/credits, stats, sources, preview
- [ ] Visuals: validation + missing-asset warnings + placement previews
- [ ] Reach: user-selected vs platform-finalized labelled; no fixed audience promise
- [ ] Submit: full preview, creator goal, rules confirmation, fees shown
- [ ] Confirmation + status timeline
- [ ] Voice/AI optional, editable, fallback works

## Backing
- [ ] Presets + custom amount; reach updates live
- [ ] Fee breakdown & total correct (unit-tested)
- [ ] Guest checkout works; simulated checkout labelled
- [ ] Pending / failed / rejected / cancelled states accurate
- [ ] Receipt, updated progress, share
- [ ] Tracking updates & report

## Dashboard / Activity / Profile
- [ ] 6 dashboard tabs filter correctly
- [ ] Estimated vs measured metrics separated
- [ ] Notifications for all listed events; preferences work
- [ ] Profile sections present

## Technical
- [ ] TypeScript strict passes; lint clean
- [ ] Works in mock mode offline
- [ ] 360×640 and 430×932 layouts OK; large font OK
- [ ] AA contrast; labels on icons
- [ ] APK installs on a physical Android device; no crashes through full flow
