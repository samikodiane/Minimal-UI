import type { ReactNode } from 'react';
import {
  Platform,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useColors } from '../../colors/ColorsProvider';
import { MainIcon } from '../MainIcon';
import { MainText } from '../MainText';

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'center'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export const DEFAULT_TOAST_DURATION = 2200;
export const DEFAULT_TOAST_POSITION: ToastPosition = 'top-center';

/** Horizontal margin from the screen edge on native (plus safe-area). */
const MOBILE_SIDE_INSET = 24;
/** Soft side inset on web so edge positions aren’t flush. */
const WEB_SIDE_INSET = 24;
/** Slightly wider chip on web so short messages don’t look stubby. */
const WEB_CHIP_MIN_WIDTH = 320;
const WEB_CHIP_PADDING_H = 20;

type EdgeInsets = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type MainToastProps = {
  /** Primary message (MainText primary). */
  message: string;
  /** Optional subtitle under the message (MainText secondary). */
  secondaryText?: string;
  /**
   * Optional icon before the text. Pass a host icon element
   * (e.g. from `@expo/vector-icons`); wrapped with `MainIcon`.
   */
  icon?: ReactNode;
  /** Screen placement. Defaults to `top-center`. */
  position?: ToastPosition;
  /**
   * Default: secondary fill, no border, light text/icons.
   * Inverted: primary fill, secondary border, dark text/icons.
   */
  inverted?: boolean;
  /** When false, renders nothing. Defaults to true. */
  visible?: boolean;
  style?: StyleProp<ViewStyle>;
};

const isWeb = Platform.OS === 'web';

/**
 * In-app themed toast chip (not a system notification).
 * Native: full width minus 24px sides; vertical offset is safe-area only.
 * Web: content-sized with a modest min width (not full viewport).
 * Prefer `ToastProvider` + `useToast()` for imperative shows.
 */
export function MainToast({
  message,
  secondaryText,
  icon,
  position = DEFAULT_TOAST_POSITION,
  inverted = false,
  visible = true,
  style,
}: MainToastProps) {
  const { colors, borders } = useColors();
  const insets = useSafeAreaInsets();

  if (!visible) {
    return null;
  }

  const textInverted = !inverted;
  const iconInverted = inverted;
  const backgroundColor = inverted ? colors.primary : colors.secondary;
  const borderWidth = inverted ? borders.borderWidth : 0;
  const borderColor = inverted ? colors.secondary : 'transparent';

  return (
    <View
      pointerEvents="none"
      style={[styles.host, positionStyle(position, insets)]}>
      <View
        style={[
          styles.chip,
          isWeb ? styles.chipWeb : styles.chipNative,
          {
            backgroundColor,
            borderRadius: borders.borderRadius,
            borderWidth,
            borderColor,
          },
          style,
        ]}>
        {icon != null ? (
          <MainIcon variant="primary" inverted={iconInverted}>
            {icon}
          </MainIcon>
        ) : null}
        <View style={styles.textCol}>
          <MainText variant="primary" inverted={textInverted}>
            {message}
          </MainText>
          {secondaryText ? (
            <MainText variant="secondary" inverted={textInverted}>
              {secondaryText}
            </MainText>
          ) : null}
        </View>
      </View>
    </View>
  );
}

function positionStyle(
  position: ToastPosition,
  insets: EdgeInsets
): ViewStyle {
  const top = insets.top;
  const bottom = insets.bottom;
  const side = (isWeb ? WEB_SIDE_INSET : MOBILE_SIDE_INSET);
  const left = side + insets.left;
  const right = side + insets.right;

  if (!isWeb) {
    // Native: always span width; position only picks vertical band.
    const stretch: ViewStyle = {
      left,
      right,
      alignItems: 'stretch',
    };
    switch (position) {
      case 'bottom-left':
      case 'bottom-right':
      case 'bottom-center':
        return { ...stretch, bottom };
      case 'center':
        return {
          ...stretch,
          top,
          bottom,
          justifyContent: 'center',
        };
      case 'top-left':
      case 'top-right':
      case 'top-center':
      default:
        return { ...stretch, top };
    }
  }

  switch (position) {
    case 'top-left':
      return { top, left, alignItems: 'flex-start' };
    case 'top-right':
      return { top, right, alignItems: 'flex-end' };
    case 'top-center':
      return { top, left, right, alignItems: 'center' };
    case 'center':
      return {
        top,
        left,
        right,
        bottom,
        justifyContent: 'center',
        alignItems: 'center',
      };
    case 'bottom-left':
      return { bottom, left, alignItems: 'flex-start' };
    case 'bottom-right':
      return { bottom, right, alignItems: 'flex-end' };
    case 'bottom-center':
      return { bottom, left, right, alignItems: 'center' };
    default:
      return { top, left, right, alignItems: 'center' };
  }
}

const styles = {
  host: {
    position: 'absolute',
    zIndex: 1000,
    elevation: 1000,
  } as ViewStyle,
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    maxWidth: '100%',
  } as ViewStyle,
  chipNative: {
    alignSelf: 'stretch',
    width: '100%',
  } as ViewStyle,
  chipWeb: {
    minWidth: WEB_CHIP_MIN_WIDTH,
    paddingHorizontal: WEB_CHIP_PADDING_H,
  } as ViewStyle,
  textCol: {
    flexShrink: 1,
    gap: 2,
  } as ViewStyle,
};
