import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

import {
  accentFromSecondary,
  colorWithOpacity,
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
import {
  clampShadowBlur,
  clampShadowOffset,
  clampShadowOpacity,
  clampShadowSpread,
  DEFAULT_SHADOW_BLUR,
  DEFAULT_SHADOW_OFFSET,
  DEFAULT_SHADOW_OPACITY,
  DEFAULT_SHADOW_SPREAD,
} from './shadowUtils';
import {
  DEFAULT_THEME_FONT,
  getFontFamily,
  parseThemeFont,
  ThemeFont,
} from '../typography/fontTypes';
import type { ThemeFontState } from '../typography/fontTypes';
import type {
  ColorsContextValue,
  ThemeBorders,
  ThemeColors,
  ThemeShadows,
} from './types';

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
  shadowOpacity?: number;
  shadowBlur?: number;
  shadowSpread?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  /** Optional initial font when nothing is saved. Defaults to Geist. */
  font?: ThemeFont;
};

export function ColorsProvider({
  children,
  primary: initialPrimary = DEFAULT_PRIMARY,
  secondary: initialSecondary = DEFAULT_SECONDARY,
  borderWidth: initialBorderWidth = DEFAULT_BORDER_WIDTH,
  borderRadius: initialBorderRadius = DEFAULT_BORDER_RADIUS,
  shadowOpacity: initialShadowOpacity = DEFAULT_SHADOW_OPACITY,
  shadowBlur: initialShadowBlur = DEFAULT_SHADOW_BLUR,
  shadowSpread: initialShadowSpread = DEFAULT_SHADOW_SPREAD,
  shadowOffsetX: initialShadowOffsetX = DEFAULT_SHADOW_OFFSET,
  shadowOffsetY: initialShadowOffsetY = DEFAULT_SHADOW_OFFSET,
  font: initialFont = DEFAULT_THEME_FONT,
}: ColorsProviderProps) {
  const [primary, setPrimaryState] = useState(initialPrimary);
  const [secondary, setSecondaryState] = useState(initialSecondary);
  const [borderWidth, setBorderWidthState] = useState(
    clampBorderWidth(initialBorderWidth)
  );
  const [borderRadius, setBorderRadiusState] = useState(
    clampBorderRadius(initialBorderRadius)
  );
  const [shadowOpacity, setShadowOpacityState] = useState(
    clampShadowOpacity(initialShadowOpacity)
  );
  const [shadowBlur, setShadowBlurState] = useState(
    clampShadowBlur(initialShadowBlur)
  );
  const [shadowSpread, setShadowSpreadState] = useState(
    clampShadowSpread(initialShadowSpread)
  );
  const [shadowOffsetX, setShadowOffsetXState] = useState(
    clampShadowOffset(initialShadowOffsetX)
  );
  const [shadowOffsetY, setShadowOffsetYState] = useState(
    clampShadowOffset(initialShadowOffsetY)
  );
  const [activeFont, setActiveFontState] = useState(initialFont);
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
        if (stored.shadowOpacity !== undefined) {
          setShadowOpacityState(stored.shadowOpacity);
        }
        if (stored.shadowBlur !== undefined) {
          setShadowBlurState(stored.shadowBlur);
        }
        if (stored.shadowSpread !== undefined) {
          setShadowSpreadState(stored.shadowSpread);
        }
        if (stored.shadowOffsetX !== undefined) {
          setShadowOffsetXState(stored.shadowOffsetX);
        }
        if (stored.shadowOffsetY !== undefined) {
          setShadowOffsetYState(stored.shadowOffsetY);
        }
        const storedFont = parseThemeFont(stored.font);
        if (storedFont) {
          setActiveFontState(storedFont);
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
      shadowOpacity,
      shadowBlur,
      shadowSpread,
      shadowOffsetX,
      shadowOffsetY,
      font: activeFont,
    });
  }, [
    primary,
    secondary,
    borderWidth,
    borderRadius,
    shadowOpacity,
    shadowBlur,
    shadowSpread,
    shadowOffsetX,
    shadowOffsetY,
    activeFont,
    hydrated,
  ]);

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

  const setShadowOpacity = (opacity: number) => {
    setShadowOpacityState(clampShadowOpacity(opacity));
  };

  const setShadowBlur = (blur: number) => {
    setShadowBlurState(clampShadowBlur(blur));
  };

  const setShadowSpread = (spread: number) => {
    setShadowSpreadState(clampShadowSpread(spread));
  };

  const setShadowOffsetX = (offsetX: number) => {
    setShadowOffsetXState(clampShadowOffset(offsetX));
  };

  const setShadowOffsetY = (offsetY: number) => {
    setShadowOffsetYState(clampShadowOffset(offsetY));
  };

  const resetShadows = () => {
    setShadowOpacityState(DEFAULT_SHADOW_OPACITY);
    setShadowBlurState(DEFAULT_SHADOW_BLUR);
    setShadowSpreadState(DEFAULT_SHADOW_SPREAD);
    setShadowOffsetXState(DEFAULT_SHADOW_OFFSET);
    setShadowOffsetYState(DEFAULT_SHADOW_OFFSET);
  };

  const changeFont = (font: ThemeFont) => {
    setActiveFontState(font);
  };

  const resetFont = () => {
    setActiveFontState(DEFAULT_THEME_FONT);
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

  const shadows: ThemeShadows = {
    opacity: shadowOpacity,
    blur: shadowBlur,
    spread: shadowSpread,
    offsetX: shadowOffsetX,
    offsetY: shadowOffsetY,
    color: colorWithOpacity(secondary, shadowOpacity / 100),
  };

  const font: ThemeFontState = {
    name: activeFont,
    family: getFontFamily(activeFont),
  };

  return (
    <ColorsContext.Provider
      value={{
        colors,
        borders,
        shadows,
        font,
        setPrimary,
        setSecondary,
        resetColors,
        setBorderWidth,
        setBorderRadius,
        resetBorders,
        setShadowOpacity,
        setShadowBlur,
        setShadowSpread,
        setShadowOffsetX,
        setShadowOffsetY,
        resetShadows,
        changeFont,
        resetFont,
      }}>
      {children}
    </ColorsContext.Provider>
  );
}

/**
 * Theme colors, borders, and shadows.
 * Shadow color is always secondary at the current shadow opacity.
 * Values are persisted on device.
 */
export function useColors(): ColorsContextValue {
  const context = useContext(ColorsContext);
  if (!context) {
    throw new Error('useColors must be used within a ColorsProvider');
  }
  return context;
}
