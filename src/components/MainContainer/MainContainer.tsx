import type { ReactNode } from 'react';
import {
  Pressable,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { useColors } from '../../colors/ColorsProvider';
import { getShadowStyle } from './shadowStyle';

const DEFAULT_PADDING = 16;
const MIN_SIZE = 25;

export type MainContainerProps = {
  children?: ReactNode;
  /** Optional fixed width. */
  width?: number | string;
  /** Optional fixed height. */
  height?: number | string;
  /**
   * Corner radius override.
   * When omitted, uses theme `borders.borderRadius`.
   */
  radius?: number;
  /**
   * When true, hides the border (width 0), matching Flutter `overrideBorder`.
   */
  overrideBorder?: boolean;
  /**
   * When true, fill with secondary instead of primary.
   * Border width/color are unchanged.
   */
  filled?: boolean;
  /** Inner padding. Defaults to 16. */
  padding?: number;
  /** When set, the container is pressable (card / button). */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

/**
 * Themed container that reads colors, borders, and shadows from the theme.
 * Use as a card, surface, or button (with `onPress`).
 */
export function MainContainer({
  children,
  width,
  height,
  radius,
  overrideBorder = false,
  filled = false,
  padding = DEFAULT_PADDING,
  onPress,
  style,
}: MainContainerProps) {
  const { colors, borders, shadows } = useColors();

  const borderWidth = overrideBorder ? 0 : borders.borderWidth;
  const borderRadius = radius ?? borders.borderRadius;

  const containerStyle: StyleProp<ViewStyle> = [
    {
      backgroundColor: filled ? colors.secondary : colors.primary,
      borderRadius,
      borderWidth,
      borderColor: borderWidth === 0 ? 'transparent' : colors.secondary,
      minWidth: MIN_SIZE,
      minHeight: MIN_SIZE,
      width: width as ViewStyle['width'],
      height: height as ViewStyle['height'],
      padding,
      alignItems: 'center',
      justifyContent: 'center',
    },
    getShadowStyle(colors, shadows),
    style,
  ];

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={containerStyle}>
        {children}
      </Pressable>
    );
  }

  return <View style={containerStyle}>{children}</View>;
}
