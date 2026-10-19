import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { CampaignStatus } from '@/types';
import { colors, typography, spacing, radius, statusColors } from '@/theme/tokens';
import { getStatusLabel } from '@/lib/lifecycle';

interface BadgeProps {
  label: string;
  color?: string;
  backgroundColor?: string;
  icon?: keyof typeof Feather.glyphMap;
  size?: 'sm' | 'md';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  color = colors.ink,
  backgroundColor = colors.surfaceSubtle,
  icon,
  size = 'md',
  style,
  textStyle,
}) => {
  return (
    <View
      style={[
        styles.badge,
        size === 'sm' ? styles.badge_sm : styles.badge_md,
        { backgroundColor },
        style,
      ]}
      accessible
      accessibilityRole="text"
    >
      {icon && (
        <Feather
          name={icon}
          size={size === 'sm' ? 12 : 14}
          color={color}
          style={styles.icon}
        />
      )}
      <Text
        style={[
          styles.text,
          size === 'sm' ? styles.text_sm : styles.text_md,
          { color },
          textStyle,
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

interface StatusChipProps {
  status: CampaignStatus;
  size?: 'sm' | 'md';
  style?: ViewStyle;
}

export const StatusChip: React.FC<StatusChipProps> = ({
  status,
  size = 'md',
  style,
}) => {
  const meta = statusColors[status] || statusColors.draft;
  const label = getStatusLabel(status);

  return (
    <Badge
      label={label}
      color={meta.text}
      backgroundColor={meta.background}
      icon={meta.icon as keyof typeof Feather.glyphMap}
      size={size}
      style={style}
    />
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
  },
  badge_sm: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  badge_md: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  text: {
    ...typography.captionMedium,
    fontWeight: '600',
  },
  text_sm: {
    fontSize: 11,
    lineHeight: 14,
  },
  text_md: {
    fontSize: 12,
    lineHeight: 16,
  },
  icon: {
    marginRight: 4,
  },
});
