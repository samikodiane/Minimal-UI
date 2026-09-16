/** Available theme fonts. One active font at a time for the whole theme. */
export enum ThemeFont {
  Geist = 'Geist',
  Poppins = 'Poppins',
  PixelifySans = 'PixelifySans',
  Cinzel = 'Cinzel',
  Iceland = 'Iceland',
  Abel = 'Abel',
  Sail = 'Sail',
  PoiretOne = 'PoiretOne',
  RobotoMono = 'RobotoMono',
  Lora = 'Lora',
  Ubuntu = 'Ubuntu',
  Outfit = 'Outfit',
  BebasNeue = 'BebasNeue',
  SourceCodePro = 'SourceCodePro',
  JosefinSans = 'JosefinSans',
  InstrumentSerif = 'InstrumentSerif',
  Caveat = 'Caveat',
  Bungee = 'Bungee',
  Pacifico = 'Pacifico',
  Kalam = 'Kalam',
  AmaticSc = 'AmaticSc',
  Acme = 'Acme',
  ShareTechMono = 'ShareTechMono',
  Bangers = 'Bangers',
  LexendExa = 'LexendExa',
  Courgette = 'Courgette',
  Changa = 'Changa',
  Gruppo = 'Gruppo',
  Goldman = 'Goldman',
  Audiowide = 'Audiowide',
}

export type ThemeFontState = {
  /** Active font token. */
  name: ThemeFont;
  /** Base family (regular weight). */
  family: string;
  /** Bold face for primary MainText on native. */
  boldFamily: string;
  /** Semi-bold face for secondary MainText on native. */
  semiBoldFamily: string;
};

export const DEFAULT_THEME_FONT = ThemeFont.Geist;

/** All selectable theme fonts (for pickers / enums). */
export const THEME_FONTS = Object.values(ThemeFont);

export function getFontFamily(font: ThemeFont): string {
  return font;
}

export function getBoldFontFamily(font: ThemeFont): string {
  return `${font}-Bold`;
}

export function getSemiBoldFontFamily(font: ThemeFont): string {
  return `${font}-SemiBold`;
}

export function parseThemeFont(value: string | undefined): ThemeFont | null {
  if (!value) {
    return null;
  }
  return Object.values(ThemeFont).includes(value as ThemeFont)
    ? (value as ThemeFont)
    : null;
}
