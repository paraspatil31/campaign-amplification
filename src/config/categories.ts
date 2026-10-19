import { Category } from '@/types';

export interface CategoryInfo {
  id: Category;
  label: string;
  icon: string;
  description: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'Environment',
    label: 'Environment',
    icon: 'feather',
    description: 'Climate solutions, biodiversity, renewable energy, and conservation.',
  },
  {
    id: 'Health',
    label: 'Health',
    icon: 'heart',
    description: 'Public health awareness, medical research, and disease prevention.',
  },
  {
    id: 'Science',
    label: 'Science',
    icon: 'compass',
    description: 'Scientific discovery, technological literacy, and academic research.',
  },
  {
    id: 'Education',
    label: 'Education',
    icon: 'book-open',
    description: 'Equitable learning access, literacy initiatives, and youth development.',
  },
  {
    id: 'Public Policy',
    label: 'Public Policy',
    icon: 'file-text',
    description: 'Civic participation, infrastructure reform, and governmental transparency.',
  },
  {
    id: 'Economic Policy',
    label: 'Economic Policy',
    icon: 'trending-up',
    description: 'Fair wages, small business empowerment, and economic justice.',
  },
  {
    id: 'Community',
    label: 'Community',
    icon: 'users',
    description: 'Grassroots neighborhoods, mutual aid networks, and local resilience.',
  },
  {
    id: 'Arts & Culture',
    label: 'Arts & Culture',
    icon: 'smile',
    description: 'Cultural preservation, independent arts, and community storytelling.',
  },
  {
    id: 'Business',
    label: 'Business',
    icon: 'briefcase',
    description: 'Ethical enterprise, supply chain accountability, and cooperative models.',
  },
  {
    id: 'Other',
    label: 'Other',
    icon: 'grid',
    description: 'Emerging topics, open web initiatives, and interdisciplinary ideas.',
  },
];
