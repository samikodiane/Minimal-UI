import { useState } from 'react';
import {
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import { useColors } from '../../colors/ColorsProvider';
import { ACCENT_OPACITY, colorWithOpacity } from '../../colors/colorUtils';
import {
  PRIMARY_TEXT_SIZE,
  SECONDARY_TEXT_SIZE,
} from '../../typography/textUtils';
import { MainText } from '../MainText';

export type MainTextFieldProps = {
  /**
   * When true, shows the label above the input.
   * Defaults to false (label hidden).
   */
  showLabel?: boolean;
  /** Label copy (secondary text style). Only visible when `showLabel` is true. */
  labelText?: string;
  /** Hint / placeholder copy (same style as the label). */
  hintText?: string;
  /** Initial text when the field is uncontrolled. */
  defaultText?: string;
  /** Controlled value. When set, overrides `defaultText`. */
  value?: string;
  /** Called whenever the typed text changes (add or remove characters). */
  onChangeText?: (text: string) => void;
  /** Called when the keyboard submit / return key is pressed. */
  onSubmit?: (text: string) => void;
  /**
   * When true, the field cannot be edited.
   * Defaults to false.
   */
  readOnly?: boolean;
  /**
   * When true, focuses the field on mount and opens the keyboard.
   * Defaults to false.
   */
  autoFocus?: boolean;
  /**
   * When true, label and input use inverted MainText colors
   * (for dark / filled surfaces). Defaults to false.
   */
  inverted?: boolean;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
} & Omit<
  TextInputProps,
  | 'value'
  | 'defaultValue'
  | 'onChangeText'
  | 'onSubmitEditing'
  | 'placeholder'
  | 'placeholderTextColor'
  | 'style'
  | 'editable'
  | 'autoFocus'
  | 'readOnly'
>;

/**
 * Themed text field: transparent fill, theme font, secondary-style label/hint,
 * primary-style typed value. Use `inverted` on dark surfaces.
 */
export function MainTextField({
  showLabel = false,
  labelText,
  hintText,
  defaultText = '',
  value: valueProp,
  onChangeText,
  onSubmit,
  readOnly = false,
  autoFocus = false,
  inverted = false,
  style,
  inputStyle,
  ...textInputProps
}: MainTextFieldProps) {
  const { colors, font } = useColors();
  const [internalValue, setInternalValue] = useState(defaultText);
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : internalValue;
  const isEmpty = value.length === 0;

  const labelColor = inverted
    ? colorWithOpacity(colors.primary, ACCENT_OPACITY)
    : colors.accent;
  const valueColor = inverted ? colors.primary : colors.secondary;

  const handleChangeText = (next: string) => {
    if (readOnly) {
      return;
    }
    if (!isControlled) {
      setInternalValue(next);
    }
    onChangeText?.(next);
  };

  return (
    <View style={[{ backgroundColor: 'transparent', gap: 4 }, style]}>
      {showLabel && labelText ? (
        <MainText variant="secondary" inverted={inverted}>
          {labelText}
        </MainText>
      ) : null}
      <TextInput
        {...textInputProps}
        value={value}
        onChangeText={handleChangeText}
        onSubmitEditing={() => onSubmit?.(value)}
        placeholder={hintText}
        placeholderTextColor={labelColor}
        editable={!readOnly}
        autoFocus={autoFocus}
        cursorColor={valueColor}
        selectionColor={labelColor}
        underlineColorAndroid="transparent"
        style={[
          {
            backgroundColor: 'transparent',
            // Empty field uses secondary face/size so the hint matches the label.
            fontFamily: isEmpty ? font.semiBoldFamily : font.boldFamily,
            fontSize: isEmpty ? SECONDARY_TEXT_SIZE : PRIMARY_TEXT_SIZE,
            fontWeight: 'normal',
            color: valueColor,
            paddingVertical: 4,
            paddingHorizontal: 0,
            margin: 0,
          },
          inputStyle,
        ]}
      />
    </View>
  );
}
