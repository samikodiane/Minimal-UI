import { ColorsProvider, useColors } from 'my-module';
import {
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function App() {
  return (
    <ColorsProvider>
      <ThemeDemo />
    </ColorsProvider>
  );
}

function ThemeDemo() {
  const {
    colors,
    borders,
    shadows,
    setPrimary,
    setSecondary,
    resetColors,
    setBorderWidth,
    setBorderRadius,
    resetBorders,
    setShadowOpacity,
    setShadowBlur,
    setShadowSpread,
    setShadowOffsetX,
    setShadowOffsetY,
    resetShadows,
  } = useColors();

  const previewShadow =
    Platform.OS === 'web'
      ? {
          boxShadow: `${shadows.offsetX}px ${shadows.offsetY}px ${shadows.blur}px ${shadows.spread}px ${shadows.color}`,
        }
      : {
          shadowColor: colors.secondary,
          shadowOpacity: shadows.opacity / 100,
          shadowRadius: shadows.blur,
          shadowOffset: { width: shadows.offsetX, height: shadows.offsetY },
          elevation: Math.round(shadows.blur / 2),
        };

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.primary }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.secondary }]}>Theme</Text>
        <Text style={[styles.subtitle, { color: colors.accent }]}>
          Colors, borders, and shadows — saved on device.
        </Text>

        <View style={styles.row}>
          <Swatch label="Primary" color={colors.primary} border={colors.secondary} />
          <Swatch label="Secondary" color={colors.secondary} border={colors.secondary} />
          <Swatch label="Accent" color={colors.accent} border={colors.secondary} />
        </View>

        <View
          style={[
            styles.preview,
            {
              backgroundColor: colors.primary,
              borderColor: colors.secondary,
              borderWidth: borders.borderWidth,
              borderRadius: borders.borderRadius,
            },
            previewShadow,
          ]}>
          <Text style={[styles.previewText, { color: colors.secondary }]}>
            Preview · w {borders.borderWidth} · r {borders.borderRadius}
          </Text>
          <Text style={[styles.previewMeta, { color: colors.accent }]}>
            shadow op {shadows.opacity} · blur {shadows.blur} · spread{' '}
            {shadows.spread} · x {shadows.offsetX} · y {shadows.offsetY}
          </Text>
        </View>

        <Text style={[styles.section, { color: colors.secondary }]}>Colors</Text>
        <View style={styles.actions}>
          <Action
            label="Primary → white"
            onPress={() => setPrimary('#FFFFFF')}
            colors={colors}
            borders={borders}
          />
          <Action
            label="Primary → light gray"
            onPress={() => setPrimary('#F0F0F0')}
            colors={colors}
            borders={borders}
          />
          <Action
            label="Secondary → black"
            onPress={() => setSecondary('#000000')}
            colors={colors}
            borders={borders}
          />
          <Action
            label="Secondary → navy"
            onPress={() => setSecondary('#001F3F')}
            colors={colors}
            borders={borders}
          />
          <Action
            label="Secondary → crimson"
            onPress={() => setSecondary('#DC143C')}
            colors={colors}
            borders={borders}
          />
          <Action
            label="Reset colors"
            onPress={resetColors}
            colors={colors}
            borders={borders}
          />
        </View>

        <Text style={[styles.section, { color: colors.secondary }]}>Borders</Text>
        <View style={styles.actions}>
          <Action
            label="Width → 0"
            onPress={() => setBorderWidth(0)}
            colors={colors}
            borders={borders}
          />
          <Action
            label="Width → 2 (default)"
            onPress={() => setBorderWidth(2)}
            colors={colors}
            borders={borders}
          />
          <Action
            label="Width → 3 (max)"
            onPress={() => setBorderWidth(3)}
            colors={colors}
            borders={borders}
          />
          <Action
            label="Radius → 0"
            onPress={() => setBorderRadius(0)}
            colors={colors}
            borders={borders}
          />
          <Action
            label="Radius → 15 (default)"
            onPress={() => setBorderRadius(15)}
            colors={colors}
            borders={borders}
          />
          <Action
            label="Radius → 999 (full)"
            onPress={() => setBorderRadius(999)}
            colors={colors}
            borders={borders}
          />
          <Action
            label="Reset borders"
            onPress={resetBorders}
            colors={colors}
            borders={borders}
          />
        </View>

        <Text style={[styles.section, { color: colors.secondary }]}>Shadows</Text>
        <View style={styles.actions}>
          <Action
            label="Opacity → 40"
            onPress={() => setShadowOpacity(40)}
            colors={colors}
            borders={borders}
          />
          <Action
            label="Opacity → 100 (max)"
            onPress={() => setShadowOpacity(100)}
            colors={colors}
            borders={borders}
          />
          <Action
            label="Blur → 12"
            onPress={() => setShadowBlur(12)}
            colors={colors}
            borders={borders}
          />
          <Action
            label="Blur → 24 (max)"
            onPress={() => setShadowBlur(24)}
            colors={colors}
            borders={borders}
          />
          <Action
            label="Spread → 4"
            onPress={() => setShadowSpread(4)}
            colors={colors}
            borders={borders}
          />
          <Action
            label="Spread → 8 (max)"
            onPress={() => setShadowSpread(8)}
            colors={colors}
            borders={borders}
          />
          <Action
            label="Offset Y → 4"
            onPress={() => setShadowOffsetY(4)}
            colors={colors}
            borders={borders}
          />
          <Action
            label="Offset X → 8"
            onPress={() => setShadowOffsetX(8)}
            colors={colors}
            borders={borders}
          />
          <Action
            label="Soft card preset"
            onPress={() => {
              setShadowOpacity(25);
              setShadowBlur(12);
              setShadowSpread(0);
              setShadowOffsetX(0);
              setShadowOffsetY(4);
            }}
            colors={colors}
            borders={borders}
          />
          <Action
            label="Reset shadows"
            onPress={resetShadows}
            colors={colors}
            borders={borders}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Swatch(props: { label: string; color: string; border: string }) {
  return (
    <View style={styles.swatchWrap}>
      <View
        style={[
          styles.swatch,
          { backgroundColor: props.color, borderColor: props.border },
        ]}
      />
      <Text style={[styles.swatchLabel, { color: props.border }]}>{props.label}</Text>
      <Text style={[styles.swatchValue, { color: props.border }]} numberOfLines={1}>
        {props.color}
      </Text>
    </View>
  );
}

function Action(props: {
  label: string;
  onPress: () => void;
  colors: { secondary: string; accent: string };
  borders: { borderWidth: number; borderRadius: number };
}) {
  return (
    <Pressable
      onPress={props.onPress}
      style={[
        styles.button,
        {
          backgroundColor: props.colors.accent,
          borderColor: props.colors.secondary,
          borderWidth: props.borders.borderWidth,
          borderRadius: props.borders.borderRadius,
        },
      ]}>
      <Text style={[styles.buttonText, { color: props.colors.secondary }]}>
        {props.label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  swatchWrap: {
    flex: 1,
  },
  swatch: {
    height: 64,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  swatchLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  swatchValue: {
    fontSize: 10,
    opacity: 0.8,
  },
  preview: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 24,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  previewText: {
    fontSize: 14,
    fontWeight: '600',
  },
  previewMeta: {
    fontSize: 11,
    marginTop: 6,
    textAlign: 'center',
  },
  section: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 8,
  },
  actions: {
    gap: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
