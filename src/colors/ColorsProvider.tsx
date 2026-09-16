import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

import {
  accentFromSecondary,
  DEFAULT_PRIMARY,
  DEFAULT_SECONDARY,
} from './colorUtils';
import { loadStoredTheme, saveStoredTheme } from './colorStorage';
import {
  clampBorderRadius,
  clampBorderWidth,
  DEFAULT_BORDER_RADIUS,
  DEFAULT_BORDER_WIDTH,
} from './shapeUtils';
import type { ColorsContextValue, ThemeBorders, ThemeColors } from './types';

const ColorsContext = createContext<ColorsContextValue | null>(null);

export type ColorsProviderProps = {
  children: ReactNode;
  /** Optional initial primary when nothing is saved. Defaults to white. */
  primary?: string;
  /** Optional initial secondary when nothing is saved. Defaults to black. */
  secondary?: string;
  /** Optional initial border width when nothing is saved. Defaults to 2. */
  borderWidth?: number;
  /** Optional initial border radius when nothing is saved. Defaults to 15. */
  borderRadius?: number;
};

export function ColorsProvider({
  children,
  primary: initialPrimary = DEFAULT_PRIMARY,
  secondary: initialSecondary = DEFAULT_SECONDARY,
  borderWidth: initialBorderWidth = DEFAULT_BORDER_WIDTH,
  borderRadius: initialBorderRadius = DEFAULT_BORDER_RADIUS,
}: ColorsProviderProps) {
  const [primary, setPrimaryState] = useState(initialPrimary);
  const [secondary, setSecondaryState] = useState(initialSecondary);
  const [borderWidth, setBorderWidthState] = useState(
    clampBorderWidth(initialBorderWidth)
  );
  const [borderRadius, setBorderRadiusState] = useState(
    clampBorderRadius(initialBorderRadius)
  );
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;

    loadStoredTheme().then((stored) => {
      if (cancelled) {
        return;
      }
      if (stored) {
        if (stored.primary) {
          setPrimaryState(stored.primary);
        }
        if (stored.secondary) {
          setSecondaryState(stored.secondary);
        }
        if (stored.borderWidth !== undefined) {
          setBorderWidthState(stored.borderWidth);
        }
        if (stored.borderRadius !== undefined) {
          setBorderRadiusState(stored.borderRadius);
        }
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
    void saveStoredTheme({
      primary,
      secondary,
      borderWidth,
      borderRadius,
    });
  }, [primary, secondary, borderWidth, borderRadius, hydrated]);

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

  const setBorderWidth = (width: number) => {
    setBorderWidthState(clampBorderWidth(width));
  };

  const setBorderRadius = (radius: number) => {
    setBorderRadiusState(clampBorderRadius(radius));
  };

  const resetBorders = () => {
    setBorderWidthState(DEFAULT_BORDER_WIDTH);
    setBorderRadiusState(DEFAULT_BORDER_RADIUS);
  };

  const colors: ThemeColors = {
    primary,
    secondary,
    accent: accentFromSecondary(secondary),
  };

  const borders: ThemeBorders = {
    borderWidth,
    borderRadius,
  };

  return (
    <ColorsContext.Provider
      value={{
        colors,
        borders,
        setPrimary,
        setSecondary,
        resetColors,
        setBorderWidth,
        setBorderRadius,
        resetBorders,
      }}>
      {children}
    </ColorsContext.Provider>
  );
}

/**
 * Theme colors + borders. Accent follows secondary (60% opacity).
 * Primary, secondary, borderWidth, and borderRadius are persisted on device.
 */
export function useColors(): ColorsContextValue {
  const context = useContext(ColorsContext);
  if (!context) {
    throw new Error('useColors must be used within a ColorsProvider');
  }
  return context;
}
