import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

import {
  accentFromSecondary,
  DEFAULT_PRIMARY,
  DEFAULT_SECONDARY,
} from './colorUtils';
import { loadStoredColors, saveStoredColors } from './colorStorage';
import type { ColorsContextValue, ThemeColors } from './types';

const ColorsContext = createContext<ColorsContextValue | null>(null);

export type ColorsProviderProps = {
  children: ReactNode;
  /** Optional initial primary when nothing is saved. Defaults to white. */
  primary?: string;
  /** Optional initial secondary when nothing is saved. Defaults to black. */
  secondary?: string;
};

export function ColorsProvider({
  children,
  primary: initialPrimary = DEFAULT_PRIMARY,
  secondary: initialSecondary = DEFAULT_SECONDARY,
}: ColorsProviderProps) {
  const [primary, setPrimaryState] = useState(initialPrimary);
  const [secondary, setSecondaryState] = useState(initialSecondary);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;

    loadStoredColors().then((stored) => {
      if (cancelled) {
        return;
      }
      if (stored) {
        setPrimaryState(stored.primary);
        setSecondaryState(stored.secondary);
      }
      setHydrated(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    void saveStoredColors({ primary, secondary });
  }, [primary, secondary, hydrated]);

  const setPrimary = (color: string) => {
    setPrimaryState(color);
  };

  const setSecondary = (color: string) => {
    setSecondaryState(color);
  };

  const resetColors = () => {
    setPrimaryState(DEFAULT_PRIMARY);
    setSecondaryState(DEFAULT_SECONDARY);
  };

  const colors: ThemeColors = {
    primary,
    secondary,
    accent: accentFromSecondary(secondary),
  };

  return (
    <ColorsContext.Provider
      value={{ colors, setPrimary, setSecondary, resetColors }}>
      {children}
    </ColorsContext.Provider>
  );
}

/**
 * Read the three theme colors and change primary / secondary at runtime.
 * Accent always follows secondary (60% opacity) — there is no setter for it.
 * Colors are persisted on device (primary + secondary only).
 */
export function useColors(): ColorsContextValue {
  const context = useContext(ColorsContext);
  if (!context) {
    throw new Error('useColors must be used within a ColorsProvider');
  }
  return context;
}
