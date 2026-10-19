import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import {
  Text,
  StyleSheet,
  Animated,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, typography, spacing, radius, shadows } from '@/theme/tokens';
import { CONSTANTS } from '@/config/constants';

type ToastType = 'success' | 'error' | 'info';

interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showInfo: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hideToast = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setToast(null);
    });
  }, [fadeAnim]);

  const showToast = useCallback(
    (message: string, type: ToastType = 'info') => {
      if (timerRef.current) clearTimeout(timerRef.current);

      setToast({ id: Date.now().toString(), type, message });
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();

      timerRef.current = setTimeout(() => {
        hideToast();
      }, CONSTANTS.TOAST_DURATION_MS);
    },
    [fadeAnim, hideToast]
  );

  const showSuccess = useCallback((msg: string) => showToast(msg, 'success'), [showToast]);
  const showError = useCallback((msg: string) => showToast(msg, 'error'), [showToast]);
  const showInfo = useCallback((msg: string) => showToast(msg, 'info'), [showToast]);

  const getIcon = (type: ToastType): keyof typeof Feather.glyphMap => {
    switch (type) {
      case 'success':
        return 'check-circle';
      case 'error':
        return 'alert-circle';
      case 'info':
      default:
        return 'info';
    }
  };

  const getBorderColor = (type: ToastType): string => {
    switch (type) {
      case 'success':
        return colors.accent;
      case 'error':
        return colors.danger;
      case 'info':
      default:
        return colors.info;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast, showSuccess, showError, showInfo }}>
      {children}
      {toast && (
        <SafeAreaView style={styles.safeContainer} pointerEvents="box-none">
          <Animated.View
            style={[
              styles.toastContainer,
              {
                opacity: fadeAnim,
                borderLeftColor: getBorderColor(toast.type),
              },
            ]}
          >
            <TouchableOpacity
              style={styles.toastInner}
              onPress={hideToast}
              activeOpacity={0.9}
              accessibilityRole="alert"
              accessibilityLabel={toast.message}
            >
              <Feather
                name={getIcon(toast.type)}
                size={20}
                color={getBorderColor(toast.type)}
                style={styles.icon}
              />
              <Text style={styles.message} numberOfLines={2}>
                {toast.message}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </SafeAreaView>
      )}
    </ToastContext.Provider>
  );
};

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

const styles = StyleSheet.create({
  safeContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 9999,
  },
  toastContainer: {
    backgroundColor: colors.surface,
    borderRadius: radius.input,
    marginHorizontal: spacing.lg,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.floating,
    maxWidth: 420,
    width: '90%',
  },
  toastInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    minHeight: 48,
  },
  icon: {
    marginRight: spacing.md,
  },
  message: {
    ...typography.bodyMedium,
    fontSize: 14,
    color: colors.ink,
    flex: 1,
  },
});
