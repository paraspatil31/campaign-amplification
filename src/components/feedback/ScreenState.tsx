import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { CardSkeleton } from '@/components/ui/Skeleton';
import { EmptyState } from './EmptyState';
import { ErrorState } from './ErrorState';
import { Feather } from '@expo/vector-icons';

interface ScreenStateProps {
  isLoading: boolean;
  error?: Error | string | null;
  isEmpty?: boolean;
  emptyTitle?: string;
  emptyMessage?: string;
  emptyIcon?: keyof typeof Feather.glyphMap;
  emptyActionLabel?: string;
  onEmptyAction?: () => void;
  onRetry?: () => void;
  customSkeleton?: React.ReactNode;
  skeletonCount?: number;
  children: React.ReactNode;
}

export const ScreenState: React.FC<ScreenStateProps> = ({
  isLoading,
  error,
  isEmpty = false,
  emptyTitle = 'No campaigns found',
  emptyMessage = 'There are no campaigns matching your current view.',
  emptyIcon = 'inbox',
  emptyActionLabel,
  onEmptyAction,
  onRetry,
  customSkeleton,
  skeletonCount = 3,
  children,
}) => {
  if (isLoading) {
    if (customSkeleton) {
      return <>{customSkeleton}</>;
    }
    return (
      <View style={styles.loadingContainer}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <CardSkeleton key={`skeleton-${index}`} />
        ))}
      </View>
    );
  }

  if (error) {
    const errorMessage = typeof error === 'string' ? error : error.message;
    return (
      <ScrollView contentContainerStyle={styles.centerContainer}>
        <ErrorState message={errorMessage} onRetry={onRetry} />
      </ScrollView>
    );
  }

  if (isEmpty) {
    return (
      <ScrollView contentContainerStyle={styles.centerContainer}>
        <EmptyState
          icon={emptyIcon}
          title={emptyTitle}
          message={emptyMessage}
          actionLabel={emptyActionLabel}
          onAction={onEmptyAction}
        />
      </ScrollView>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  loadingContainer: {
    paddingVertical: 12,
  },
  centerContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
});
