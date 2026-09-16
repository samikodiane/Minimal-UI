import type { ReactNode } from 'react';
import { Text, type StyleProp, type TextStyle } from 'react-native';

import { useColors } from '../../colors/ColorsProvider';
import { ACCENT_OPACITY, colorWithOpacity } from '../../colors/colorUtils';
import {
  PRIMARY_TEXT_SIZE,
  PRIMARY_TEXT_WEIGHT,
  SECONDARY_TEXT_SIZE,
  SECONDARY_TEXT_WEIGHT,
  type MainTextVariant,
} from '../../typography/textUtils';

export type MainTextProps = {
  children?: ReactNode;
  /**
   * Primary: secondary color, bold, default 16px.
   * Secondary: accent color, semi-bold, default 14px.
   */
  variant?: MainTextVariant;
  /** Override font size. When omitted, uses the variant default. */
  size?: number;
  /** Underline the text. */
  underline?: boolean;
  /** Strikethrough (line-through) the text. */
  stroke?: boolean;
  /** Italicize the text. */
  italic?: boolean;
  /**
   * When true, use light text for dark/filled surfaces:
   * primary → theme primary color; secondary → primary at 60% opacity.
   */
  inverted?: boolean;
  style?: StyleProp<TextStyle>;
};

/**
 * Themed text using the active theme font.
 * Primary: secondary color, bold (or primary when inverted).
 * Secondary: accent color, semi-bold (or primary @ 60% when inverted).
 */
export function MainText({
  children,
  variant = 'primary',
  size,
  underline = false,
  stroke = false,
  italic = false,
  inverted = false,
  style,
}: MainTextProps) {
  const { colors, font } = useColors();

  const isPrimary = variant === 'primary';
  const fontSize = size ?? (isPrimary ? PRIMARY_TEXT_SIZE : SECONDARY_TEXT_SIZE);

  let textDecorationLine: TextStyle['textDecorationLine'] = 'none';
  if (underline && stroke) {
    textDecorationLine = 'underline line-through';
  } else if (underline) {
    textDecorationLine = 'underline';
  } else if (stroke) {
    textDecorationLine = 'line-through';
  }

  const color = inverted
    ? isPrimary
      ? colors.primary
      : colorWithOpacity(colors.primary, ACCENT_OPACITY)
    : isPrimary
      ? colors.secondary
      : colors.accent;

  const variantStyle: TextStyle = {
    fontFamily: font.family,
    fontSize,
    color,
    fontWeight: isPrimary ? PRIMARY_TEXT_WEIGHT : SECONDARY_TEXT_WEIGHT,
    fontStyle: italic ? 'italic' : 'normal',
    textDecorationLine,
  };

  return <Text style={[variantStyle, style]}>{children}</Text>;
}
