import { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  Animated,
  PanResponder,
  View,
  type GestureResponderEvent,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { useColors } from '../../colors/ColorsProvider';
import { ACCENT_OPACITY, colorWithOpacity } from '../../colors/colorUtils';

const DEFAULT_TRACK_HEIGHT = 10;
const DEFAULT_THUMB_SIZE = 24;
const TOUCH_AREA_HEIGHT = 44;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export type MainSliderProps = {
  /** Current value. */
  value: number;
  /** Minimum value. Defaults to 0. */
  minimumValue?: number;
  /** Maximum value. Defaults to 1. */
  maximumValue?: number;
  /**
   * Called when the value changes.
   * By default only fires when the gesture ends (smooth dragging).
   * Set `liveUpdate` to receive updates while dragging.
   */
  onValueChange?: (value: number) => void;
  /** Called when the user releases the slider. */
  onSlidingComplete?: (value: number) => void;
  /**
   * When true, `onValueChange` fires while dragging (may re-render parents).
   * Defaults to false for smooth thumb movement.
   */
  liveUpdate?: boolean;
  /** Track thickness. Defaults to 10. */
  trackHeight?: number;
  /** Thumb diameter when visible. Defaults to 24. */
  thumbSize?: number;
  /**
   * When true, the thumb is invisible but the track stays draggable.
   * Defaults to false.
   */
  hideThumb?: boolean;
  /**
   * When true, uses inverted colors (for dark / filled surfaces).
   * Defaults to false.
   */
  inverted?: boolean;
  /** When true, ignores gestures. Defaults to false. */
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

/**
 * Custom themed slider with controllable track/thumb thickness.
 * Visual position updates on the UI via Animated; parent state commits on release
 * unless `liveUpdate` is enabled.
 */
export function MainSlider({
  value,
  minimumValue = 0,
  maximumValue = 1,
  onValueChange,
  onSlidingComplete,
  liveUpdate = false,
  trackHeight = DEFAULT_TRACK_HEIGHT,
  thumbSize = DEFAULT_THUMB_SIZE,
  hideThumb = false,
  inverted = false,
  disabled = false,
  style,
}: MainSliderProps) {
  const { colors } = useColors();
  const trackWidthRef = useRef(0);
  const trackPageX = useRef(0);
  const trackRef = useRef<View>(null);
  const dragging = useRef(false);
  const latestValue = useRef(value);
  const liveRaf = useRef<number | null>(null);

  const onValueChangeRef = useRef(onValueChange);
  const onSlidingCompleteRef = useRef(onSlidingComplete);
  const liveUpdateRef = useRef(liveUpdate);
  onValueChangeRef.current = onValueChange;
  onSlidingCompleteRef.current = onSlidingComplete;
  liveUpdateRef.current = liveUpdate;

  const range = maximumValue - minimumValue || 1;
  const ratioFromValue = (next: number) =>
    clamp((next - minimumValue) / range, 0, 1);

  const ratioAnim = useRef(new Animated.Value(ratioFromValue(value))).current;
  const trackWidthAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    latestValue.current = value;
    if (!dragging.current) {
      ratioAnim.setValue(ratioFromValue(value));
    }
  }, [value, minimumValue, range, ratioAnim]);

  useEffect(() => {
    return () => {
      if (liveRaf.current != null) {
        cancelAnimationFrame(liveRaf.current);
      }
    };
  }, []);

  const fillColor = inverted ? colors.primary : colors.secondary;
  const restColor = inverted
    ? colorWithOpacity(colors.primary, ACCENT_OPACITY)
    : colors.accent;
  const thumbColor = hideThumb
    ? 'transparent'
    : inverted
      ? colors.primary
      : colors.secondary;

  const commitLiveValue = useCallback((next: number) => {
    latestValue.current = next;
    if (!liveUpdateRef.current) {
      return;
    }
    if (liveRaf.current != null) {
      return;
    }
    liveRaf.current = requestAnimationFrame(() => {
      liveRaf.current = null;
      onValueChangeRef.current?.(latestValue.current);
    });
  }, []);

  const setFromPageX = useCallback(
    (pageX: number) => {
      const width = trackWidthRef.current;
      if (width <= 0 || disabled) {
        return;
      }
      const nextRatio = clamp((pageX - trackPageX.current) / width, 0, 1);
      ratioAnim.setValue(nextRatio);
      commitLiveValue(minimumValue + nextRatio * range);
    },
    [commitLiveValue, disabled, minimumValue, range, ratioAnim]
  );

  const finishGesture = useCallback(() => {
    dragging.current = false;
    if (liveRaf.current != null) {
      cancelAnimationFrame(liveRaf.current);
      liveRaf.current = null;
    }
    onValueChangeRef.current?.(latestValue.current);
    onSlidingCompleteRef.current?.(latestValue.current);
  }, []);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => !disabled,
        onMoveShouldSetPanResponder: () => !disabled,
        onPanResponderTerminationRequest: () => false,
        onPanResponderGrant: (event: GestureResponderEvent) => {
          dragging.current = true;
          const pageX = event.nativeEvent.pageX;
          trackRef.current?.measureInWindow((x) => {
            trackPageX.current = x;
            setFromPageX(pageX);
          });
        },
        onPanResponderMove: (event: GestureResponderEvent) => {
          setFromPageX(event.nativeEvent.pageX);
        },
        onPanResponderRelease: finishGesture,
        onPanResponderTerminate: finishGesture,
      }),
    [disabled, finishGesture, setFromPageX]
  );

  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    trackWidthRef.current = width;
    trackWidthAnim.setValue(Math.max(width, 1));
    trackRef.current?.measureInWindow((x) => {
      trackPageX.current = x;
    });
  };

  const fillWidth = Animated.multiply(ratioAnim, trackWidthAnim);
  const thumbTravel = Animated.subtract(trackWidthAnim, thumbSize);
  const thumbLeft = Animated.multiply(ratioAnim, thumbTravel);

  return (
    <View
      ref={trackRef}
      style={[
        {
          height: TOUCH_AREA_HEIGHT,
          justifyContent: 'center',
          opacity: disabled ? 0.5 : 1,
          width: '100%',
        },
        style,
      ]}
      onLayout={onLayout}
      {...panResponder.panHandlers}>
      <View
        style={{
          height: trackHeight,
          borderRadius: trackHeight / 2,
          backgroundColor: restColor,
          overflow: 'hidden',
          width: '100%',
        }}>
        <Animated.View
          style={{
            height: trackHeight,
            width: fillWidth,
            backgroundColor: fillColor,
            borderRadius: trackHeight / 2,
          }}
        />
      </View>

      <Animated.View
        pointerEvents="none"
        style={{
          position: 'absolute',
          left: thumbLeft,
          width: thumbSize,
          height: thumbSize,
          borderRadius: thumbSize / 2,
          backgroundColor: thumbColor,
          opacity: hideThumb ? 0 : 1,
        }}
      />
    </View>
  );
}
