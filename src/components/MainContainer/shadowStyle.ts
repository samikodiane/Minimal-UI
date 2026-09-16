import { Platform, type ViewStyle } from 'react-native';

import type { ThemeColors, ThemeShadows } from '../../colors/types';

function supportsNativeBoxShadow(): boolean {
  if (Platform.OS === 'web') {
    return true;
  }

  // boxShadow requires New Architecture (Expo Go always enables it).
  const globalScope = globalThis as {
    RN$Bridgeless?: boolean;
    nativeFabricUIManager?: unknown;
  };

  return (
    globalScope.RN$Bridgeless === true ||
    globalScope.nativeFabricUIManager != null
  );
}

function getBoxShadowValue(shadows: ThemeShadows): string {
  return `${shadows.offsetX}px ${shadows.offsetY}px ${shadows.blur}px ${shadows.spread}px ${shadows.color}`;
}

/**
 * Legacy Android elevation approximation when New Architecture is off.
 */
function getAndroidElevation(shadows: ThemeShadows): number {
  const offsetMag = Math.hypot(shadows.offsetX, shadows.offsetY);
  const intensity =
    shadows.blur * 0.75 +
    shadows.spread * 1.5 +
    offsetMag * 0.5 +
    2;

  return Math.max(1, Math.round(intensity * (shadows.opacity / 100)));
}

/**
 * Map theme shadow tokens to platform styles.
 * Prefer cross-platform `boxShadow` (New Architecture / web).
 * Fall back to iOS shadow* + Android elevation on Old Architecture.
 */
export function getShadowStyle(
  colors: ThemeColors,
  shadows: ThemeShadows
): ViewStyle {
  if (shadows.opacity <= 0) {
    return supportsNativeBoxShadow()
      ? ({ boxShadow: 'none' } as ViewStyle)
      : {
          shadowColor: colors.secondary,
          shadowOpacity: 0,
          shadowRadius: 0,
          shadowOffset: { width: 0, height: 0 },
          elevation: 0,
        };
  }

  if (supportsNativeBoxShadow()) {
    return {
      boxShadow: getBoxShadowValue(shadows),
    } as ViewStyle;
  }

  return {
    shadowColor: colors.secondary,
    shadowOpacity: shadows.opacity / 100,
    shadowRadius: Math.max(shadows.blur, 0.5),
    shadowOffset: {
      width: shadows.offsetX,
      height: shadows.offsetY,
    },
    elevation: Platform.OS === 'android' ? getAndroidElevation(shadows) : 0,
  };
}
