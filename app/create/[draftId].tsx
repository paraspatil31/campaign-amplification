import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { colors, typography, spacing, radius } from '@/theme/tokens';
import { Campaign, Draft } from '@/types';
import { getDraftById, saveDraft, submitDraft } from '@/services/drafts';
import { useToast } from '@/components/feedback/Toast';
import { Button } from '@/components/ui/Button';
import { ScreenState } from '@/components/feedback/ScreenState';

// Step components
import { Step1Basics } from '@/features/create/Step1Basics';
import { Step2Story } from '@/features/create/Step2Story';
import { Step3Visuals } from '@/features/create/Step3Visuals';
import { Step4Reach } from '@/features/create/Step4Reach';
import { Step5Submit } from '@/features/create/Step5Submit';

const STEP_TITLES = ['Basics', 'Story', 'Visuals', 'Reach', 'Submit'];

export default function CreateWizardScreen() {
  const { draftId } = useLocalSearchParams<{ draftId: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [draftData, setDraftData] = useState<Partial<Campaign>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const autosaveTimer = useRef<any>(null);

  // Load existing draft
  useEffect(() => {
    if (!draftId) return;
    setLoading(true);
    getDraftById(draftId)
      .then((d) => {
        setDraftData(d.data);
        setCurrentStep(d.step || 1);
        setError(null);
      })
      .catch((err) => {
        setError(err?.message || 'Failed to load draft');
      })
      .finally(() => setLoading(false));
  }, [draftId]);

  // Debounced Autosave (FT-042)
  const triggerAutosave = (updatedData: Partial<Campaign>, step: number) => {
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    autosaveTimer.current = setTimeout(async () => {
      if (!draftId) return;
      try {
        setIsSaving(true);
        const draftObj: Draft = {
          id: draftId,
          userId: 'usr-demo-me',
          step,
          data: updatedData,
          lastSavedAt: new Date().toISOString(),
        };
        await saveDraft(draftObj);
      } catch {
        // Silently preserve in memory
      } finally {
        setIsSaving(false);
      }
    }, 800);
  };

  const handleChangeData = (fields: Partial<Campaign>) => {
    setDraftData((prev) => {
      const merged = { ...prev, ...fields };
      triggerAutosave(merged, currentStep);
      return merged;
    });
  };

  // Step Validation
  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};

    if (step === 1) {
      if (!draftData.title || draftData.title.trim().length < 5) {
        errors.title = 'Title must be at least 5 characters.';
      }
      if (!draftData.category) {
        errors.category = 'Please choose a category.';
      }
      if (!draftData.creatorName || draftData.creatorName.trim().length < 2) {
        errors.creatorName = 'Creator name is required.';
      }
      if (!draftData.summary || draftData.summary.trim().length < 10) {
        errors.summary = 'Summary must be at least 10 characters.';
      }
    } else if (step === 2) {
      if (!draftData.sources || draftData.sources.length === 0) {
        errors.sources = 'At least 1 verifiable public source is required.';
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (!validateStep(currentStep)) {
      showToast('Please fix highlighted fields before continuing', 'error');
      return;
    }
    const next = Math.min(currentStep + 1, 5);
    setCurrentStep(next);
    triggerAutosave(draftData, next);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      triggerAutosave(draftData, prev);
    } else {
      router.back();
    }
  };

  const handleSubmit = async () => {
    if (!draftId) return;
    try {
      setIsSubmitting(true);
      const newCampaign = await submitDraft(draftId);
      showToast('Campaign successfully submitted!', 'success');
      router.replace({
        pathname: '/create/submitted',
        params: { id: newCampaign.id, title: newCampaign.title },
      });
    } catch (err: any) {
      showToast(err?.message || 'Submission failed. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Top Wizard Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Back to drafts"
        >
          <Feather name="arrow-left" size={20} color={colors.ink} />
        </TouchableOpacity>

        <View style={styles.topCenter}>
          <Text style={styles.wizardTitle}>Campaign Wizard</Text>
          <Text style={styles.autosaveText}>
            {isSaving ? 'Autosaving...' : 'Draft saved'}
          </Text>
        </View>

        <View style={{ width: 40 }} />
      </View>

      {/* 5-Step Persistent Progress Indicator (FT-041) */}
      <View style={styles.stepIndicatorContainer}>
        {STEP_TITLES.map((title, index) => {
          const stepNum = index + 1;
          const isActive = currentStep === stepNum;
          const isCompleted = currentStep > stepNum;

          return (
            <TouchableOpacity
              key={title}
              style={styles.stepItem}
              onPress={() => {
                if (stepNum < currentStep || validateStep(currentStep)) {
                  setCurrentStep(stepNum);
                }
              }}
              disabled={stepNum > currentStep + 1}
            >
              <View
                style={[
                  styles.stepBadge,
                  isActive && styles.stepBadgeActive,
                  isCompleted && styles.stepBadgeCompleted,
                ]}
              >
                {isCompleted ? (
                  <Feather name="check" size={12} color={colors.surface} />
                ) : (
                  <Text
                    style={[
                      styles.stepBadgeNum,
                      (isActive || isCompleted) && styles.stepBadgeNumActive,
                    ]}
                  >
                    {stepNum}
                  </Text>
                )}
              </View>
              <Text
                style={[
                  styles.stepLabel,
                  isActive && styles.stepLabelActive,
                  isCompleted && styles.stepLabelCompleted,
                ]}
              >
                {title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Wizard Content Body */}
      <ScreenState
        isLoading={loading}
        error={error}
        onRetry={() => {
          if (draftId) {
            getDraftById(draftId).then((d) => setDraftData(d.data));
          }
        }}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 90 }]}
          showsVerticalScrollIndicator={false}
        >
          {currentStep === 1 && (
            <Step1Basics
              data={draftData}
              onChange={handleChangeData}
              errors={fieldErrors}
            />
          )}

          {currentStep === 2 && (
            <Step2Story
              data={draftData}
              onChange={handleChangeData}
              errors={fieldErrors}
            />
          )}

          {currentStep === 3 && (
            <Step3Visuals
              data={draftData}
              onChange={handleChangeData}
              errors={fieldErrors}
            />
          )}

          {currentStep === 4 && (
            <Step4Reach
              data={draftData}
              onChange={handleChangeData}
              errors={fieldErrors}
            />
          )}

          {currentStep === 5 && (
            <Step5Submit
              data={draftData}
              onChange={handleChangeData}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              errors={fieldErrors}
            />
          )}
        </ScrollView>
      </ScreenState>

      {/* Persistent Bottom Bar */}
      {currentStep < 5 && (
        <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
          <Button
            title={currentStep === 1 ? 'Exit' : 'Back'}
            variant="secondary"
            onPress={handlePrevStep}
            style={styles.bottomBarBack}
          />
          <Button
            title={`Next: ${STEP_TITLES[currentStep] || 'Continue'}`}
            variant="primary"
            onPress={handleNextStep}
            style={styles.bottomBarNext}
            icon="arrow-right"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topCenter: {
    alignItems: 'center',
  },
  wizardTitle: {
    ...typography.h3,
    color: colors.ink,
  },
  autosaveText: {
    ...typography.caption,
    fontSize: 11,
    color: colors.inkSubtle,
  },
  stepIndicatorContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  stepItem: {
    flex: 1,
    alignItems: 'center',
  },
  stepBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  stepBadgeActive: {
    backgroundColor: colors.primary,
  },
  stepBadgeCompleted: {
    backgroundColor: colors.accent,
  },
  stepBadgeNum: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.inkMuted,
  },
  stepBadgeNumActive: {
    color: colors.surface,
  },
  stepLabel: {
    ...typography.caption,
    fontSize: 11,
    color: colors.inkSubtle,
  },
  stepLabelActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  stepLabelCompleted: {
    color: colors.ink,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    flexDirection: 'row',
    gap: spacing.sm,
  },
  bottomBarBack: {
    flex: 1,
  },
  bottomBarNext: {
    flex: 2,
  },
});
