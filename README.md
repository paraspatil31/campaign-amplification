# Campaign Amplification Platform 🚀

A modern, high-performance mobile application built with **React Native (0.88)** and **Expo (SDK 58)** designed for **community-funded message amplification**. 

Instead of funding creators or organizations directly, backers pool financial resources to purchase targeted, high-impact digital distribution (Meta, TikTok, X, YouTube, Google Display) to scale awareness, citizen journalism, social causes, and creative campaigns.

---

## 🌟 Core Concepts & Principles

* **Amplification, Not Donations**: Contributions directly fund digital distribution and reach campaigns—never direct creator payouts or charity donations.
* **Estimated Reach Transparency**: All audience impressions and reach metrics are clearly qualified as **estimates** based on real-world CPM (Cost Per Mille) market dynamics ($8.00–$25.00 per thousand impressions depending on category & audience specificity).
* **Creator-Defined Goals**: Funding targets and minimum thresholds are explicitly established by creators in the creation wizard.
* **Privacy by Default**: Backers are anonymous by default with an explicit opt-in to display their display name publicly.
* **Full Accountability & Proof of Performance**: Real-time distribution reports and Final Distribution Reports showcase exact ad placement screenshots, delivery metrics, CPM achieved, and regional delivery breakdowns.

---

## 📱 Feature Highlights

### 1. Explore & Discovery
- **Hero Amplification Showcase**: Dynamic hero cards with live reach calculation per contribution dollar.
- **Search & Filter Engine**: Instant title/tag search, horizontal category selector (Human Rights, Climate, Tech, Public Health, etc.), and lifecycle status chips.
- **Dynamic Sorting**: Filter by Trending, Ending Soon, Most Backed, Highest Funded, and Newest.

### 2. Campaign Deep Dive & Evidence
- **Interactive Story Blocks**: Formatted narrative blocks with rich media headers and creator identity badges.
- **Verified Public Sources**: Clickable reference links citing peer-reviewed reports, news articles, and primary sources with verification badges.
- **Transparent Use of Funds**: Interactive progress breakdown displaying standard allocation (70% Paid Ad Spend, 15% Creative Assets & Localization, 10% Platform & Payment Processing, 5% Contingency & Verification Reserve).
- **Target Audience Specification**: Detailed geographic, demographic, and platform targets.
- **Trust & Community Signals**: Credibility ratings, backer activity indicators, report/flag modal.
- **Sticky Backing Bar**: Real-time progress bar, percentage funded, days remaining, and quick action drawer.

### 3. 5-Step Creator Wizard & AI Voice Assistant
- **Guided Step-by-Step Flow**:
  1. **Basics**: Title, tagline, category selection, hero image picker.
  2. **Story Blocks**: Rich text narrative sections, key objectives, and verified source citations.
  3. **Ad Creative Visuals**: Multi-platform format previews (Meta Feed 1:1, TikTok/Reels 9:16, X Thread 16:9) with custom messaging.
  4. **Audience Targeting**: Age groups, regions, interests, and target ad networks.
  5. **Creator-Defined Goal & CPM Review**: Target reach estimation slider, minimum launch threshold, and budget allocation breakdown.
- **Debounced Autosave**: Automatic draft persistence with 800ms debounce to prevent data loss.
- **AI Voice Assistant**: Conversational audio transcription modal allowing creators to speak their campaign narrative, auto-extracting titles, targets, and copy.
- **Review & Submission**: Pre-submission checklist and 4-phase review timeline preview.

### 4. Backing Flow & Instant Receipts
- **Smart Contribution Presets**: Quick select buttons ($10, $25, $50, $100) or custom amounts (min $5).
- **Live Estimated Reach Calculator**: Dynamically computes estimated impressions based on campaign CPM in real time.
- **Transparent Fee Breakdown**: Clear view of ad pool contribution vs processing fees.
- **Simulated Payment Gateway**: Card input (number, expiry, CVC) and One-Tap Digital Wallet (Apple Pay / Google Pay).
- **Downloadable Receipts**: Instant proof of transaction with transaction IDs, time stamps, and reach estimates, saved directly to user receipt history.

### 5. Creator Dashboard & Lifecycle Management
- **Status Tabs**: Categorized management for `Draft`, `In Review`, `Active`, `In Distribution`, `Completed`, and `Rejected`.
- **Live Distribution Metrics**: Active campaigns display impressions delivered, clicks generated, and average CPM.
- **Final Distribution Reports**: Verifiable post-campaign performance dossiers including regional heatmaps and live ad placement proofs.

### 6. Activity Feed & Account Hub
- **Notification & Update Hub**: Filterable feed (All, Updates, Milestones, Backings) with unread indicators and deep links.
- **Backing History**: List of supported campaigns with access to individual digital receipts.
- **Compliance & Legal Overlays**: Interactive sheets for FAQ, Terms of Service, Privacy Policy, and Community Guidelines.

### 7. Built-in Evaluator / Reviewer Tooling
- **Developer Review Panel**: Accessible directly in the **Profile** tab under **"Developer Review Panel"**.
  - One-tap lifecycle state switcher to instantly toggle any campaign into `draft`, `submitted`, `in_review`, `active`, `funded`, `in_distribution`, `completed`, or `flagged`.
  - Reset store button to restore clean baseline seed data at any time.

---

## 🛠️ Architecture & Tech Stack

```
├── app/                              # Expo Router v4 navigation & screen routes
│   ├── (tabs)/
│   │   ├── index.tsx                 # Home screen (Hero, trending, categories)
│   │   ├── explore.tsx               # Discovery, search, filters & sort
│   │   ├── create.tsx                # Campaign wizard entry & draft resume
│   │   ├── activity.tsx              # Notifications & updates feed
│   │   └── profile.tsx               # User account, receipts & developer tools
│   ├── campaign/
│   │   └── [id].tsx                  # Campaign Detail screen with tabs & sticky bar
│   ├── create/
│   │   ├── [draftId].tsx             # 5-Step Creation Wizard
│   │   └── submitted.tsx             # Submission confirmation & timeline
│   └── _layout.tsx                   # Root navigation shell & theme provider
├── src/
│   ├── core/
│   │   ├── constants/                # Theme colors, typography, layout tokens
│   │   └── utils/                    # Reach engine, formatting & validation utilities
│   ├── features/
│   │   ├── backing/                  # BackingModal, receipt generator
│   │   ├── campaign/                 # StoryRenderer, Audience, UseOfFunds, Updates
│   │   ├── create/                   # Wizard steps, VoiceAssistantModal
│   │   ├── dashboard/                # CreatorDashboardModal & distribution analytics
│   │   ├── dev/                      # DevReviewPanelModal (lifecycle state tester)
│   │   └── profile/                  # ReceiptsHistoryModal, SecondaryPageModal
│   ├── store/
│   │   └── mockStore.ts              # Zustand store with offline persistence & state machines
│   ├── data/
│   │   └── seedCampaigns.ts          # 13 high-fidelity preloaded realistic campaigns
│   └── types/
│       └── campaign.ts               # Strict TypeScript definitions & Zod schemas
├── doc/                              # Exhaustive product specifications & guides
└── __tests__/                        # Comprehensive unit & business logic test suite
```

### Technology Highlights
* **Framework**: [Expo SDK 58](https://expo.dev) + [React Native 0.88](https://reactnative.dev)
* **Routing**: [Expo Router v4](https://docs.expo.dev/router/introduction/) (File-system based navigation)
* **Language**: TypeScript 5.8 (Strict mode enabled, zero `any`)
* **State Management**: [Zustand 5](https://github.com/pmndrs/zustand)
* **Validation**: [Zod 3](https://zod.dev)
* **Icons**: `@expo/vector-icons` (Ionicons)
* **Styling**: Vanilla React Native StyleSheet system with strict token hierarchy

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org) (v18.0 or higher recommended)
* [npm](https://www.npmjs.com) or [yarn](https://yarnpkg.com)
* [Expo Go](https://expo.dev/client) app installed on your physical device, or an Android/iOS emulator

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd "app asseement"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npx expo start
   ```

4. **Run on Target Platform**:
   - **Android**: Press `a` in the terminal or run `npm run android`
   - **iOS**: Press `i` in the terminal or run `npm run ios`
   - **Web**: Press `w` in the terminal or run `npm run web`
   - **Physical Device**: Scan the QR code displayed in the terminal with the **Expo Go** app.

---

## 🧪 Testing & Code Quality

The project includes an automated test suite verifying core business rules:
- **Reach Engine Calculations**: Validates dynamic CPM tiers ($8–$25) and impression estimation logic.
- **Budget Allocations**: Verifies standard 70/15/10/5 fund distribution sums to exactly 100%.
- **Funding Goal Constraints**: Confirms creator-defined thresholds and backer limits.
- **Campaign State Transitions**: Validates strict state transitions (`draft` → `submitted` → `in_review` → `active` → `funded` → `in_distribution` → `completed`).
- **Terminology Adherence**: Regression testing ensuring no "donation" terminology is present.

### Run Tests
```bash
npm test
```
*Outputs: 16 passing unit test suites with 0 failures.*

### Run Type Checking
```bash
npm run typecheck
```
*Outputs: Zero TypeScript compilation errors.*

---

## 📦 Android APK Build (EAS)

The project includes a ready-to-build configuration in `eas.json` for standalone Android APK generation:

```bash
# Build standalone preview APK
npx eas-cli build -p android --profile preview
```

The resulting `.apk` can be installed directly onto any Android device without requiring Expo Go or development server connectivity.

---

## 📖 Detailed Documentation

Comprehensive system architecture and product documentation are available in the [`doc/`](file:///doc/) directory:

| Document | Description |
|---|---|
| [**PRD.md**](file:///doc/PRD.md) | Complete Product Requirements Document & user personas |
| [**TECHNICAL_ARCHITECTURE.md**](file:///doc/TECHNICAL_ARCHITECTURE.md) | System components, directory structure & state flows |
| [**DATA_MODEL_AND_API.md**](file:///doc/DATA_MODEL_AND_API.md) | Data schemas, models, and mock service contracts |
| [**CAMPAIGN_LIFECYCLE.md**](file:///doc/CAMPAIGN_LIFECYCLE.md) | State machine specifications & audit trail events |
| [**FEATURE_TICKETS.md**](file:///doc/FEATURE_TICKETS.md) | Implementation epics and completed milestone tickets |
| [**DESIGN_SYSTEM.md**](file:///doc/DESIGN_SYSTEM.md) | Visual design tokens, color palette, and spacing scales |
| [**QA_AND_ACCEPTANCE_CHECKLIST.md**](file:///doc/QA_AND_ACCEPTANCE_CHECKLIST.md) | Verified verification matrix across 100+ criteria |
| [**SUBMISSION_AND_DEMO_PLAN.md**](file:///doc/SUBMISSION_AND_DEMO_PLAN.md) | Step-by-step evaluation guide and video demonstration script |

---

## ⚖️ License
Proprietary evaluation prototype developed for the mobile application assessment. All rights reserved.
