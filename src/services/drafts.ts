import { Draft, Campaign } from '@/types';
import { mockStore } from './mock/mockStore';
import { CONSTANTS } from '@/config/constants';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getDrafts(userId: string): Promise<Draft[]> {
  await delay(CONSTANTS.MOCK_DELAY_MS);
  return mockStore.getDrafts(userId);
}

export async function getDraftById(id: string): Promise<Draft> {
  await delay(CONSTANTS.MOCK_DELAY_MS);
  const draft = mockStore.getDraftById(id);
  if (!draft) {
    throw new Error(`Draft with id "${id}" not found.`);
  }
  return draft;
}

export async function saveDraft(draft: Draft): Promise<Draft> {
  await delay(CONSTANTS.MOCK_DELAY_MS);
  return mockStore.saveDraft(draft);
}

export async function deleteDraft(id: string): Promise<boolean> {
  await delay(CONSTANTS.MOCK_DELAY_MS);
  return mockStore.deleteDraft(id);
}

export async function submitDraft(draftId: string): Promise<Campaign> {
  await delay(CONSTANTS.MOCK_DELAY_MS);
  return mockStore.submitDraft(draftId);
}
