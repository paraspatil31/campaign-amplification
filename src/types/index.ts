export type CampaignStatus =
  | 'draft'
  | 'submitted'
  | 'changes_requested'
  | 'approved'
  | 'available_for_funding'
  | 'goal_reached'
  | 'funding_ended'
  | 'distribution_preparation'
  | 'promoting'
  | 'completed'
  | 'rejected'
  | 'cancelled'
  | 'refund_pending'
  | 'failed';

export type Category =
  | 'Environment'
  | 'Health'
  | 'Science'
  | 'Education'
  | 'Public Policy'
  | 'Economic Policy'
  | 'Community'
  | 'Arts & Culture'
  | 'Business'
  | 'Other';

export type CreatorType =
  | 'Individual'
  | 'Non-Profit / NGO'
  | 'Community Group'
  | 'Independent Journalist'
  | 'Researcher'
  | 'Coalition';

export interface Source {
  id: string;
  title: string;
  url: string;
  position: number;
}

export type StoryBlockType =
  | 'heading'
  | 'paragraph'
  | 'statistic'
  | 'quote'
  | 'image'
  | 'source_list'
  | 'action_call';

export interface StoryBlock {
  id: string;
  type: StoryBlockType;
  content: string;
  statValue?: string;
  statLabel?: string;
  quoteAuthor?: string;
  caption?: string;
  credit?: string;
  imageUrl?: string;
}

export interface AdVisual {
  id: string;
  uri: string;
  type: 'image' | 'video';
  caption?: string;
  aspectRatio?: '16:9' | '1:1' | '9:16';
}

export interface AudienceTarget {
  locations: string[];
  interests: string[];
  channels: string[];
  channelAllocations: Record<string, number>; // Must sum to 100%
  durationDays: number;
}

export interface Campaign {
  id: string;
  creatorId: string;
  status: CampaignStatus;
  title: string; // Max 60 chars
  category: Category;
  creatorName: string;
  creatorType: CreatorType;
  summary: string; // Max 280 chars
  coverUrl: string;
  storyBlocks: StoryBlock[];
  sources: Source[];
  adHeadline: string;
  adDescription: string;
  ctaText: string;
  adAssets: AdVisual[];
  target: AudienceTarget;
  durationDays: number;
  fundingGoalCents: number;
  goalSetBy: 'creator';
  estReachLow: number;
  estReachHigh: number;
  raisedCents: number;
  backerCount: number;
  publishedAt?: string;
  fundingEndsAt?: string;
  createdAt: string;
  updatedAt: string;
  moderationFeedback?: string;
  isDemoData: boolean;
}

export interface CampaignFilters {
  query?: string;
  category?: Category;
  status?: CampaignStatus | 'active' | 'all';
  sortBy?: 'trending' | 'newest' | 'most_funded' | 'ending_soon' | 'closest_to_goal';
  minFundedPercent?: number;
  page?: number;
  pageSize?: number;
}

export interface Draft {
  id: string;
  userId: string;
  campaignId?: string;
  step: number;
  data: Partial<Campaign>;
  lastSavedAt: string;
}

export interface Contribution {
  id: string;
  campaignId: string;
  campaignTitle: string;
  userId?: string;
  guestEmail?: string;
  amountCents: number;
  platformFeeCents: number;
  processingFeeCents: number;
  totalCents: number;
  status: 'pending' | 'succeeded' | 'failed' | 'rejected' | 'cancelled' | 'refund_pending' | 'refunded';
  publicNameOptIn: boolean;
  backerName?: string;
  providerRef: string;
  createdAt: string;
}

export interface Receipt {
  id: string;
  contributionId: string;
  number: string;
  issuedAt: string;
  campaignTitle: string;
  amountCents: number;
  platformFeeCents: number;
  processingFeeCents: number;
  adBudgetCents: number;
  totalCents: number;
  paymentMethodMasked: string;
  status: string;
}

export interface ActivityItem {
  id: string;
  userId: string;
  type:
    | 'submission_received'
    | 'status_change'
    | 'milestone'
    | 'contribution_success'
    | 'promotion_progress'
    | 'report_available'
    | 'security';
  campaignId?: string;
  title: string;
  body: string;
  readAt?: string;
  createdAt: string;
}

export interface DistributionReport {
  id: string;
  campaignId: string;
  campaignTitle: string;
  fundsRaisedCents: number;
  adBudgetCents: number;
  adSpendCents: number;
  impressions: number;
  clicks: number;
  ctr: number;
  estReachLow: number;
  estReachHigh: number;
  measuredReach: number;
  generatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'reviewer' | 'admin';
  createdAt: string;
}
