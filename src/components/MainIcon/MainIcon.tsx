import {
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';

import { useColors } from '../../colors/ColorsProvider';
import { ACCENT_OPACITY, colorWithOpacity } from '../../colors/colorUtils';

export type MainIconVariant = 'primary' | 'secondary';

/** Default size for `variant="primary"`. */
export const PRIMARY_ICON_SIZE = 24;
/** Default size for `variant="secondary"`. */
export const SECONDARY_ICON_SIZE = 16;

type IconElementProps = {
  color?: string;
  size?: number;
};

export type MainIconProps = {
  /**
   * Icon element from the host app (e.g. `@expo/vector-icons`).
   * Prefer this or `children` — not both; `icon` wins if both are set.
   */
  icon?: ReactNode;
  /** Icon element (same as `icon`). */
  children?: ReactNode;
  /**
   * Primary: theme primary color @ 24px (unless `size` set).
   * Secondary: accent @ 16px (unless `size` set).
   */
  variant?: MainIconVariant;
  /** Override default size for the active variant. */
  size?: number;
  /**
   * When true, flips colors for dark / filled surfaces:
   * primary → secondary; secondary → primary @ 60% opacity.
   */
  inverted?: boolean;
  style?: StyleProp<ViewStyle>;
};

/**
 * Themed icon wrapper. Pass any icon element as `children` / `icon`;
 * color and size are injected from the theme.
 */
export function MainIcon({
  icon,
  children,
  variant = 'primary',
  size,
  inverted = false,
  style,
}: MainIconProps) {
  const { colors } = useColors();
  const isPrimary = variant === 'primary';
  const resolvedSize =
    size ?? (isPrimary ? PRIMARY_ICON_SIZE : SECONDARY_ICON_SIZE);

  const color = inverted
    ? isPrimary
      ? colors.secondary
      : colorWithOpacity(colors.primary, ACCENT_OPACITY)
    : isPrimary
      ? colors.primary
      : colors.accent;

  const content = icon ?? children;
  if (!isValidElement(content)) {
    return null;
  }

  const child = content as ReactElement<IconElementProps>;

  return (
    <View style={style} accessibilityRole="image">
      {cloneElement(child, {
        color,
        size: resolvedSize,
      })}
    </View>
  );
}
