import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, typography, spacing, radius } from '@/theme/tokens';
import { Campaign, Category, CreatorType } from '@/types';
import { CATEGORIES } from '@/config/categories';
import { CONSTANTS } from '@/config/constants';
import { Input } from '@/components/ui/Input';
import { Chip } from '@/components/ui/Chip';

interface Step1BasicsProps {
  data: Partial<Campaign>;
  onChange: (fields: Partial<Campaign>) => void;
  errors?: Record<string, string>;
}

const CREATOR_TYPES: CreatorType[] = [
  'Individual',
  'Non-Profit / NGO',
  'Community Group',
  'Independent Journalist',
  'Researcher',
  'Coalition',
];

const SAMPLE_COVERS = [
  'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
];

export function Step1Basics({ data, onChange, errors = {} }: Step1BasicsProps) {
  const handleAiSuggest = () => {
    onChange({
      title: 'Protect Local Watersheds: Clean Water for 50,000 Families',
      category: 'Environment',
      summary:
        'New industrial discharge regulations threaten freshwater reserves. Back this campaign to distribute investigative research directly to impacted regional residents and civic leaders.',
      creatorName: 'Clean Waters Coalition',
      creatorType: 'Non-Profit / NGO',
      coverUrl: SAMPLE_COVERS[0],
    });
  };

  return (
    <View style={styles.container}>
      {/* AI Suggest proposal banner */}
      <View style={styles.aiBanner}>
        <View style={styles.aiLeft}>
          <View style={styles.aiBadge}>
            <Feather name="zap" size={14} color={colors.purple} />
            <Text style={styles.aiBadgeText}>AI Proposal</Text>
          </View>
          <Text style={styles.aiTitle}>Need inspiration for a clear message?</Text>
        </View>
        <TouchableOpacity
          style={styles.aiButton}
          onPress={handleAiSuggest}
          accessibilityRole="button"
          accessibilityLabel="Auto-fill example topic"
        >
          <Text style={styles.aiButtonText}>Suggest Sample</Text>
        </TouchableOpacity>
      </View>

      {/* Campaign Title */}
      <Input
        label="Campaign Title"
        placeholder="e.g. Expand High-Speed Fiber to Rural Classrooms"
        value={data.title || ''}
        onChangeText={(text) => onChange({ title: text })}
        maxLength={CONSTANTS.TITLE_MAX_LENGTH}
        error={errors.title}
        helperText="Keep it concise and action-oriented. Max 60 characters."
      />

      {/* Ad headline notice per FT-043 / AGENT.md */}
      <View style={styles.infoBox}>
        <Feather name="info" size={16} color={colors.primary} style={{ marginRight: 8 }} />
        <Text style={styles.infoText}>
          Your title and summary will also form the foundation for sponsored digital ad variants in Step 3.
        </Text>
      </View>

      {/* Category Selection */}
      <Text style={styles.fieldLabel}>Category</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScroll}
      >
        {CATEGORIES.map((cat) => (
          <Chip
            key={cat.id}
            label={cat.label}
            icon={cat.icon as any}
            selected={data.category === cat.id}
            onPress={() => onChange({ category: cat.id })}
          />
        ))}
      </ScrollView>
      {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}

      {/* Creator Details */}
      <Text style={[styles.fieldLabel, { marginTop: spacing.lg }]}>Creator Type</Text>
      <View style={styles.creatorTypesGrid}>
        {CREATOR_TYPES.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.creatorTypeChip,
              data.creatorType === type && styles.creatorTypeChipSelected,
            ]}
            onPress={() => onChange({ creatorType: type })}
            accessibilityRole="button"
          >
            <Text
              style={[
                styles.creatorTypeText,
                data.creatorType === type && styles.creatorTypeTextSelected,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Input
        label="Creator / Organization Name"
        placeholder="e.g. Jane Doe or Horizon Action Project"
        value={data.creatorName || ''}
        onChangeText={(text) => onChange({ creatorName: text })}
        error={errors.creatorName}
      />

      {/* Summary */}
      <Input
        label="Summary / Lead Paragraph"
        placeholder="Describe the core message, what is at stake, and why wider distribution is vital..."
        value={data.summary || ''}
        onChangeText={(text) => onChange({ summary: text })}
        maxLength={CONSTANTS.SUMMARY_MAX_LENGTH}
        multiline
        error={errors.summary}
        helperText="A clear summary helps potential backers immediately understand your message."
      />

      {/* Cover Image */}
      <Text style={styles.fieldLabel}>Cover Image</Text>
      <Input
        placeholder="Paste image URL (https://...)"
        value={data.coverUrl || ''}
        onChangeText={(text) => onChange({ coverUrl: text })}
        error={errors.coverUrl}
      />

      <Text style={styles.sublabel}>Or select a stock cover photo:</Text>
      <View style={styles.stockCoversRow}>
        {SAMPLE_COVERS.map((url, idx) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.stockThumb,
              data.coverUrl === url && styles.stockThumbSelected,
            ]}
            onPress={() => onChange({ coverUrl: url })}
          >
            <Image source={{ uri: url }} style={styles.stockImg} resizeMode="cover" />
            {data.coverUrl === url && (
              <View style={styles.checkBadge}>
                <Feather name="check" size={12} color={colors.surface} />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.md,
  },
  aiBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.purpleLight,
    padding: spacing.md,
    borderRadius: radius.card,
    marginBottom: spacing.lg,
  },
  aiLeft: {
    flex: 1,
    marginRight: spacing.sm,
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    gap: 4,
  },
  aiBadgeText: {
    ...typography.caption,
    color: colors.purple,
    fontWeight: '700',
    fontSize: 11,
  },
  aiTitle: {
    ...typography.caption,
    color: colors.ink,
    fontWeight: '500',
  },
  aiButton: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.purple,
  },
  aiButtonText: {
    ...typography.caption,
    color: colors.purple,
    fontWeight: '700',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSubtle,
    padding: spacing.md,
    borderRadius: radius.input,
    marginBottom: spacing.lg,
  },
  infoText: {
    ...typography.caption,
    color: colors.inkMuted,
    flex: 1,
    lineHeight: 18,
  },
  fieldLabel: {
    ...typography.bodySemibold,
    color: colors.ink,
    fontSize: 14,
    marginBottom: spacing.xs,
  },
  sublabel: {
    ...typography.caption,
    color: colors.inkMuted,
    marginBottom: spacing.xs,
  },
  categoryScroll: {
    gap: spacing.sm,
    paddingBottom: spacing.sm,
  },
  creatorTypesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  creatorTypeChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: colors.border,
  },
  creatorTypeChipSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  creatorTypeText: {
    ...typography.caption,
    color: colors.ink,
  },
  creatorTypeTextSelected: {
    color: colors.primary,
    fontWeight: '700',
  },
  stockCoversRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  stockThumb: {
    flex: 1,
    height: 64,
    borderRadius: radius.input,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  stockThumbSelected: {
    borderColor: colors.primary,
  },
  stockImg: {
    width: '100%',
    height: '100%',
  },
  checkBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: colors.primary,
    borderRadius: 8,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    ...typography.caption,
    color: colors.danger,
    marginTop: 4,
    marginBottom: spacing.sm,
  },
});
