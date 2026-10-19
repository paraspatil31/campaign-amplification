# Campaign Amplification Platform — Documentation Hub

Welcome to the internal engineering and product documentation for the **Campaign Amplification Platform**.

For high-level project setup, feature overviews, and quick start instructions, please refer to the primary [**Root README.md**](file:///README.md).

---

## 📑 Core Documentation Index

| Document | Purpose & Scope | Primary Audience |
|---|---|---|
| [**AGENT.md**](file:///doc/AGENT.md) | Agent rules, workflows, and strict core constraints (e.g., amplification vs donation) | AI Agents, Engineers |
| [**PROGRESS.md**](file:///doc/PROGRESS.md) | Live feature implementation tracking and milestone statuses | Project Managers, Reviewers |
| [**PRD.md**](file:///doc/PRD.md) | Comprehensive Product Requirements Document, user stories, and acceptance criteria | Product Managers, Designers |
| [**TECHNICAL_ARCHITECTURE.md**](file:///doc/TECHNICAL_ARCHITECTURE.md) | System components, directory structure, tech stack, and state management | Architects, Engineers |
| [**DATA_MODEL_AND_API.md**](file:///doc/DATA_MODEL_AND_API.md) | Data schemas, TypeScript interfaces, validation models, and mock API contracts | Frontend & Backend Engineers |
| [**CAMPAIGN_LIFECYCLE.md**](file:///doc/CAMPAIGN_LIFECYCLE.md) | State machine specifications, transition triggers, and audit trail events | Engineers, QA |
| [**SECURITY_AND_ACCESS.md**](file:///doc/SECURITY_AND_ACCESS.md) | Role-based access control, privacy-by-default rules, and data retention | Security, Compliance |
| [**FRONTEND_SPECIFICATION.md**](file:///doc/FRONTEND_SPECIFICATION.md) | Screen layouts, interaction patterns, modal sheets, and transitions | UI/UX Engineers |
| [**DESIGN_SYSTEM.md**](file:///doc/DESIGN_SYSTEM.md) | Color palettes, typography scale, spacing tokens, and component styles | Designers, UI Engineers |
| [**FEATURE_TICKETS.md**](file:///doc/FEATURE_TICKETS.md) | Detailed work breakdown structure across Epics 0 through 7 | Engineering Team |
| [**IMPLEMENTATION_PLAN_TEMPLATE.md**](file:///doc/IMPLEMENTATION_PLAN_TEMPLATE.md) | Standard pre-execution planning template for task execution | AI Agents, Engineers |
| [**QA_AND_ACCEPTANCE_CHECKLIST.md**](file:///doc/QA_AND_ACCEPTANCE_CHECKLIST.md) | 100+ point verification checklist for acceptance testing | QA Engineers, Evaluators |
| [**SUBMISSION_AND_DEMO_PLAN.md**](file:///doc/SUBMISSION_AND_DEMO_PLAN.md) | Standalone APK instructions, reviewer walk-through, and demo video script | Evaluators, Stakeholders |

---

## 🔑 Key Architecture & Non-Negotiables

1. **Amplification Model**: All financial contributions are explicitly pooled to fund digital distribution reach (paid social ad impressions on Meta, TikTok, X, etc.) rather than direct creator cash handouts.
2. **Estimated Reach**: Reach metrics are transparent estimations governed by category CPM algorithms ($8.00–$25.00/1,000 impressions).
3. **Creator-Defined Goals**: Financial targets are established in Step 5 of the creation wizard by the creator.
4. **Developer Review Panel**: Located directly under the Profile tab for reviewers to manipulate campaign states on demand without backend latency.
