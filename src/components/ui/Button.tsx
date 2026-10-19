import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, typography, spacing, radius } from '@/theme/tokens';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: keyof typeof Feather.glyphMap;
  iconRight?: boolean;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  iconRight = false,
  loading = false,
  disabled = false,
  style,
  textStyle,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const isInteractive = !loading && !disabled;

  const getContainerStyle = (): ViewStyle[] => {
    const list: ViewStyle[] = [styles.base, styles[size]];

    switch (variant) {
      case 'secondary':
        list.push(styles.secondary);
        break;
      case 'ghost':
        list.push(styles.ghost);
        break;
      case 'destructive':
        list.push(styles.destructive);
        break;
      case 'primary':
      default:
        list.push(styles.primary);
        break;
    }

    if (disabled) {
      list.push(styles.disabled);
    }

    if (style) {
      list.push(style);
    }

    return list;
  };

  const getTextColor = (): string => {
    if (disabled) return colors.inkSubtle;
    switch (variant) {
      case 'secondary':
        return colors.primary;
      case 'ghost':
        return colors.ink;
      case 'destructive':
        return colors.surface;
      case 'primary':
      default:
        return colors.surface;
    }
  };

  const textColor = getTextColor();

  return (
    <TouchableOpacity
      style={getContainerStyle()}
      onPress={onPress}
      disabled={!isInteractive}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled, busy: loading }}
    >
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <>
          {icon && !iconRight && (
            <Feather
              name={icon}
              size={size === 'sm' ? 16 : 18}
              color={textColor}
              style={styles.iconLeft}
            />
          )}
          <Text style={[styles.text, styles[`text_${size}`], { color: textColor }, textStyle]}>
            {title}
          </Text>
          {icon && iconRight && (
            <Feather
              name={icon}
              size={size === 'sm' ? 16 : 18}
              color={textColor}
              style={styles.iconRight}
            />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.input,
    minHeight: 44, // Minimum touch target 44pt per AGENT.md §4
  },
  sm: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    minHeight: 44,
  },
  md: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minHeight: 48,
  },
  lg: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    minHeight: 54,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  destructive: {
    backgroundColor: colors.danger,
  },
  disabled: {
    backgroundColor: colors.surfaceSubtle,
    borderColor: colors.border,
  },
  text: {
    ...typography.button,
  },
  text_sm: {
    fontSize: 14,
  },
  text_md: {
    fontSize: 16,
  },
  text_lg: {
    fontSize: 18,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});
