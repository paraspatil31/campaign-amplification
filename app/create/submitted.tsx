import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors, typography, spacing, radius } from '@/theme/tokens';
import { Button } from '@/components/ui/Button';

export default function SubmittedConfirmationScreen() {
  const router = useRouter();
  const { id, title } = useLocalSearchParams<{ id: string; title: string }>();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Success Hero */}
      <View style={styles.successBadge}>
        <Feather name="check" size={36} color={colors.surface} />
      </View>
      <Text style={styles.title}>Campaign Submitted!</Text>
      <Text style={styles.subtitle}>
        "{title || 'Your campaign'}" has entered the platform review queue.
      </Text>

      {/* Review Timeline Card (FT-048) */}
      <View style={styles.timelineCard}>
        <Text style={styles.timelineTitle}>Review & Amplification Timeline</Text>

        {/* Step 1: Submitted */}
        <View style={styles.timelineItem}>
          <View style={[styles.timelineDot, styles.dotDone]}>
            <Feather name="check" size={14} color={colors.surface} />
          </View>
          <View style={styles.timelineDetails}>
            <View style={styles.stepTitleRow}>
              <Text style={styles.stepTitle}>1. Submission Received</Text>
              <Text style={styles.statusDoneText}>Completed</Text>
            </View>
            <Text style={styles.stepDesc}>
              Campaign draft securely logged with verifiable sources and ad variants.
            </Text>
          </View>
        </View>

        {/* Step 2: Moderation Review */}
        <View style={styles.timelineItem}>
          <View style={[styles.timelineDot, styles.dotActive]}>
            <Feather name="clock" size={14} color={colors.warning} />
          </View>
          <View style={styles.timelineDetails}>
            <View style={styles.stepTitleRow}>
              <Text style={styles.stepTitle}>2. Source & Policy Review</Text>
              <Text style={styles.statusActiveText}>In Progress</Text>
            </View>
            <Text style={styles.stepDesc}>
              Editorial reviewers audit cited public sources for accuracy and verify compliance with advertising network integrity standards.
            </Text>
          </View>
        </View>

        {/* Step 3: Available for Funding */}
        <View style={styles.timelineItem}>
          <View style={[styles.timelineDot, styles.dotPending]}>
            <Feather name="zap" size={14} color={colors.inkSubtle} />
          </View>
          <View style={styles.timelineDetails}>
            <View style={styles.stepTitleRow}>
              <Text style={styles.stepTitle}>3. Live for Community Backers</Text>
              <Text style={styles.statusPendingText}>Next</Text>
            </View>
            <Text style={styles.stepDesc}>
              Upon approval, the campaign goes live for backers to pool distribution funds toward your target ad budget.
            </Text>
          </View>
        </View>

        {/* Step 4: Promoting / Ad Flight */}
        <View style={styles.timelineItem}>
          <View style={[styles.timelineDot, styles.dotPending]}>
            <Feather name="radio" size={14} color={colors.inkSubtle} />
          </View>
          <View style={styles.timelineDetails}>
            <View style={styles.stepTitleRow}>
              <Text style={styles.stepTitle}>4. Ad Distribution Flight</Text>
              <Text style={styles.statusPendingText}>Upcoming</Text>
            </View>
            <Text style={styles.stepDesc}>
              Sponsored ads launch on target networks. Live impressions and reach metrics populate your final distribution report.
            </Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonsContainer}>
        {id && (
          <Button
            title="View Campaign Page"
            onPress={() => router.replace(`/campaign/${id}` as any)}
            variant="primary"
            icon="external-link"
            style={{ marginBottom: spacing.sm }}
          />
        )}
        <Button
          title="Go to Home"
          onPress={() => router.replace('/(tabs)')}
          variant="secondary"
          icon="home"
        />
      </View>
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
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  successBadge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.ink,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.inkMuted,
    textAlign: 'center',
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  timelineCard: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xl,
  },
  timelineTitle: {
    ...typography.h3,
    color: colors.ink,
    marginBottom: spacing.lg,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  timelineDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    marginTop: 2,
  },
  dotDone: {
    backgroundColor: colors.accent,
  },
  dotActive: {
    backgroundColor: colors.warningLight,
    borderWidth: 1,
    borderColor: colors.warning,
  },
  dotPending: {
    backgroundColor: colors.surfaceSubtle,
  },
  timelineDetails: {
    flex: 1,
  },
  stepTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  stepTitle: {
    ...typography.bodySemibold,
    color: colors.ink,
  },
  statusDoneText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.accent,
  },
  statusActiveText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.warning,
  },
  statusPendingText: {
    ...typography.caption,
    color: colors.inkSubtle,
  },
  stepDesc: {
    ...typography.caption,
    color: colors.inkMuted,
    lineHeight: 18,
  },
  buttonsContainer: {
    width: '100%',
  },
});
