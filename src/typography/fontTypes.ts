/** Available theme fonts. Add assets in `loadMinimalUIFonts` when wiring new entries. */
export enum ThemeFont {
  Geist = 'Geist',
  Poppins = 'Poppins',
  RobotoMono = 'RobotoMono',
  Ubuntu = 'Ubuntu',
}

export type ThemeFontState = {
  /** Active font token. */
  name: ThemeFont;
  /** React Native `fontFamily` string for the active font. */
  family: string;
};

export const DEFAULT_THEME_FONT = ThemeFont.Geist;

const FONT_FAMILY: Record<ThemeFont, string> = {
  [ThemeFont.Geist]: 'Geist',
  [ThemeFont.Poppins]: 'Poppins',
  [ThemeFont.RobotoMono]: 'RobotoMono',
  [ThemeFont.Ubuntu]: 'Ubuntu',
};

export function getFontFamily(font: ThemeFont): string {
  return FONT_FAMILY[font];
}

export function parseThemeFont(value: string | undefined): ThemeFont | null {
  if (!value) {
    return null;
  }
  return Object.values(ThemeFont).includes(value as ThemeFont)
    ? (value as ThemeFont)
    : null;
}
