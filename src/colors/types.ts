export type ThemeColors = {
  primary: string;
  secondary: string;
  /** Always secondary at 60% opacity. Not settable directly. */
  accent: string;
};

export type ThemeBorders = {
  borderWidth: number;
  borderRadius: number;
};

export type ThemeShadows = {
  /** 0–100. Applied to secondary for the shadow color. */
  opacity: number;
  blur: number;
  spread: number;
  offsetX: number;
  offsetY: number;
  /** Secondary at the current shadow opacity. Not settable directly. */
  color: string;
};

export type ColorsContextValue = {
  colors: ThemeColors;
  borders: ThemeBorders;
  shadows: ThemeShadows;
  setPrimary: (color: string) => void;
  setSecondary: (color: string) => void;
  /** Restore white / black defaults and persist them. */
  resetColors: () => void;
  setBorderWidth: (width: number) => void;
  setBorderRadius: (radius: number) => void;
  /** Restore border width 2 and radius 15, then persist. */
  resetBorders: () => void;
  setShadowOpacity: (opacity: number) => void;
  setShadowBlur: (blur: number) => void;
  setShadowSpread: (spread: number) => void;
  setShadowOffsetX: (offsetX: number) => void;
  setShadowOffsetY: (offsetY: number) => void;
  /** Restore all shadow values to 0, then persist. */
  resetShadows: () => void;
};
