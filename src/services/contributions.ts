import { Contribution, Receipt } from '@/types';
import { mockStore } from './mock/mockStore';
import { CONSTANTS } from '@/config/constants';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function createContribution(
  campaignId: string,
  amountUsd: number,
  options: {
    userId?: string;
    guestEmail?: string;
    publicNameOptIn?: boolean;
    backerName?: string;
  }
): Promise<{ contribution: Contribution; receipt: Receipt }> {
  await delay(CONSTANTS.MOCK_DELAY_MS);
  return mockStore.createContribution(campaignId, amountUsd, options);
}

export async function getReceipt(receiptId: string): Promise<Receipt> {
  await delay(CONSTANTS.MOCK_DELAY_MS);
  const receipt = mockStore.getReceipt(receiptId);
  if (!receipt) {
    throw new Error(`Receipt "${receiptId}" not found.`);
  }
  return receipt;
}
