import { loadAsync, type FontSource } from 'expo-font';

import {
  FONTSOURCE_IDS,
  getBoldFontFamily,
  getFontFamily,
  getFontsourceUrl,
  getSemiBoldFontFamily,
  ThemeFont,
} from './fontTypes';

async function loadFontEntry(
  family: string,
  source: FontSource,
  fallback?: FontSource
): Promise<void> {
  try {
    await loadAsync({ [family]: source });
  } catch {
    if (fallback) {
      try {
        await loadAsync({ [family]: fallback });
      } catch {
        // Ignore missing weights for display-only fonts.
      }
    }
  }
}

/**
 * Load all theme fonts. Call once at app startup (before rendering text).
 * Geist is bundled; the rest load from Fontsource CDN.
 */
export async function loadMinimalUIFonts(): Promise<void> {
  const geistRegular = require('../../assets/fonts/Geist-Regular.ttf');
  const geistSemiBold = require('../../assets/fonts/Geist-SemiBold.ttf');
  const geistBold = require('../../assets/fonts/Geist-Bold.ttf');

  await loadFontEntry(getFontFamily(ThemeFont.Geist), geistRegular);
  await loadFontEntry(getSemiBoldFontFamily(ThemeFont.Geist), geistSemiBold, geistRegular);
  await loadFontEntry(getBoldFontFamily(ThemeFont.Geist), geistBold, geistRegular);

  for (const [fontKey, fontId] of Object.entries(FONTSOURCE_IDS)) {
    const font = fontKey as ThemeFont;
    const regular = { uri: getFontsourceUrl(fontId, 400) };

    await loadFontEntry(getFontFamily(font), regular);
    await loadFontEntry(getSemiBoldFontFamily(font), {
      uri: getFontsourceUrl(fontId, 600),
    }, regular);
    await loadFontEntry(getBoldFontFamily(font), {
      uri: getFontsourceUrl(fontId, 700),
    }, regular);
  }
}
