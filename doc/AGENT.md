# AGENT.md — Operating Rules for the AI Coding Agent

> Read this file first, every session. Then read `PROGRESS.md`.

## 0. MANDATORY RULE — PLAN BEFORE EXECUTION
**Before executing ANY task (coding, refactoring, installing packages, schema changes, file deletion, config changes), the agent MUST:**
1. Write an **Implementation Plan** using `IMPLEMENTATION_PLAN_TEMPLATE.md`.
2. **Show it to the user and WAIT for explicit approval** ("approved", "go ahead", or edits).
3. Only then start executing. If scope changes mid-task, stop and present an updated plan.
4. After finishing, update `PROGRESS.md` and the relevant ticket in `FEATURE_TICKETS.md`.

No exceptions, including "small" tasks. Trivial typo fixes may use a one-line plan, but it must still be shown first.

## 1. Project Summary
Mobile prototype (React Native + Expo) for the **Campaign Amplification Platform**: a community-funded message-amplification product. Backers pool money toward **ad distribution costs**; it is **NOT a donation platform**. Contributions fund reach, never the cause/person/organization directly.

Context from the briefing video: single account can act as audience, creator, and backer (no separate logins); no source code submission; evaluation is via a clear demo video plus APK (TestFlight optional); admin/review is NOT part of the assignment.

## 2. Source-of-Truth Documents
| File | Purpose |
|---|---|
| `PRD.md` | What & why |
| `FRONTEND_SPECIFICATION.md` | Screens, components, UX |
| `DESIGN_SYSTEM.md` | Tokens, typography, components |
| `TECHNICAL_ARCHITECTURE.md` | Stack, structure, state, services |
| `DATA_MODEL_AND_API.md` | Schema and endpoints |
| `CAMPAIGN_LIFECYCLE.md` | State machine |
| `SECURITY_AND_ACCESS.md` | Roles, validation, privacy |
| `FEATURE_TICKETS.md` | Work breakdown |
| `QA_AND_ACCEPTANCE_CHECKLIST.md` | Definition of done |
| `SUBMISSION_AND_DEMO_PLAN.md` | APK + video |
| `PROGRESS.md` | Live status |

If documents conflict: PRD > Lifecycle > Security > Frontend Spec > others. Raise the conflict with the user.

## 3. Non-Negotiable Product Rules
1. Wording: "Back this campaign", "contribute to reach". Never "donate".
2. Every backing screen states: *contribution funds distribution of the message, not direct support for the cause.*
3. Creation steps in fixed order: **Basics → Story → Campaign & Ad Visuals → Reach → Submit**. No extra setup screens between them.
4. **Creator sets funding goal at Submit step.** AI/earlier steps never set or overwrite it.
5. Reach is always an **estimate**, labelled as such, never a guarantee. Estimates are never mixed with measured delivery.
6. Browsing works without an account; guest backing allowed.
7. Sources are visible to audiences on the public campaign page.
8. Never invent trust scores or claim independent verification.
9. Funding complete does NOT imply promotion started.
10. Backer names private by default.
11. All demo/sample figures labelled "Demo data".
12. AI/voice must be optional, fully editable, and have a demo/manual fallback.
13. No dead buttons. Every tappable element works or is hidden/clearly "Coming soon".

## 4. Coding Standards
- TypeScript strict mode; no `any` without a comment.
- Expo SDK (latest stable), Expo Router, functional components + hooks.
- Reusable components in `src/components`; feature code in `src/features/<name>`.
- Shared types from one `types` module; never duplicate shapes.
- Validate with Zod on client AND server.
- Every async screen implements: loading (skeleton), empty, error (with retry), success.
- Touch targets ≥ 44×44 pt; contrast ≥ WCAG AA; support dynamic font sizes.
- Accessibility labels on all icons/buttons.
- Conventional commits (`feat:`, `fix:`, `chore:`, `docs:`).
- No secrets in repo; use `.env` + `.env.example`.

## 5. Workflow Per Task
1. Read `PROGRESS.md` + the ticket.
2. **Produce implementation plan → get approval.**
3. Implement in small steps; run type-check and lint.
4. Test on small (360×640) and large (430×932) viewports.
5. Update `PROGRESS.md`, check off ticket acceptance criteria.
6. Summarize changes, list anything deferred.

## 6. Do / Don't
**Do:** ask when requirements are ambiguous; keep demo data consistent across feed, detail, dashboard; keep the UI calm and uncluttered; make next action obvious.
**Don't:** build admin UI (out of scope, optional mock only); add unrequested features that distract from the main journey; hardcode strings that belong in constants; store card data (payment is simulated); expose private backer data.

## 7. Prototype Priorities (if time is short)
P0: Campaign creation (5 steps, drafts, submit, status) → Detail page → Backing flow → Explore → Home.
P1: Activity, Profile/dashboard, reports.
P2: Voice/AI assist, secondary pages, notification preferences, comments.
