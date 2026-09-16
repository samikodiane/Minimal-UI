import { useState } from 'react';
import {
  Switch,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { useColors } from '../../colors/ColorsProvider';
import { ACCENT_OPACITY, colorWithOpacity } from '../../colors/colorUtils';

export type MainSwitchProps = {
  /**
   * Initial active state when the component mounts.
   * Defaults to false.
   */
  active?: boolean;
  /** Called when the switch is toggled on. */
  onToggleOn?: () => void;
  /** Called when the switch is toggled off. */
  onToggleOff?: () => void;
  /**
   * When true, uses inverted track/thumb colors (for dark / filled surfaces).
   * Defaults to false.
   */
  inverted?: boolean;
  /** When true, the switch cannot be toggled. Defaults to false. */
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

/**
 * Themed switch.
 * Normal: accent track (off) / secondary track (on), primary thumb.
 * Inverted: primary@60% track (off) / primary track (on), primary thumb.
 */
export function MainSwitch({
  active: initialActive = false,
  onToggleOn,
  onToggleOff,
  inverted = false,
  disabled = false,
  style,
}: MainSwitchProps) {
  const { colors } = useColors();
  const [active, setActive] = useState(initialActive);

  const trackOff = inverted
    ? colorWithOpacity(colors.primary, ACCENT_OPACITY)
    : colors.accent;
  const trackOn = inverted ? colors.primary : colors.secondary;
  const thumb = colors.primary;

  const handleChange = (next: boolean) => {
    setActive(next);
    if (next) {
      onToggleOn?.();
    } else {
      onToggleOff?.();
    }
  };

  return (
    <Switch
      value={active}
      onValueChange={handleChange}
      disabled={disabled}
      trackColor={{ false: trackOff, true: trackOn }}
      thumbColor={thumb}
      // react-native-web uses activeThumbColor when on; defaults to teal (#009688).
      {...({ activeThumbColor: thumb } as object)}
      ios_backgroundColor={trackOff}
      style={style}
    />
  );
}
