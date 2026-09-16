import { useState, type ReactNode } from 'react';
import {
  Pressable,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { useColors } from '../../colors/ColorsProvider';
import { ACCENT_OPACITY, colorWithOpacity } from '../../colors/colorUtils';
import { SECONDARY_TEXT_SIZE } from '../../typography/textUtils';
import { MainText } from '../MainText';

const BOX_SIZE = 22;

export type MainCheckItemProps = {
  /** Label next to the checkbox. Prefer this over `children`. */
  text?: string;
  /** Label next to the checkbox (fallback if `text` is omitted). */
  children?: ReactNode;
  /**
   * Initial checked state when the component mounts.
   * Defaults to false.
   */
  checked?: boolean;
  /** Called when the checkbox is toggled on. */
  onToggleOn?: () => void;
  /** Called when the checkbox is toggled off. */
  onToggleOff?: () => void;
  /**
   * When true, uses inverted colors (for dark / filled surfaces).
   * Defaults to false.
   */
  inverted?: boolean;
  style?: StyleProp<ViewStyle>;
};

/**
 * Checkbox + MainText row.
 * Unchecked: accent outline, primary text at secondary size.
 * Checked: secondary fill with primary check, accent stroked text.
 * Inverted: primary fill, secondary check icon, primary@60% outline.
 */
export function MainCheckItem({
  text,
  children,
  checked: initialChecked = false,
  onToggleOn,
  onToggleOff,
  inverted = false,
  style,
}: MainCheckItemProps) {
  const { colors } = useColors();
  const [checked, setChecked] = useState(initialChecked);
  const label = text ?? children;

  const outlineColor = inverted
    ? colorWithOpacity(colors.primary, ACCENT_OPACITY)
    : colors.accent;
  const boxFill = inverted ? colors.primary : colors.secondary;
  const checkIconColor = inverted ? colors.secondary : colors.primary;

  const toggle = () => {
    const next = !checked;
    setChecked(next);
    if (next) {
      onToggleOn?.();
    } else {
      onToggleOff?.();
    }
  };

  return (
    <Pressable
      onPress={toggle}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          backgroundColor: 'transparent',
        },
        style,
      ]}>
      <View
        style={{
          width: BOX_SIZE,
          height: BOX_SIZE,
          borderRadius: 4,
          borderWidth: checked ? 0 : 2,
          borderColor: outlineColor,
          backgroundColor: checked ? boxFill : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {checked ? (
          <MainText
            variant="primary"
            size={14}
            style={{ color: checkIconColor, lineHeight: 16 }}>
            ✓
          </MainText>
        ) : null}
      </View>

      <View style={{ flex: 1 }}>
        <MainText
          variant={checked ? 'secondary' : 'primary'}
          size={SECONDARY_TEXT_SIZE}
          stroke={checked}
          inverted={inverted}>
          {label}
        </MainText>
      </View>
    </Pressable>
  );
}
