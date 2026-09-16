import AsyncStorage from '@react-native-async-storage/async-storage';

import { clampBorderRadius, clampBorderWidth } from './shapeUtils';

const STORAGE_KEY = '@minimal-ui/colors';

export type StoredTheme = {
  primary: string;
  secondary: string;
  borderWidth: number;
  borderRadius: number;
};

export async function loadStoredTheme(): Promise<Partial<StoredTheme> | null> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as Partial<StoredTheme>;
    const result: Partial<StoredTheme> = {};

    if (typeof parsed.primary === 'string') {
      result.primary = parsed.primary;
    }
    if (typeof parsed.secondary === 'string') {
      result.secondary = parsed.secondary;
    }
    if (typeof parsed.borderWidth === 'number') {
      result.borderWidth = clampBorderWidth(parsed.borderWidth);
    }
    if (typeof parsed.borderRadius === 'number') {
      result.borderRadius = clampBorderRadius(parsed.borderRadius);
    }

    return Object.keys(result).length > 0 ? result : null;
  } catch {
    return null;
  }
}

export async function saveStoredTheme(theme: StoredTheme): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
  } catch {
    // Ignore storage failures so UI updates still work offline / in restricted envs.
  }
}
