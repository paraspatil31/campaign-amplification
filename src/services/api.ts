import * as campaignsService from './campaigns';
import * as draftsService from './drafts';
import * as contributionsService from './contributions';
import * as activityService from './activity';

export const isMockMode = process.env.EXPO_PUBLIC_DATA_MODE !== 'remote';

export const api = {
  isMockMode,
  campaigns: campaignsService,
  drafts: draftsService,
  contributions: contributionsService,
  activity: activityService,
};

export default api;
