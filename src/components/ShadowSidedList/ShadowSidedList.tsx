import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react';
import {
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useColors } from '../../colors/ColorsProvider';
import { colorWithOpacity } from '../../colors/colorUtils';

const DEFAULT_HEIGHT = 500;
const DEFAULT_FADE_SIZE = 20;

type ScrollableChildProps = {
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export type ShadowSidedListProps = {
  /**
   * A single scrollable child (ScrollView, FlatList, SectionList, …).
   * Top/bottom content inset is applied automatically so items clear the fades at rest.
   */
  children?: ReactNode;
  /**
   * Fixed height of the list viewport.
   * Defaults to 500.
   */
  height?: number;
  /**
   * Height of the top and bottom fade bands.
   * Defaults to 20.
   */
  fadeSize?: number;
  /**
   * Extra padding inside the scroll content so items sit clear of the fades
   * until the user scrolls. Defaults to `fadeSize`.
   */
  contentInset?: number;
  /**
   * When true, fade using secondary (for dark / filled surfaces).
   * When false (default), fade using primary.
   */
  inverted?: boolean;
  style?: StyleProp<ViewStyle>;
};

/**
 * Scroll viewport with top and bottom theme-colored fades so content
 * soft-edges instead of clipping hard against the frame.
 * Pass one ScrollView / FlatList as children.
 */
export function ShadowSidedList({
  children,
  height = DEFAULT_HEIGHT,
  fadeSize = DEFAULT_FADE_SIZE,
  contentInset,
  inverted = false,
  style,
}: ShadowSidedListProps) {
  const { colors } = useColors();
  const fadeColor = inverted ? colors.secondary : colors.primary;
  const transparent = colorWithOpacity(fadeColor, 0);
  const inset = contentInset ?? fadeSize;

  const child = Children.only(children);
  const content = isValidElement(child)
    ? cloneElement(child as ReactElement<ScrollableChildProps>, {
        style: StyleSheet.flatten([
          styles.scroll,
          (child as ReactElement<ScrollableChildProps>).props.style,
        ]),
        contentContainerStyle: StyleSheet.flatten([
          {
            paddingTop: inset,
            paddingBottom: inset,
          },
          (child as ReactElement<ScrollableChildProps>).props
            .contentContainerStyle,
        ]),
      })
    : children;

  return (
    <View style={[{ height, width: '100%', overflow: 'hidden' }, style]}>
      <View style={styles.content}>{content}</View>

      <LinearGradient
        pointerEvents="none"
        colors={[fadeColor, transparent]}
        locations={[0, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={[styles.fade, styles.fadeTop, { height: fadeSize }]}
      />

      <LinearGradient
        pointerEvents="none"
        colors={[transparent, fadeColor]}
        locations={[0, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={[styles.fade, styles.fadeBottom, { height: fadeSize }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  fade: {
    position: 'absolute',
    left: 0,
    right: 0,
    width: '100%',
  },
  fadeTop: {
    top: 0,
  },
  fadeBottom: {
    bottom: 0,
  },
});
