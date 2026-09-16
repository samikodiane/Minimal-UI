import { ColorsProvider, useColors } from 'my-module';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <ColorsProvider>
      <ColorDemo />
    </ColorsProvider>
  );
}

function ColorDemo() {
  const { colors, setPrimary, setSecondary, resetColors } = useColors();

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.primary }]}>
      <Text style={[styles.title, { color: colors.secondary }]}>Colors</Text>
      <Text style={[styles.subtitle, { color: colors.accent }]}>
        Primary, secondary, and accent (60% of secondary). Saved on device.
      </Text>

      <View style={styles.row}>
        <Swatch label="Primary" color={colors.primary} border={colors.secondary} />
        <Swatch label="Secondary" color={colors.secondary} border={colors.secondary} />
        <Swatch label="Accent" color={colors.accent} border={colors.secondary} />
      </View>

      <Text style={[styles.section, { color: colors.secondary }]}>
        Change at runtime
      </Text>

      <View style={styles.actions}>
        <Action
          label="Primary → white"
          onPress={() => setPrimary('#FFFFFF')}
          secondary={colors.secondary}
          accent={colors.accent}
        />
        <Action
          label="Primary → light gray"
          onPress={() => setPrimary('#F0F0F0')}
          secondary={colors.secondary}
          accent={colors.accent}
        />
        <Action
          label="Secondary → black"
          onPress={() => setSecondary('#000000')}
          secondary={colors.secondary}
          accent={colors.accent}
        />
        <Action
          label="Secondary → navy"
          onPress={() => setSecondary('#001F3F')}
          secondary={colors.secondary}
          accent={colors.accent}
        />
        <Action
          label="Secondary → crimson"
          onPress={() => setSecondary('#DC143C')}
          secondary={colors.secondary}
          accent={colors.accent}
        />
        <Action
          label="Reset to white / black"
          onPress={resetColors}
          secondary={colors.secondary}
          accent={colors.accent}
        />
      </View>
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
  secondary: string;
  accent: string;
}) {
  return (
    <Pressable
      onPress={props.onPress}
      style={[styles.button, { backgroundColor: props.accent, borderColor: props.secondary }]}>
      <Text style={[styles.buttonText, { color: props.secondary }]}>{props.label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
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
    marginBottom: 28,
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
  section: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  actions: {
    gap: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
