import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@minimal-ui/colors';

export type StoredColors = {
  primary: string;
  secondary: string;
};

export async function loadStoredColors(): Promise<StoredColors | null> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as Partial<StoredColors>;
    if (
      typeof parsed.primary !== 'string' ||
      typeof parsed.secondary !== 'string'
    ) {
      return null;
    }

    return {
      primary: parsed.primary,
      secondary: parsed.secondary,
    };
  } catch {
    return null;
  }
}

export async function saveStoredColors(colors: StoredColors): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(colors));
  } catch {
    // Ignore storage failures so UI updates still work offline / in restricted envs.
  }
}

export async function clearStoredColors(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage failures.
  }
}
