import { Campaign, CampaignStatus } from '../types';

export interface TransitionRule {
  from: CampaignStatus;
  to: CampaignStatus[];
  allowedRoles: ('creator' | 'reviewer' | 'system')[];
  description: string;
}

export const LIFECYCLE_TRANSITIONS: TransitionRule[] = [
  {
    from: 'draft',
    to: ['submitted', 'cancelled'],
    allowedRoles: ['creator'],
    description: 'Creator completes all required steps and submits for platform review.',
  },
  {
    from: 'submitted',
    to: ['approved', 'changes_requested', 'rejected', 'cancelled'],
    allowedRoles: ['reviewer'],
    description: 'Platform reviews compliance, truthfulness, and ad suitability.',
  },
  {
    from: 'changes_requested',
    to: ['submitted', 'cancelled'],
    allowedRoles: ['creator'],
    description: 'Creator modifies campaign according to reviewer feedback and resubmits.',
  },
  {
    from: 'approved',
    to: ['available_for_funding', 'cancelled'],
    allowedRoles: ['system', 'reviewer'],
    description: 'Approval verified, publishing to public audience.',
  },
  {
    from: 'available_for_funding',
    to: ['goal_reached', 'funding_ended', 'cancelled'],
    allowedRoles: ['system'],
    description: 'Community backers contribute toward ad distribution costs.',
  },
  {
    from: 'goal_reached',
    to: ['distribution_preparation'],
    allowedRoles: ['system'],
    description: 'Funding target reached; initiating ad creative setup.',
  },
  {
    from: 'funding_ended',
    to: ['distribution_preparation', 'refund_pending'],
    allowedRoles: ['system'],
    description: 'Funding period expired. Proceeds to prep or refund if minimum unmet.',
  },
  {
    from: 'distribution_preparation',
    to: ['promoting', 'cancelled'],
    allowedRoles: ['system', 'reviewer'],
    description: 'Ad networks booked, creative locked, distribution begins.',
  },
  {
    from: 'promoting',
    to: ['completed'],
    allowedRoles: ['system'],
    description: 'Campaign ads actively serving across target audience channels.',
  },
  {
    from: 'refund_pending',
    to: ['failed', 'cancelled'],
    allowedRoles: ['system'],
    description: 'Automated refunds returned to backer accounts.',
  },
];

/**
 * Validates whether a campaign can transition from current status to a target status.
 */
export function canTransition(
  fromStatus: CampaignStatus,
  toStatus: CampaignStatus,
  role: 'creator' | 'reviewer' | 'system'
): { allowed: boolean; reason?: string } {
  const rule = LIFECYCLE_TRANSITIONS.find((t) => t.from === fromStatus);
  if (!rule) {
    return { allowed: false, reason: `Status '${fromStatus}' is a terminal state.` };
  }

  if (!rule.to.includes(toStatus)) {
    return {
      allowed: false,
      reason: `Cannot transition from '${fromStatus}' to '${toStatus}'.`,
    };
  }

  if (!rule.allowedRoles.includes(role)) {
    return {
      allowed: false,
      reason: `Role '${role}' is not authorized to transition '${fromStatus}' to '${toStatus}'.`,
    };
  }

  return { allowed: true };
}

/**
 * Validates a campaign prior to submission.
 */
export function validateForSubmission(campaign: Partial<Campaign>): {
  valid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!campaign.title || campaign.title.trim().length === 0) {
    errors.title = 'Title is required';
  } else if (campaign.title.length > 60) {
    errors.title = 'Title must be 60 characters or less';
  }

  if (!campaign.category) {
    errors.category = 'Category is required';
  }

  if (!campaign.creatorName || campaign.creatorName.trim().length === 0) {
    errors.creatorName = 'Creator or organization name is required';
  }

  if (!campaign.summary || campaign.summary.trim().length === 0) {
    errors.summary = 'Summary is required';
  }

  if (!campaign.storyBlocks || campaign.storyBlocks.length === 0) {
    errors.storyBlocks = 'Story must contain at least one section';
  }

  if (!campaign.fundingGoalCents || campaign.fundingGoalCents <= 0) {
    errors.fundingGoalCents = 'Creator must set a positive funding goal';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function getStatusLabel(status: CampaignStatus): string {
  switch (status) {
    case 'draft':
      return 'Draft';
    case 'submitted':
      return 'Under Review';
    case 'changes_requested':
      return 'Changes Requested';
    case 'approved':
      return 'Approved';
    case 'available_for_funding':
      return 'Available for Funding';
    case 'goal_reached':
      return 'Goal Reached';
    case 'funding_ended':
      return 'Funding Ended';
    case 'distribution_preparation':
      return 'Preparing Distribution';
    case 'promoting':
      return 'Actively Promoting';
    case 'completed':
      return 'Completed';
    case 'rejected':
      return 'Rejected';
    case 'cancelled':
      return 'Cancelled';
    case 'refund_pending':
      return 'Refund Pending';
    case 'failed':
      return 'Failed';
    default:
      return status;
  }
}
