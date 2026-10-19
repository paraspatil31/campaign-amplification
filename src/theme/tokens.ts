export const colors = {
  primary: '#1F4FD8',
  primaryDark: '#163A9E',
  primaryLight: '#EBF1FF',
  accent: '#14B88A',
  accentLight: '#E8F8F3',
  ink: '#12171F',
  inkMuted: '#5B6575',
  inkSubtle: '#8C95A6',
  surface: '#FFFFFF',
  surfaceSubtle: '#F0F2F6',
  background: '#F6F7F9',
  border: '#E3E6EB',
  borderDark: '#CBD2DC',
  warning: '#E0A100',
  warningLight: '#FEF8E7',
  danger: '#D64545',
  dangerLight: '#FDECEC',
  info: '#2E7DD7',
  infoLight: '#EAF3FC',
  purple: '#7E3AF2',
  purpleLight: '#F3EBFD',
  teal: '#0E9F6E',
  tealLight: '#E6F7F2',
};

export const typography = {
  display: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700' as const,
  },
  h1: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700' as const,
  },
  h2: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '600' as const,
  },
  h3: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600' as const,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400' as const,
  },
  bodyMedium: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500' as const,
  },
  bodySemibold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600' as const,
  },
  storyBody: {
    fontSize: 17,
    lineHeight: 27,
    fontWeight: '400' as const,
  },
  caption: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400' as const,
  },
  captionMedium: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500' as const,
  },
  button: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '600' as const,
  },
  smallButton: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '600' as const,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
};

export const radius = {
  input: 8,
  card: 16,
  sheet: 24,
  pill: 999,
};

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sheet: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  floating: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
};

export const statusColors: Record<
  string,
  { background: string; text: string; icon: string; border?: string }
> = {
  draft: {
    background: '#F0F2F6',
    text: '#5B6575',
    icon: 'edit-3',
  },
  submitted: {
    background: '#FEF8E7',
    text: '#A66B00',
    icon: 'clock',
  },
  changes_requested: {
    background: '#FFF4E6',
    text: '#D97706',
    icon: 'alert-circle',
  },
  approved: {
    background: '#EAF3FC',
    text: '#1F4FD8',
    icon: 'check-circle',
  },
  available_for_funding: {
    background: '#EAF3FC',
    text: '#1F4FD8',
    icon: 'zap',
  },
  goal_reached: {
    background: '#E8F8F3',
    text: '#0E9F6E',
    icon: 'check',
  },
  funding_ended: {
    background: '#F0F2F6',
    text: '#5B6575',
    icon: 'calendar',
  },
  distribution_preparation: {
    background: '#F3EBFD',
    text: '#7E3AF2',
    icon: 'tool',
  },
  promoting: {
    background: '#F3EBFD',
    text: '#7E3AF2',
    icon: 'radio',
  },
  completed: {
    background: '#E8F8F3',
    text: '#0E9F6E',
    icon: 'award',
  },
  rejected: {
    background: '#FDECEC',
    text: '#D64545',
    icon: 'x-circle',
  },
  cancelled: {
    background: '#F0F2F6',
    text: '#5B6575',
    icon: 'slash',
  },
  refund_pending: {
    background: '#FEF8E7',
    text: '#A66B00',
    icon: 'refresh-cw',
  },
  failed: {
    background: '#FDECEC',
    text: '#D64545',
    icon: 'alert-triangle',
  },
};
