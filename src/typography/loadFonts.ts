import { loadAsync } from 'expo-font';

import { ThemeFont } from './fontTypes';

/**
 * Load bundled Minimal UI fonts. Call once at app startup (before rendering text).
 * Additional enum fonts can be wired here when their assets are added.
 */
export async function loadMinimalUIFonts(): Promise<void> {
  await loadAsync({
    [ThemeFont.Geist]: require('../../assets/fonts/Geist-Regular.ttf'),
  });
}
