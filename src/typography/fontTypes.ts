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

/** Fontsource CDN ids for Google fonts (Geist is local). */
export const FONTSOURCE_IDS: Partial<Record<ThemeFont, string>> = {
  [ThemeFont.Poppins]: 'poppins',
  [ThemeFont.PixelifySans]: 'pixelify-sans',
  [ThemeFont.Cinzel]: 'cinzel',
  [ThemeFont.Iceland]: 'iceland',
  [ThemeFont.Abel]: 'abel',
  [ThemeFont.Sail]: 'sail',
  [ThemeFont.PoiretOne]: 'poiret-one',
  [ThemeFont.RobotoMono]: 'roboto-mono',
  [ThemeFont.Lora]: 'lora',
  [ThemeFont.Ubuntu]: 'ubuntu',
  [ThemeFont.Outfit]: 'outfit',
  [ThemeFont.BebasNeue]: 'bebas-neue',
  [ThemeFont.SourceCodePro]: 'source-code-pro',
  [ThemeFont.JosefinSans]: 'josefin-sans',
  [ThemeFont.InstrumentSerif]: 'instrument-serif',
  [ThemeFont.Caveat]: 'caveat',
  [ThemeFont.Bungee]: 'bungee',
  [ThemeFont.Pacifico]: 'pacifico',
  [ThemeFont.Kalam]: 'kalam',
  [ThemeFont.AmaticSc]: 'amatic-sc',
  [ThemeFont.Acme]: 'acme',
  [ThemeFont.ShareTechMono]: 'share-tech-mono',
  [ThemeFont.Bangers]: 'bangers',
  [ThemeFont.LexendExa]: 'lexend-exa',
  [ThemeFont.Courgette]: 'courgette',
  [ThemeFont.Changa]: 'changa',
  [ThemeFont.Gruppo]: 'gruppo',
  [ThemeFont.Goldman]: 'goldman',
  [ThemeFont.Audiowide]: 'audiowide',
};

export function getFontFamily(font: ThemeFont): string {
  return font;
}

export function getBoldFontFamily(font: ThemeFont): string {
  return `${font}-Bold`;
}

export function getSemiBoldFontFamily(font: ThemeFont): string {
  return `${font}-SemiBold`;
}

export function getFontsourceUrl(
  fontId: string,
  weight: 400 | 600 | 700 = 400
): string {
  return `https://cdn.jsdelivr.net/fontsource/fonts/${fontId}@latest/latin-${weight}-normal.ttf`;
}

export function parseThemeFont(value: string | undefined): ThemeFont | null {
  if (!value) {
    return null;
  }
  return Object.values(ThemeFont).includes(value as ThemeFont)
    ? (value as ThemeFont)
    : null;
}
