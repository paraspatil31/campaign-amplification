import {
  Campaign,
  CampaignFilters,
  Draft,
  Contribution,
  Receipt,
  ActivityItem,
  DistributionReport,
  CampaignStatus,
} from '../../types';
import { SEED_CAMPAIGNS } from '../../data/seed/campaigns';
import { SEED_ACTIVITIES } from '../../data/seed/activities';
import { SEED_REPORTS } from '../../data/seed/reports';
import { calcFees } from '../../lib/fees';
import { estimateReachAtGoal } from '../../lib/reach';

class MockStore {
  private campaigns: Campaign[] = [...SEED_CAMPAIGNS];
  private drafts: Draft[] = [];
  private contributions: Contribution[] = [];
  private receipts: Receipt[] = [];
  private activities: ActivityItem[] = [...SEED_ACTIVITIES];
  private reports: DistributionReport[] = [...SEED_REPORTS];

  // --- Campaigns ---
  getCampaigns(filters?: CampaignFilters): Campaign[] {
    let result = [...this.campaigns];

    if (filters?.category) {
      result = result.filter((c) => c.category === filters.category);
    }

    if (filters?.status) {
      if (filters.status === 'active') {
        result = result.filter((c) =>
          ['available_for_funding', 'goal_reached', 'promoting'].includes(c.status)
        );
      } else if (filters.status !== 'all') {
        result = result.filter((c) => c.status === filters.status);
      }
    }

    if (filters?.query) {
      const q = filters.query.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.summary.toLowerCase().includes(q) ||
          c.creatorName.toLowerCase().includes(q)
      );
    }

    if (filters?.minFundedPercent !== undefined) {
      result = result.filter(
        (c) => (c.raisedCents / c.fundingGoalCents) * 100 >= filters.minFundedPercent!
      );
    }

    // Sort
    switch (filters?.sortBy) {
      case 'newest':
        result.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'most_funded':
        result.sort((a, b) => b.raisedCents - a.raisedCents);
        break;
      case 'ending_soon':
        result.sort((a, b) => {
          const aEnd = a.fundingEndsAt ? new Date(a.fundingEndsAt).getTime() : Infinity;
          const bEnd = b.fundingEndsAt ? new Date(b.fundingEndsAt).getTime() : Infinity;
          return aEnd - bEnd;
        });
        break;
      case 'closest_to_goal':
        result.sort((a, b) => {
          const aRemain = a.fundingGoalCents - a.raisedCents;
          const bRemain = b.fundingGoalCents - b.raisedCents;
          return aRemain - bRemain;
        });
        break;
      case 'trending':
      default:
        result.sort((a, b) => b.backerCount - a.backerCount);
        break;
    }

    return result;
  }

  getCampaignById(id: string): Campaign | undefined {
    return this.campaigns.find((c) => c.id === id);
  }

  // --- Drafts ---
  getDrafts(userId: string): Draft[] {
    return this.drafts.filter((d) => d.userId === userId);
  }

  getDraftById(id: string): Draft | undefined {
    return this.drafts.find((d) => d.id === id);
  }

  saveDraft(draft: Draft): Draft {
    const existingIndex = this.drafts.findIndex((d) => d.id === draft.id);
    const updatedDraft: Draft = {
      ...draft,
      lastSavedAt: new Date().toISOString(),
    };
    if (existingIndex >= 0) {
      this.drafts[existingIndex] = updatedDraft;
    } else {
      this.drafts.push(updatedDraft);
    }
    return updatedDraft;
  }

  deleteDraft(id: string): boolean {
    const initialLen = this.drafts.length;
    this.drafts = this.drafts.filter((d) => d.id !== id);
    return this.drafts.length < initialLen;
  }

  submitDraft(draftId: string): Campaign {
    const draft = this.drafts.find((d) => d.id === draftId);
    if (!draft) {
      throw new Error('Draft not found');
    }

    const campaignId = `camp-${Date.now()}`;
    const goalCents = draft.data.fundingGoalCents || 100000;
    const reach = estimateReachAtGoal(goalCents);

    const newCampaign: Campaign = {
      id: campaignId,
      creatorId: draft.userId,
      status: 'submitted',
      title: draft.data.title || 'Untitled Campaign',
      category: draft.data.category || 'Environment',
      creatorName: draft.data.creatorName || 'Anonymous Creator',
      creatorType: draft.data.creatorType || 'Individual',
      summary: draft.data.summary || '',
      coverUrl:
        draft.data.coverUrl ||
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      storyBlocks: draft.data.storyBlocks || [],
      sources: draft.data.sources || [],
      adHeadline: draft.data.adHeadline || draft.data.title || '',
      adDescription: draft.data.adDescription || draft.data.summary || '',
      ctaText: draft.data.ctaText || 'Learn More',
      adAssets: draft.data.adAssets || [],
      target: draft.data.target || {
        locations: ['National'],
        interests: ['General Public'],
        channels: ['Social Feed'],
        channelAllocations: { 'Social Feed': 100 },
        durationDays: 30,
      },
      durationDays: draft.data.durationDays || 30,
      fundingGoalCents: goalCents,
      goalSetBy: 'creator',
      estReachLow: reach.low,
      estReachHigh: reach.high,
      raisedCents: 0,
      backerCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isDemoData: true,
    };

    this.campaigns.unshift(newCampaign);
    this.deleteDraft(draftId);

    // Add submission activity item
    this.activities.unshift({
      id: `act-${Date.now()}`,
      userId: draft.userId,
      type: 'submission_received',
      campaignId: newCampaign.id,
      title: 'Campaign Submitted for Review',
      body: `"${newCampaign.title}" is in the review queue. We will check sources and ad compliance shortly.`,
      createdAt: new Date().toISOString(),
    });

    return newCampaign;
  }

  // --- Contributions & Payments ---
  createContribution(
    campaignId: string,
    amountUsd: number,
    options: { userId?: string; guestEmail?: string; publicNameOptIn?: boolean; backerName?: string }
  ): { contribution: Contribution; receipt: Receipt } {
    const campaign = this.campaigns.find((c) => c.id === campaignId);
    if (!campaign) {
      throw new Error('Campaign not found');
    }

    const fees = calcFees(amountUsd);
    const contributionId = `cnt-${Date.now()}`;
    const receiptId = `rcp-${Date.now()}`;
    const receiptNumber = `RCP-${Math.floor(10000 + Math.random() * 90000)}`;

    const contribution: Contribution = {
      id: contributionId,
      campaignId,
      campaignTitle: campaign.title,
      userId: options.userId,
      guestEmail: options.guestEmail,
      amountCents: fees.amountCents,
      platformFeeCents: fees.platformFeeCents,
      processingFeeCents: fees.processingFeeCents,
      totalCents: fees.totalCents,
      status: 'succeeded',
      publicNameOptIn: options.publicNameOptIn || false,
      backerName: options.publicNameOptIn ? options.backerName : undefined,
      providerRef: `mock_ch_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    const receipt: Receipt = {
      id: receiptId,
      contributionId,
      number: receiptNumber,
      issuedAt: new Date().toISOString(),
      campaignTitle: campaign.title,
      amountCents: fees.amountCents,
      platformFeeCents: fees.platformFeeCents,
      processingFeeCents: fees.processingFeeCents,
      adBudgetCents: fees.adBudgetCents,
      totalCents: fees.totalCents,
      paymentMethodMasked: 'Test Card •••• 4242',
      status: 'Paid',
    };

    this.contributions.unshift(contribution);
    this.receipts.unshift(receipt);

    // Update campaign raised and backer count
    campaign.raisedCents += fees.amountCents;
    campaign.backerCount += 1;
    campaign.updatedAt = new Date().toISOString();

    // Check if goal reached
    if (campaign.raisedCents >= campaign.fundingGoalCents && campaign.status === 'available_for_funding') {
      campaign.status = 'goal_reached';
    }

    // Add activity for user if authenticated
    if (options.userId) {
      this.activities.unshift({
        id: `act-${Date.now()}`,
        userId: options.userId,
        type: 'contribution_success',
        campaignId,
        title: `Your $${amountUsd} contribution was confirmed`,
        body: `Receipt #${receiptNumber} issued for "${campaign.title}". Your contribution funds targeted reach!`,
        createdAt: new Date().toISOString(),
      });
    }

    return { contribution, receipt };
  }

  getReceipt(receiptIdOrContributionId: string): Receipt | undefined {
    return this.receipts.find(
      (r) => r.id === receiptIdOrContributionId || r.contributionId === receiptIdOrContributionId
    );
  }

  getReceipts(): Receipt[] {
    if (this.receipts.length === 0) {
      // Provide sample demo receipts
      return [
        {
          id: 'rcp-demo-1',
          contributionId: 'cnt-demo-1',
          number: 'RCP-48201',
          issuedAt: '2026-10-15T14:30:00Z',
          campaignTitle: 'Protect Clean Drinking Water for 50,000 Families',
          amountCents: 5000,
          platformFeeCents: 500,
          processingFeeCents: 175,
          adBudgetCents: 4325,
          totalCents: 5000,
          paymentMethodMasked: 'Test Card •••• 4242',
          status: 'Paid',
        },
        {
          id: 'rcp-demo-2',
          contributionId: 'cnt-demo-2',
          number: 'RCP-39120',
          issuedAt: '2026-10-10T10:15:00Z',
          campaignTitle: 'Expand High-Speed Broadband to Rural Community Classrooms',
          amountCents: 2500,
          platformFeeCents: 250,
          processingFeeCents: 103,
          adBudgetCents: 2147,
          totalCents: 2500,
          paymentMethodMasked: 'Apple Pay',
          status: 'Paid',
        },
      ];
    }
    return this.receipts;
  }

  // --- Activities ---
  getActivities(userId: string): ActivityItem[] {
    return this.activities.filter((a) => a.userId === userId);
  }

  markActivityRead(id: string): void {
    const act = this.activities.find((a) => a.id === id);
    if (act) {
      act.readAt = new Date().toISOString();
    }
  }

  markAllActivitiesRead(userId: string): void {
    const now = new Date().toISOString();
    this.activities
      .filter((a) => a.userId === userId)
      .forEach((a) => {
        a.readAt = now;
      });
  }

  // --- Reports ---
  getReport(campaignId: string): DistributionReport | undefined {
    return this.reports.find((r) => r.campaignId === campaignId);
  }

  // --- Dev Status Transition ---
  updateCampaignStatus(campaignId: string, status: CampaignStatus): Campaign {
    const campaign = this.campaigns.find((c) => c.id === campaignId);
    if (!campaign) {
      throw new Error('Campaign not found');
    }
    campaign.status = status;
    campaign.updatedAt = new Date().toISOString();
    return campaign;
  }
}

export const mockStore = new MockStore();
