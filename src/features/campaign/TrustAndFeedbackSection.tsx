import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, typography, spacing, radius } from '@/theme/tokens';
import { Campaign } from '@/types';
import { Accordion } from '@/components/ui/Accordion';
import { submitCampaignFeedback } from '@/services/campaigns';
import { useToast } from '@/components/feedback/Toast';

interface TrustAndFeedbackSectionProps {
  campaign: Campaign;
}

type AnswerOption = 'no' | 'somewhat' | 'yes';

export function TrustAndFeedbackSection({ campaign }: TrustAndFeedbackSectionProps) {
  const { showToast } = useToast();
  const [q1, setQ1] = useState<AnswerOption | null>(null);
  const [q2, setQ2] = useState<AnswerOption | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (nextQ1: AnswerOption, nextQ2: AnswerOption) => {
    try {
      setSubmitting(true);
      await submitCampaignFeedback(campaign.id, {
        visualsContinue: nextQ1,
        changedMind: nextQ2,
      });
      setSubmitted(true);
      showToast('Thank you for your feedback!', 'success');
    } catch {
      showToast('Could not record feedback', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSelectQ1 = (val: AnswerOption) => {
    setQ1(val);
    if (q2) {
      handleSubmit(val, q2);
    }
  };

  const handleSelectQ2 = (val: AnswerOption) => {
    setQ2(val);
    if (q1) {
      handleSubmit(q1, val);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>Review & Community Feedback</Text>

      {/* Review Process Accordion */}
      <Accordion title="Platform Review & Verification Process" defaultExpanded={false}>
        <View style={styles.reviewContent}>
          <Text style={styles.reviewIntro}>
            This platform does not award arbitrary trust ratings or guarantee factual truth. Instead, every published campaign must pass three verification gates:
          </Text>

          <View style={styles.gateItem}>
            <Feather name="check" size={16} color={colors.accent} style={styles.gateIcon} />
            <View style={styles.gateTextContainer}>
              <Text style={styles.gateTitle}>1. Source Corroboration</Text>
              <Text style={styles.gateDesc}>
                Creator must supply active, accessible public sources for key factual claims.
              </Text>
            </View>
          </View>

          <View style={styles.gateItem}>
            <Feather name="check" size={16} color={colors.accent} style={styles.gateIcon} />
            <View style={styles.gateTextContainer}>
              <Text style={styles.gateTitle}>2. Ad Network Compliance</Text>
              <Text style={styles.gateDesc}>
                Assets and targeting must satisfy major digital advertising platform safety standards.
              </Text>
            </View>
          </View>

          <View style={styles.gateItem}>
            <Feather name="check" size={16} color={colors.accent} style={styles.gateIcon} />
            <View style={styles.gateTextContainer}>
              <Text style={styles.gateTitle}>3. Non-Donation Strict Isolation</Text>
              <Text style={styles.gateDesc}>
                No payouts are made to personal bank accounts; all funds are earmarked for distribution costs.
              </Text>
            </View>
          </View>
        </View>
      </Accordion>

      {/* Community Feedback Survey Accordion */}
      <Accordion title="Community Feedback Survey" defaultExpanded={true}>
        <View style={styles.surveyContent}>
          {submitted ? (
            <View style={styles.submittedContainer}>
              <Feather name="check-circle" size={24} color={colors.accent} style={{ marginBottom: 6 }} />
              <Text style={styles.submittedTitle}>Feedback recorded</Text>
              <Text style={styles.submittedSubtitle}>
                Your responses help inform campaign distribution priority and transparency signals.
              </Text>
            </View>
          ) : (
            <>
              <Text style={styles.surveyIntro}>
                Help evaluate this campaign. Your responses are anonymous.
              </Text>

              {/* Question 1 */}
              <View style={styles.questionBlock}>
                <Text style={styles.questionText}>
                  1. Does this message inspire you to continue following this topic?
                </Text>
                <View style={styles.optionsRow}>
                  {(['no', 'somewhat', 'yes'] as AnswerOption[]).map((opt) => (
                    <TouchableOpacity
                      key={opt}
                      style={[
                        styles.optionButton,
                        q1 === opt && styles.optionButtonActive,
                      ]}
                      onPress={() => handleSelectQ1(opt)}
                      accessibilityRole="button"
                    >
                      <Text
                        style={[
                          styles.optionText,
                          q1 === opt && styles.optionTextActive,
                        ]}
                      >
                        {opt === 'no' ? 'No' : opt === 'somewhat' ? 'Somewhat' : 'Yes'}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Question 2 */}
              <View style={styles.questionBlock}>
                <Text style={styles.questionText}>
                  2. Has this story given you a clearer perspective on the issue?
                </Text>
                <View style={styles.optionsRow}>
                  {(['no', 'somewhat', 'yes'] as AnswerOption[]).map((opt) => (
                    <TouchableOpacity
                      key={opt}
                      style={[
                        styles.optionButton,
                        q2 === opt && styles.optionButtonActive,
                      ]}
                      onPress={() => handleSelectQ2(opt)}
                      accessibilityRole="button"
                    >
                      <Text
                        style={[
                          styles.optionText,
                          q2 === opt && styles.optionTextActive,
                        ]}
                      >
                        {opt === 'no' ? 'No' : opt === 'somewhat' ? 'Somewhat' : 'Yes'}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </>
          )}
        </View>
      </Accordion>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.sm,
  },
  sectionHeader: {
    ...typography.h3,
    color: colors.ink,
    marginBottom: spacing.sm,
  },
  reviewContent: {
    paddingVertical: spacing.xs,
  },
  reviewIntro: {
    ...typography.caption,
    color: colors.inkMuted,
    lineHeight: 18,
    marginBottom: spacing.md,
  },
  gateItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  gateIcon: {
    marginRight: spacing.sm,
    marginTop: 2,
  },
  gateTextContainer: {
    flex: 1,
  },
  gateTitle: {
    ...typography.captionMedium,
    fontWeight: '700',
    color: colors.ink,
  },
  gateDesc: {
    ...typography.caption,
    color: colors.inkMuted,
    fontSize: 12,
    lineHeight: 16,
  },
  surveyContent: {
    paddingVertical: spacing.xs,
  },
  surveyIntro: {
    ...typography.caption,
    color: colors.inkMuted,
    marginBottom: spacing.md,
  },
  questionBlock: {
    marginBottom: spacing.md,
  },
  questionText: {
    ...typography.bodyMedium,
    fontSize: 14,
    color: colors.ink,
    marginBottom: spacing.sm,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radius.input,
    borderWidth: 1,
    borderColor: colors.border,
  },
  optionButtonActive: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  optionText: {
    ...typography.captionMedium,
    fontWeight: '700',
    color: colors.ink,
  },
  optionTextActive: {
    color: colors.primary,
  },
  submittedContainer: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  submittedTitle: {
    ...typography.bodySemibold,
    color: colors.ink,
  },
  submittedSubtitle: {
    ...typography.caption,
    color: colors.inkMuted,
    textAlign: 'center',
    marginTop: 4,
  },
});
