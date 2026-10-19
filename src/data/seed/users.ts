import { User } from '../../types';

export const SEED_USERS: User[] = [
  {
    id: 'usr-001',
    email: 'sarah.chen@watershedalliance.org',
    name: 'Sarah Chen',
    role: 'user',
    createdAt: '2026-01-10T09:00:00Z',
  },
  {
    id: 'usr-002',
    email: 'dr.marcus.vance@neuroresearch.org',
    name: 'Dr. Marcus Vance',
    role: 'user',
    createdAt: '2026-01-15T10:30:00Z',
  },
  {
    id: 'usr-reviewer',
    email: 'reviewer@amplification.platform',
    name: 'Platform Review Desk',
    role: 'reviewer',
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'usr-demo-me',
    email: 'demo.user@amplification.platform',
    name: 'Alex Rivera',
    role: 'user',
    createdAt: '2026-02-01T12:00:00Z',
  },
];
