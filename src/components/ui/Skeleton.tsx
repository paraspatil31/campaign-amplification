import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, ViewStyle } from 'react-native';
import { colors, radius } from '@/theme/tokens';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 16,
  borderRadius = radius.input,
  style,
}) => {
  const opacityAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0.8,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.3,
          duration: 750,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [opacityAnim]);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width: width as any,
          height,
          borderRadius,
          opacity: opacityAnim,
        },
        style,
      ]}
    />
  );
};

export const CardSkeleton: React.FC = () => (
  <View style={styles.cardSkeleton}>
    <Skeleton height={180} borderRadius={radius.card} style={styles.coverSkeleton} />
    <View style={styles.contentSkeleton}>
      <Skeleton width="30%" height={14} style={{ marginBottom: 8 }} />
      <Skeleton width="90%" height={20} style={{ marginBottom: 6 }} />
      <Skeleton width="70%" height={20} style={{ marginBottom: 12 }} />
      <Skeleton width="100%" height={14} style={{ marginBottom: 4 }} />
      <Skeleton width="85%" height={14} style={{ marginBottom: 16 }} />
      <Skeleton height={8} borderRadius={radius.pill} style={{ marginBottom: 12 }} />
      <View style={styles.footerSkeleton}>
        <Skeleton width="40%" height={14} />
        <Skeleton width="35%" height={36} borderRadius={radius.input} />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: colors.borderDark,
  },
  cardSkeleton: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    marginVertical: 8,
    marginHorizontal: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  coverSkeleton: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  contentSkeleton: {
    padding: 16,
  },
  footerSkeleton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
});
