import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, typography, spacing, radius } from '@/theme/tokens';
import { StoryBlock } from '@/types';

interface StoryRendererProps {
  blocks: StoryBlock[];
}

export function StoryRenderer({ blocks }: StoryRendererProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {blocks.map((block) => {
        switch (block.type) {
          case 'heading':
            return (
              <Text key={block.id} style={styles.heading}>
                {block.content}
              </Text>
            );

          case 'paragraph':
            return (
              <Text key={block.id} style={styles.paragraph}>
                {block.content}
              </Text>
            );

          case 'statistic':
            return (
              <View key={block.id} style={styles.statCard}>
                <Text style={styles.statValue}>{block.statValue || block.content}</Text>
                {block.statLabel && (
                  <Text style={styles.statLabel}>{block.statLabel}</Text>
                )}
              </View>
            );

          case 'quote':
            return (
              <View key={block.id} style={styles.quoteCard}>
                <View style={styles.quoteBar} />
                <View style={styles.quoteContent}>
                  <Text style={styles.quoteText}>“{block.content}”</Text>
                  {block.quoteAuthor && (
                    <Text style={styles.quoteAuthor}>— {block.quoteAuthor}</Text>
                  )}
                </View>
              </View>
            );

          case 'image':
            return (
              <View key={block.id} style={styles.imageBlock}>
                {block.imageUrl ? (
                  <Image
                    source={{ uri: block.imageUrl }}
                    style={styles.inlineImage}
                    resizeMode="cover"
                  />
                ) : null}
                {(block.caption || block.credit) && (
                  <View style={styles.captionContainer}>
                    {block.caption && (
                      <Text style={styles.captionText}>{block.caption}</Text>
                    )}
                    {block.credit && (
                      <Text style={styles.creditText}>Photo: {block.credit}</Text>
                    )}
                  </View>
                )}
              </View>
            );

          case 'action_call':
            return (
              <View key={block.id} style={styles.actionCall}>
                <Feather name="check-circle" size={18} color={colors.primary} style={{ marginRight: 8, marginTop: 2 }} />
                <Text style={styles.actionCallText}>{block.content}</Text>
              </View>
            );

          default:
            return (
              <Text key={block.id} style={styles.paragraph}>
                {block.content}
              </Text>
            );
        }
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.md,
  },
  heading: {
    ...typography.h2,
    color: colors.ink,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    lineHeight: 26,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 26,
    color: colors.ink,
    marginBottom: spacing.md,
    fontWeight: '400',
  },
  statCard: {
    backgroundColor: colors.primaryLight,
    borderRadius: radius.card,
    padding: spacing.lg,
    alignItems: 'center',
    marginVertical: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(31, 79, 216, 0.15)',
  },
  statValue: {
    ...typography.display,
    color: colors.primary,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.bodyMedium,
    color: colors.ink,
    textAlign: 'center',
  },
  quoteCard: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radius.card,
    padding: spacing.md,
    marginVertical: spacing.md,
  },
  quoteBar: {
    width: 4,
    backgroundColor: colors.primary,
    borderRadius: 2,
    marginRight: spacing.md,
  },
  quoteContent: {
    flex: 1,
  },
  quoteText: {
    ...typography.body,
    fontStyle: 'italic',
    color: colors.ink,
    lineHeight: 24,
    marginBottom: spacing.xs,
  },
  quoteAuthor: {
    ...typography.captionMedium,
    fontWeight: '600',
    color: colors.inkMuted,
  },
  imageBlock: {
    marginVertical: spacing.md,
    borderRadius: radius.card,
    overflow: 'hidden',
    backgroundColor: colors.surfaceSubtle,
  },
  inlineImage: {
    width: '100%',
    height: 220,
  },
  captionContainer: {
    padding: spacing.sm,
    backgroundColor: colors.surface,
  },
  captionText: {
    ...typography.caption,
    color: colors.ink,
    marginBottom: 2,
  },
  creditText: {
    ...typography.caption,
    color: colors.inkSubtle,
    fontSize: 11,
  },
  actionCall: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.accentLight,
    padding: spacing.md,
    borderRadius: radius.card,
    marginVertical: spacing.sm,
  },
  actionCallText: {
    ...typography.bodyMedium,
    color: colors.ink,
    flex: 1,
  },
});
