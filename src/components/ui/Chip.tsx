import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, typography, spacing, radius } from '@/theme/tokens';

interface ChipProps {
  label: string;
  selected?: boolean;
  icon?: keyof typeof Feather.glyphMap;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  count?: number;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  selected = false,
  icon,
  onPress,
  style,
  textStyle,
  count,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        selected ? styles.chipSelected : styles.chipUnselected,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={`${label}${count !== undefined ? `, ${count}` : ''}`}
    >
      {icon && (
        <Feather
          name={icon}
          size={14}
          color={selected ? colors.surface : colors.inkMuted}
          style={styles.icon}
        />
      )}
      <Text
        style={[
          styles.text,
          selected ? styles.textSelected : styles.textUnselected,
          textStyle,
        ]}
      >
        {label}
      </Text>
      {count !== undefined && (
        <Text
          style={[
            styles.count,
            selected ? styles.countSelected : styles.countUnselected,
          ]}
        >
          {count}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    marginRight: spacing.sm,
    marginBottom: spacing.xs,
    minHeight: 36,
  },
  chipUnselected: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  text: {
    ...typography.captionMedium,
  },
  textUnselected: {
    color: colors.ink,
  },
  textSelected: {
    color: colors.surface,
    fontWeight: '600',
  },
  icon: {
    marginRight: 6,
  },
  count: {
    ...typography.caption,
    fontSize: 11,
    marginLeft: 6,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: radius.pill,
  },
  countUnselected: {
    backgroundColor: colors.surfaceSubtle,
    color: colors.inkMuted,
  },
  countSelected: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: colors.surface,
  },
});
