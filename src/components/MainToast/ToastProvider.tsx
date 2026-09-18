import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  DEFAULT_TOAST_DURATION,
  DEFAULT_TOAST_POSITION,
  MainToast,
  type ToastPosition,
} from './MainToast';

export type ShowToastOptions = {
  message: string;
  secondaryText?: string;
  icon?: ReactNode;
  position?: ToastPosition;
  inverted?: boolean;
  /** Auto-hide delay in ms. Defaults to `DEFAULT_TOAST_DURATION` (2200). */
  duration?: number;
};

export type ToastContextValue = {
  /** Show a toast. Pass a string for message-only, or an options object. */
  showToast: (input: string | ShowToastOptions) => void;
  /** Hide the current toast immediately. */
  hideToast: () => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export type ToastProviderProps = {
  children: ReactNode;
};

type ActiveToast = ShowToastOptions & { id: number };

/**
 * Hosts an overlay `MainToast` and exposes `useToast()`.
 * Place inside `ColorsProvider`. Includes a `SafeAreaProvider` so toast
 * positions clear notches / home indicators even if the app has none.
 */
export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <SafeAreaProvider>
      <ToastProviderInner>{children}</ToastProviderInner>
    </SafeAreaProvider>
  );
}

function ToastProviderInner({ children }: ToastProviderProps) {
  const [toast, setToast] = useState<ActiveToast | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idRef = useRef(0);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const hideToast = useCallback(() => {
    clearTimer();
    setToast(null);
  }, [clearTimer]);

  const showToast = useCallback(
    (input: string | ShowToastOptions) => {
      const options: ShowToastOptions =
        typeof input === 'string' ? { message: input } : input;
      clearTimer();
      idRef.current += 1;
      const id = idRef.current;
      const duration = options.duration ?? DEFAULT_TOAST_DURATION;
      setToast({ ...options, id });
      if (duration > 0) {
        timerRef.current = setTimeout(() => {
          setToast((current) => (current?.id === id ? null : current));
          timerRef.current = null;
        }, duration);
      }
    },
    [clearTimer]
  );

  useEffect(() => () => clearTimer(), [clearTimer]);

  const value = useMemo(
    () => ({ showToast, hideToast }),
    [showToast, hideToast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast ? (
        <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
          <MainToast
            key={toast.id}
            message={toast.message}
            secondaryText={toast.secondaryText}
            icon={toast.icon}
            position={toast.position ?? DEFAULT_TOAST_POSITION}
            inverted={toast.inverted ?? false}
            visible
          />
        </View>
      ) : null}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
}
