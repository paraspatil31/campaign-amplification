import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, typography, spacing, radius } from '@/theme/tokens';
import { Campaign, StoryBlock, Source, StoryBlockType } from '@/types';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { StoryRenderer } from '@/features/campaign/StoryRenderer';
import { PublicSources } from '@/features/campaign/PublicSources';

interface Step2StoryProps {
  data: Partial<Campaign>;
  onChange: (fields: Partial<Campaign>) => void;
  errors?: Record<string, string>;
}

export function Step2Story({ data, onChange, errors = {} }: Step2StoryProps) {
  const [isPreview, setIsPreview] = useState(false);

  const blocks: StoryBlock[] = data.storyBlocks || [];
  const sources: Source[] = data.sources || [];

  const handleAddBlock = (type: StoryBlockType) => {
    const newBlock: StoryBlock = {
      id: `block-${Date.now()}`,
      type,
      content:
        type === 'heading'
          ? 'Why Public Action Is Needed Now'
          : type === 'statistic'
          ? 'Freshwater testing revealed contaminants exceeding safety thresholds by 340%.'
          : type === 'quote'
          ? 'Independent monitoring provides the transparency communities deserve.'
          : 'Detailed evidence and community perspectives outlining the urgency of this message.',
      statValue: type === 'statistic' ? '340%' : undefined,
      statLabel: type === 'statistic' ? 'Above Safety Threshold' : undefined,
      quoteAuthor: type === 'quote' ? 'Lead Environmental Investigator' : undefined,
      caption: type === 'image' ? 'Sampling sites across the county basin.' : undefined,
      credit: type === 'image' ? 'Riverkeeper Archive' : undefined,
      imageUrl:
        type === 'image'
          ? 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'
          : undefined,
    };
    onChange({ storyBlocks: [...blocks, newBlock] });
  };

  const handleUpdateBlock = (id: string, updates: Partial<StoryBlock>) => {
    onChange({
      storyBlocks: blocks.map((b) => (b.id === id ? { ...b, ...updates } : b)),
    });
  };

  const handleDeleteBlock = (id: string) => {
    onChange({ storyBlocks: blocks.filter((b) => b.id !== id) });
  };

  const handleMoveBlock = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= blocks.length) return;
    const reordered = [...blocks];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIdx, 0, moved);
    onChange({ storyBlocks: reordered });
  };

  // Sources management
  const handleAddSource = () => {
    const newSource: Source = {
      id: `src-${Date.now()}`,
      title: 'State Environmental Protection Agency Water Quality Audit (2025)',
      url: 'https://example.gov/water-audit-2025',
      position: sources.length + 1,
    };
    onChange({ sources: [...sources, newSource] });
  };

  const handleUpdateSource = (id: string, updates: Partial<Source>) => {
    onChange({
      sources: sources.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    });
  };

  const handleDeleteSource = (id: string) => {
    onChange({ sources: sources.filter((s) => s.id !== id) });
  };

  return (
    <View style={styles.container}>
      {/* Mode Toggle (Edit / Live Preview) */}
      <View style={styles.previewToggleRow}>
        <Text style={styles.sectionHeading}>Story & Credible Sources</Text>
        <TouchableOpacity
          style={[styles.toggleBtn, isPreview && styles.toggleBtnActive]}
          onPress={() => setIsPreview((prev) => !prev)}
        >
          <Feather
            name={isPreview ? 'edit-3' : 'eye'}
            size={14}
            color={isPreview ? colors.surface : colors.primary}
            style={{ marginRight: 4 }}
          />
          <Text style={[styles.toggleBtnText, isPreview && styles.toggleBtnTextActive]}>
            {isPreview ? 'Back to Editor' : 'Live Preview'}
          </Text>
        </TouchableOpacity>
      </View>

      {isPreview ? (
        <View style={styles.previewContainer}>
          <StoryRenderer blocks={blocks} />
          <PublicSources sources={sources} />
        </View>
      ) : (
        <View>
          <Text style={styles.helperText}>
            Build your narrative with modular blocks. Highlighting clear statistics, quotes, and sources builds trust with backers.
          </Text>

          {/* Block Editor List */}
          {blocks.map((block, index) => (
            <View key={block.id} style={styles.blockCard}>
              <View style={styles.blockHeader}>
                <View style={styles.blockBadge}>
                  <Text style={styles.blockBadgeText}>{block.type.toUpperCase()}</Text>
                </View>
                <View style={styles.blockActions}>
                  <TouchableOpacity
                    onPress={() => handleMoveBlock(index, 'up')}
                    disabled={index === 0}
                    style={styles.actionIcon}
                  >
                    <Feather
                      name="arrow-up"
                      size={16}
                      color={index === 0 ? colors.borderDark : colors.inkMuted}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleMoveBlock(index, 'down')}
                    disabled={index === blocks.length - 1}
                    style={styles.actionIcon}
                  >
                    <Feather
                      name="arrow-down"
                      size={16}
                      color={index === blocks.length - 1 ? colors.borderDark : colors.inkMuted}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDeleteBlock(block.id)}
                    style={styles.actionIcon}
                  >
                    <Feather name="trash-2" size={16} color={colors.danger} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Block Inputs */}
              {block.type === 'heading' && (
                <Input
                  label="Heading Text"
                  value={block.content}
                  onChangeText={(text) => handleUpdateBlock(block.id, { content: text })}
                />
              )}

              {block.type === 'paragraph' && (
                <Input
                  label="Paragraph Content"
                  value={block.content}
                  onChangeText={(text) => handleUpdateBlock(block.id, { content: text })}
                  multiline
                />
              )}

              {block.type === 'statistic' && (
                <View>
                  <Input
                    label="Metric / Key Figure"
                    value={block.statValue || ''}
                    onChangeText={(text) => handleUpdateBlock(block.id, { statValue: text })}
                    placeholder="e.g. 74% or $2.4M"
                  />
                  <Input
                    label="Metric Label / Description"
                    value={block.statLabel || ''}
                    onChangeText={(text) => handleUpdateBlock(block.id, { statLabel: text })}
                    placeholder="e.g. Reduction in Watershed Runoff"
                  />
                </View>
              )}

              {block.type === 'quote' && (
                <View>
                  <Input
                    label="Quote Statement"
                    value={block.content}
                    onChangeText={(text) => handleUpdateBlock(block.id, { content: text })}
                    multiline
                  />
                  <Input
                    label="Quote Attribution / Author"
                    value={block.quoteAuthor || ''}
                    onChangeText={(text) => handleUpdateBlock(block.id, { quoteAuthor: text })}
                    placeholder="e.g. Dr. Ellen Zhao, Chief Hydrologist"
                  />
                </View>
              )}

              {block.type === 'image' && (
                <View>
                  <Input
                    label="Image URL"
                    value={block.imageUrl || ''}
                    onChangeText={(text) => handleUpdateBlock(block.id, { imageUrl: text })}
                  />
                  <Input
                    label="Caption"
                    value={block.caption || ''}
                    onChangeText={(text) => handleUpdateBlock(block.id, { caption: text })}
                  />
                  <Input
                    label="Credit / Source"
                    value={block.credit || ''}
                    onChangeText={(text) => handleUpdateBlock(block.id, { credit: text })}
                  />
                </View>
              )}
            </View>
          ))}

          {/* Add Block Toolbar */}
          <View style={styles.addToolbar}>
            <Text style={styles.toolbarTitle}>+ Add Story Block:</Text>
            <View style={styles.toolbarButtons}>
              <Button
                title="Heading"
                size="sm"
                variant="secondary"
                onPress={() => handleAddBlock('heading')}
                icon="type"
              />
              <Button
                title="Paragraph"
                size="sm"
                variant="secondary"
                onPress={() => handleAddBlock('paragraph')}
                icon="align-left"
              />
              <Button
                title="Statistic"
                size="sm"
                variant="secondary"
                onPress={() => handleAddBlock('statistic')}
                icon="bar-chart-2"
              />
              <Button
                title="Quote"
                size="sm"
                variant="secondary"
                onPress={() => handleAddBlock('quote')}
                icon="message-square"
              />
            </View>
          </View>

          {/* Public Sources Section (Mandatory) */}
          <View style={styles.sourcesSection}>
            <View style={styles.sourcesHeader}>
              <View>
                <Text style={styles.sourcesTitle}>Public Sources & Citations *</Text>
                <Text style={styles.sourcesSubtitle}>
                  At least 1 verifiable public source is required for platform approval.
                </Text>
              </View>
              <Button
                title="+ Add"
                size="sm"
                variant="primary"
                onPress={handleAddSource}
              />
            </View>

            {errors.sources && <Text style={styles.errorText}>{errors.sources}</Text>}

            {sources.map((source, idx) => (
              <View key={source.id} style={styles.sourceCard}>
                <View style={styles.sourceCardHeader}>
                  <Text style={styles.sourceIndex}>Source #{idx + 1}</Text>
                  <TouchableOpacity onPress={() => handleDeleteSource(source.id)}>
                    <Feather name="trash-2" size={16} color={colors.danger} />
                  </TouchableOpacity>
                </View>
                <Input
                  label="Document / Article Title"
                  value={source.title}
                  onChangeText={(text) => handleUpdateSource(source.id, { title: text })}
                  placeholder="e.g. EPA Regional Audit Report"
                />
                <Input
                  label="Public URL"
                  value={source.url}
                  onChangeText={(text) => handleUpdateSource(source.id, { url: text })}
                  placeholder="https://..."
                  keyboardType="url"
                  autoCapitalize="none"
                />
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.md,
  },
  previewToggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionHeading: {
    ...typography.h3,
    color: colors.ink,
  },
  toggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.surface,
  },
  toggleBtnActive: {
    backgroundColor: colors.primary,
  },
  toggleBtnText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
  toggleBtnTextActive: {
    color: colors.surface,
  },
  helperText: {
    ...typography.caption,
    color: colors.inkMuted,
    lineHeight: 18,
    marginBottom: spacing.md,
  },
  blockCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  blockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  blockBadge: {
    backgroundColor: colors.surfaceSubtle,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  blockBadgeText: {
    ...typography.caption,
    fontSize: 11,
    color: colors.inkMuted,
    fontWeight: '700',
  },
  blockActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionIcon: {
    padding: 4,
  },
  addToolbar: {
    backgroundColor: colors.surfaceSubtle,
    padding: spacing.md,
    borderRadius: radius.card,
    marginVertical: spacing.lg,
  },
  toolbarTitle: {
    ...typography.captionMedium,
    color: colors.ink,
    marginBottom: spacing.sm,
  },
  toolbarButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  sourcesSection: {
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  sourcesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sourcesTitle: {
    ...typography.bodySemibold,
    color: colors.ink,
  },
  sourcesSubtitle: {
    ...typography.caption,
    color: colors.inkMuted,
    fontSize: 12,
  },
  sourceCard: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.input,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  sourceCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  sourceIndex: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '700',
  },
  previewContainer: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.card,
  },
  errorText: {
    ...typography.caption,
    color: colors.danger,
    marginBottom: spacing.sm,
  },
});
