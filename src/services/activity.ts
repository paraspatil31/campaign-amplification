import { ActivityItem } from '@/types';
import { mockStore } from './mock/mockStore';
import { CONSTANTS } from '@/config/constants';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getActivities(userId = 'usr-demo-me'): Promise<ActivityItem[]> {
  await delay(CONSTANTS.MOCK_DELAY_MS);
  return mockStore.getActivities(userId);
}

export async function markActivityRead(id: string): Promise<void> {
  await delay(CONSTANTS.MOCK_DELAY_MS);
  mockStore.markActivityRead(id);
}

export async function markAllActivitiesRead(userId = 'usr-demo-me'): Promise<void> {
  await delay(CONSTANTS.MOCK_DELAY_MS);
  mockStore.markAllActivitiesRead(userId);
}
