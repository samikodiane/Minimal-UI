import { loadAsync } from 'expo-font';

import { GOOGLE_FONT_ASSETS } from './googleFontAssets';
import {
  getBoldFontFamily,
  getFontFamily,
  getSemiBoldFontFamily,
  ThemeFont,
} from './fontTypes';

/**
 * Load all theme fonts from bundled assets (Geist + @expo-google-fonts).
 * Call once at app startup before rendering text. Works fully offline.
 */
export async function loadMinimalUIFonts(): Promise<void> {
  const geistRegular = require('../../assets/fonts/Geist-Regular.ttf');
  const geistSemiBold = require('../../assets/fonts/Geist-SemiBold.ttf');
  const geistBold = require('../../assets/fonts/Geist-Bold.ttf');

  const fonts: Record<string, number> = {
    [getFontFamily(ThemeFont.Geist)]: geistRegular,
    [getSemiBoldFontFamily(ThemeFont.Geist)]: geistSemiBold,
    [getBoldFontFamily(ThemeFont.Geist)]: geistBold,
  };

  for (const [fontKey, faces] of Object.entries(GOOGLE_FONT_ASSETS)) {
    const font = fontKey as ThemeFont;
    fonts[getFontFamily(font)] = faces.regular;
    fonts[getSemiBoldFontFamily(font)] = faces.semiBold;
    fonts[getBoldFontFamily(font)] = faces.bold;
  }

  await loadAsync(fonts);
}
