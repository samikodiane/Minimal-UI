import { Platform, type ViewStyle } from 'react-native';

import type { ThemeColors, ThemeShadows } from '../../colors/types';

/**
 * Map theme shadow tokens to platform styles.
 * Web supports full box-shadow; iOS uses shadow*; Android approximates with elevation.
 */
export function getShadowStyle(
  colors: ThemeColors,
  shadows: ThemeShadows
): ViewStyle {
  if (Platform.OS === 'web') {
    return {
      boxShadow: `${shadows.offsetX}px ${shadows.offsetY}px ${shadows.blur}px ${shadows.spread}px ${shadows.color}`,
    } as ViewStyle;
  }

  return {
    shadowColor: colors.secondary,
    shadowOpacity: shadows.opacity / 100,
    shadowRadius: shadows.blur,
    shadowOffset: {
      width: shadows.offsetX,
      height: shadows.offsetY,
    },
    elevation: Math.round(shadows.blur / 2),
  };
}
