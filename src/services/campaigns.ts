import { Campaign, CampaignFilters, CampaignStatus } from '@/types';
import { mockStore } from './mock/mockStore';
import { CONSTANTS } from '@/config/constants';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getCampaigns(filters?: CampaignFilters): Promise<Campaign[]> {
  await delay(CONSTANTS.MOCK_DELAY_MS);
  return mockStore.getCampaigns(filters);
}

export async function getCampaignById(id: string): Promise<Campaign> {
  await delay(CONSTANTS.MOCK_DELAY_MS);
  const campaign = mockStore.getCampaignById(id);
  if (!campaign) {
    throw new Error(`Campaign with id "${id}" not found.`);
  }
  return campaign;
}

export async function submitCampaignFeedback(
  id: string,
  answers: { visualsContinue: 'no' | 'somewhat' | 'yes'; changedMind: 'no' | 'somewhat' | 'yes' }
): Promise<{ success: boolean }> {
  await delay(CONSTANTS.MOCK_DELAY_MS);
  // Feedback recorded in mock store
  return { success: true };
}

export async function updateCampaignStatus(
  id: string,
  status: CampaignStatus
): Promise<Campaign> {
  await delay(CONSTANTS.MOCK_DELAY_MS);
  return mockStore.updateCampaignStatus(id, status);
}
