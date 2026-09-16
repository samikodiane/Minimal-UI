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

export type ColorsContextValue = {
  colors: ThemeColors;
  borders: ThemeBorders;
  setPrimary: (color: string) => void;
  setSecondary: (color: string) => void;
  /** Restore white / black defaults and persist them. */
  resetColors: () => void;
  setBorderWidth: (width: number) => void;
  setBorderRadius: (radius: number) => void;
  /** Restore border width 2 and radius 15, then persist. */
  resetBorders: () => void;
};
