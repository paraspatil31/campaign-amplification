import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import { colors, typography, spacing, radius, shadows } from '@/theme/tokens';
import { getDrafts, saveDraft, deleteDraft } from '@/services/drafts';
import { Draft, Campaign } from '@/types';
import { formatRelativeTime } from '@/lib/format';
import { EmptyState } from '@/components/feedback/EmptyState';
import { VoiceAssistantModal } from '@/features/create/VoiceAssistantModal';
import { useToast } from '@/components/feedback/Toast';

export default function CreateTabScreen() {
  const router = useRouter();
  const { showToast } = useToast();
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [voiceModalVisible, setVoiceModalVisible] = useState(false);

  const fetchDrafts = () => {
    getDrafts('usr-demo-me').then(setDrafts).catch(() => {});
  };

  useFocusEffect(
    useCallback(() => {
      fetchDrafts();
    }, [])
  );

  const handleStartManual = async () => {
    const newDraftId = `dft-${Date.now()}`;
    const newDraft: Draft = {
      id: newDraftId,
      userId: 'usr-demo-me',
      step: 1,
      data: {
        category: 'Environment',
        creatorName: 'Community Advocate',
        creatorType: 'Individual',
        durationDays: 30,
        fundingGoalCents: 100000,
        goalSetBy: 'creator',
      },
      lastSavedAt: new Date().toISOString(),
    };
    await saveDraft(newDraft);
    router.push({
      pathname: '/create/[draftId]',
      params: { draftId: newDraftId },
    });
  };

  const handleApplyVoiceProposal = async (proposal: Partial<Campaign>) => {
    const newDraftId = `dft-${Date.now()}`;
    const newDraft: Draft = {
      id: newDraftId,
      userId: 'usr-demo-me',
      step: 1,
      data: {
        ...proposal,
        goalSetBy: 'creator',
      },
      lastSavedAt: new Date().toISOString(),
    };
    await saveDraft(newDraft);
    showToast('Voice proposal applied! You can now edit each step.', 'success');
    router.push({
      pathname: '/create/[draftId]',
      params: { draftId: newDraftId },
    });
  };

  const handleDeleteDraft = async (id: string, e: any) => {
    e.stopPropagation?.();
    await deleteDraft(id);
    showToast('Draft deleted', 'info');
    fetchDrafts();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.pageTitle}>Start a Campaign</Text>
      <Text style={styles.pageSubtitle}>
        Share your story, back it with credible sources, and distribute your message to audiences that matter.
      </Text>

      {/* Mode Choice Cards */}
      <View style={styles.modeCardsContainer}>
        {/* Manual Creation Card */}
        <TouchableOpacity
          style={styles.modeCard}
          activeOpacity={0.8}
          onPress={handleStartManual}
          accessibilityRole="button"
          accessibilityLabel="Create Manually. Build your campaign step-by-step with full editorial control."
        >
          <View style={[styles.iconBox, { backgroundColor: colors.primaryLight }]}>
            <Feather name="edit-3" size={24} color={colors.primary} />
          </View>
          <View style={styles.modeTextContainer}>
            <Text style={styles.modeTitle}>Create Manually</Text>
            <Text style={styles.modeDesc}>
              5 guided steps: Basics, Story, Visuals, Reach, and Submit.
            </Text>
          </View>
          <Feather name="arrow-right" size={20} color={colors.inkMuted} />
        </TouchableOpacity>

        {/* Voice Creation Card */}
        <TouchableOpacity
          style={styles.modeCard}
          activeOpacity={0.8}
          onPress={() => setVoiceModalVisible(true)}
          accessibilityRole="button"
          accessibilityLabel="Create with Your Voice. Guided AI interview to structure your draft."
        >
          <View style={[styles.iconBox, { backgroundColor: colors.purpleLight }]}>
            <Feather name="mic" size={24} color={colors.purple} />
          </View>
          <View style={styles.modeTextContainer}>
            <View style={styles.voiceTitleRow}>
              <Text style={styles.modeTitle}>Create with Voice</Text>
              <View style={styles.aiBadge}>
                <Text style={styles.aiBadgeText}>AI Assist</Text>
              </View>
            </View>
            <Text style={styles.modeDesc}>
              Speak your ideas naturally; get an editable draft in seconds.
            </Text>
          </View>
          <Feather name="arrow-right" size={20} color={colors.inkMuted} />
        </TouchableOpacity>
      </View>

      {/* Resume Drafts Section */}
      <View style={styles.draftsSection}>
        <Text style={styles.sectionTitle}>Resume Drafts</Text>
        {drafts.length === 0 ? (
          <View style={styles.draftsEmptyContainer}>
            <EmptyState
              icon="file-text"
              title="No Saved Drafts"
              message="Your draft campaigns will automatically appear here as you work on them."
            />
          </View>
        ) : (
          drafts.map((d) => (
            <TouchableOpacity
              key={d.id}
              style={styles.draftItem}
              onPress={() =>
                router.push({
                  pathname: '/create/[draftId]',
                  params: { draftId: d.id },
                })
              }
              accessibilityRole="button"
            >
              <View style={styles.draftIconBox}>
                <Feather name="file-text" size={18} color={colors.primary} />
              </View>
              <View style={styles.draftInfo}>
                <Text style={styles.draftTitle} numberOfLines={1}>
                  {d.data.title || 'Untitled Draft'}
                </Text>
                <Text style={styles.draftMeta}>
                  Step {d.step} of 5 · Saved {formatRelativeTime(d.lastSavedAt)}
                </Text>
              </View>
              <TouchableOpacity
                onPress={(e) => handleDeleteDraft(d.id, e)}
                style={{ padding: spacing.xs, marginRight: spacing.xs }}
                accessibilityLabel="Delete draft"
              >
                <Feather name="trash-2" size={16} color={colors.inkSubtle} />
              </TouchableOpacity>
              <Feather name="chevron-right" size={20} color={colors.inkMuted} />
            </TouchableOpacity>
          ))
        )}
      </View>

      {/* Voice Assistant Modal */}
      <VoiceAssistantModal
        visible={voiceModalVisible}
        onClose={() => setVoiceModalVisible(false)}
        onApplyProposal={handleApplyVoiceProposal}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.xl,
    paddingBottom: 40,
  },
  pageTitle: {
    ...typography.h1,
    color: colors.ink,
    marginBottom: spacing.xs,
  },
  pageSubtitle: {
    ...typography.body,
    color: colors.inkMuted,
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
  modeCardsContainer: {
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },
  modeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: radius.input,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  modeTextContainer: {
    flex: 1,
  },
  voiceTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  aiBadge: {
    backgroundColor: colors.purpleLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
  aiBadgeText: {
    ...typography.caption,
    fontSize: 10,
    color: colors.purple,
    fontWeight: '700',
  },
  modeTitle: {
    ...typography.bodySemibold,
    color: colors.ink,
    fontSize: 17,
    marginBottom: 2,
  },
  modeDesc: {
    ...typography.caption,
    color: colors.inkMuted,
    lineHeight: 18,
  },
  draftsSection: {
    marginTop: spacing.md,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.ink,
    marginBottom: spacing.md,
  },
  draftsEmptyContainer: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  draftItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.input,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  draftIconBox: {
    marginRight: spacing.md,
  },
  draftInfo: {
    flex: 1,
  },
  draftTitle: {
    ...typography.bodySemibold,
    color: colors.ink,
  },
  draftMeta: {
    ...typography.caption,
    color: colors.inkMuted,
    marginTop: 2,
  },
});
