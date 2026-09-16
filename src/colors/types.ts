export type ThemeColors = {
  primary: string;
  secondary: string;
  /** Always secondary at 60% opacity. Not settable directly. */
  accent: string;
};

export type ColorsContextValue = {
  colors: ThemeColors;
  setPrimary: (color: string) => void;
  setSecondary: (color: string) => void;
  /** Restore white / black defaults and clear saved colors on device. */
  resetColors: () => void;
};
