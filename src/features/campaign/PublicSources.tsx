import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, typography, spacing, radius } from '@/theme/tokens';
import { Source } from '@/types';
import { useToast } from '@/components/feedback/Toast';

interface PublicSourcesProps {
  sources: Source[];
}

export function PublicSources({ sources }: PublicSourcesProps) {
  const { showToast } = useToast();

  if (!sources || sources.length === 0) {
    return null;
  }

  const handleOpenUrl = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        showToast(`Cannot open link: ${url}`, 'error');
      }
    } catch {
      showToast('Unable to open link in browser', 'error');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Feather name="bookmark" size={18} color={colors.primary} style={{ marginRight: 8 }} />
        <Text style={styles.sectionTitle}>Public Sources & Evidence</Text>
      </View>
      <Text style={styles.helperText}>
        The creator provided the following public references to support the claims made in this campaign:
      </Text>

      <View style={styles.sourcesList}>
        {sources.map((source, index) => (
          <TouchableOpacity
            key={source.id || index}
            style={styles.sourceItem}
            onPress={() => handleOpenUrl(source.url)}
            accessibilityRole="link"
            accessibilityLabel={`Open source ${index + 1}: ${source.title}`}
          >
            <View style={styles.sourceNumberBadge}>
              <Text style={styles.sourceNumberText}>{index + 1}</Text>
            </View>
            <View style={styles.sourceContent}>
              <Text style={styles.sourceTitle} numberOfLines={2}>
                {source.title}
              </Text>
              <Text style={styles.sourceUrl} numberOfLines={1}>
                {source.url}
              </Text>
            </View>
            <Feather name="external-link" size={16} color={colors.primary} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.ink,
  },
  helperText: {
    ...typography.caption,
    color: colors.inkMuted,
    lineHeight: 18,
    marginBottom: spacing.md,
  },
  sourcesList: {
    gap: spacing.sm,
  },
  sourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.sm,
    borderRadius: radius.input,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sourceNumberBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  sourceNumberText: {
    ...typography.captionMedium,
    fontWeight: '700',
    color: colors.primary,
    fontSize: 12,
  },
  sourceContent: {
    flex: 1,
    marginRight: spacing.sm,
  },
  sourceTitle: {
    ...typography.bodyMedium,
    fontSize: 14,
    color: colors.ink,
    lineHeight: 18,
  },
  sourceUrl: {
    ...typography.caption,
    color: colors.inkSubtle,
    fontSize: 12,
    marginTop: 2,
  },
});
