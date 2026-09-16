import { ColorsProvider, useColors } from 'my-module';
import {
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
    setPrimary,
    setSecondary,
    resetColors,
    setBorderWidth,
    setBorderRadius,
    resetBorders,
  } = useColors();

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.primary }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.secondary }]}>Theme</Text>
        <Text style={[styles.subtitle, { color: colors.accent }]}>
          Colors, border width, and radius — saved on device.
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
          ]}>
          <Text style={[styles.previewText, { color: colors.secondary }]}>
            Preview · width {borders.borderWidth} · radius {borders.borderRadius}
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
  },
  previewText: {
    fontSize: 14,
    fontWeight: '600',
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
