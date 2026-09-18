import {
  ColorsProvider,
  loadMinimalUIFonts,
  MainCheckItem,
  MainContainer,
  MainIcon,
  MainSlider,
  MainSwitch,
  MainText,
  MainTextField,
  MAX_BORDER_RADIUS,
  MAX_BORDER_WIDTH,
  MAX_SHADOW_BLUR,
  MAX_SHADOW_OFFSET,
  MAX_SHADOW_OPACITY,
  MAX_SHADOW_SPREAD,
  MIN_BORDER_RADIUS,
  MIN_BORDER_WIDTH,
  MIN_SHADOW_BLUR,
  MIN_SHADOW_OFFSET,
  MIN_SHADOW_OPACITY,
  MIN_SHADOW_SPREAD,
  ShadowSidedList,
  THEME_FONTS,
  useColors,
} from '@samikodiane/minimal-ui';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useRef, useState } from 'react';
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
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    loadMinimalUIFonts()
      .then(() => setFontsReady(true))
      .catch(() => setFontsReady(true));
  }, []);

  if (!fontsReady) {
    return null;
  }

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
    font,
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
    changeFont,
    resetFont,
  } = useColors();

  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((message: string) => {
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimer.current) {
        clearTimeout(toastTimer.current);
      }
    };
  }, []);

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.primary }]}>
      {toast ? (
        <View
          pointerEvents="none"
          style={[
            styles.toast,
            {
              backgroundColor: colors.secondary,
            },
          ]}>
          <Text style={[styles.toastText, { color: colors.primary }]}>{toast}</Text>
        </View>
      ) : null}

      <ScrollView
        contentContainerStyle={styles.content}
        // Let elevation / iOS shadows paint into the padded area.
        clipToPadding={false}
        keyboardShouldPersistTaps="handled">
        <Text style={[styles.title, { color: colors.secondary }]}>Theme</Text>
        <Text style={[styles.subtitle, { color: colors.accent }]}>
          Tweak colors, borders, and shadows in real time.
        </Text>

        <View style={styles.row}>
          <Swatch label="Primary" color={colors.primary} border={colors.secondary} />
          <Swatch label="Secondary" color={colors.secondary} border={colors.secondary} />
          <Swatch label="Accent" color={colors.accent} border={colors.secondary} />
        </View>

        <MainContainer
          style={styles.preview}
          onPress={() => showToast('Container pressed')}
          onLongPress={() => showToast('Container long-pressed')}>
          <MainText
            variant="primary"
            onPress={() => showToast('Primary text pressed')}
            onLongPress={() => showToast('Primary text long-pressed')}>
            Primary text (16 · bold)
          </MainText>
          <MainText
            variant="secondary"
            onPress={() => showToast('Secondary text pressed')}
            onLongPress={() => showToast('Secondary text long-pressed')}>
            Secondary text · {font.name}
          </MainText>
          <MainText variant="primary" size={24} stroke>
            Primary 24 · stroke
          </MainText>
        </MainContainer>

        <MainContainer
          style={styles.preview}
          filled
          overrideBorder
          onPress={() => showToast('Filled container pressed')}
          onLongPress={() => showToast('Filled container long-pressed')}>
          <MainText
            variant="primary"
            inverted
            onPress={() => showToast('Inverted text pressed')}
            onLongPress={() => showToast('Inverted text long-pressed')}>
            Inverted primary
          </MainText>
          <MainText variant="secondary" inverted>
            Inverted secondary
          </MainText>
        </MainContainer>

        <Text style={[styles.section, { color: colors.secondary }]}>Icons</Text>
        <MainContainer style={styles.preview}>
          <View style={styles.iconRow}>
            <MainIcon variant="primary" inverted>
              <Ionicons name="home" />
            </MainIcon>
            <MainIcon variant="secondary">
              <Ionicons name="settings-outline" />
            </MainIcon>
            <MainIcon variant="primary" size={32} inverted>
              <Ionicons name="heart" />
            </MainIcon>
          </View>
          <MainText variant="secondary">
            Primary inverted · secondary · primary size 32
          </MainText>
        </MainContainer>
        <MainContainer style={styles.preview} filled overrideBorder>
          <View style={styles.iconRow}>
            <MainIcon variant="primary">
              <Ionicons name="home" />
            </MainIcon>
            <MainIcon variant="secondary" inverted>
              <Ionicons name="settings-outline" />
            </MainIcon>
            <MainIcon variant="primary" size={32}>
              <Ionicons name="heart" />
            </MainIcon>
          </View>
          <MainText variant="secondary" inverted>
            Primary · secondary inverted · primary size 32
          </MainText>
        </MainContainer>

        <Text style={[styles.section, { color: colors.secondary }]}>
          Text field
        </Text>
        <MainTextField
          showLabel
          labelText="Name"
          hintText="Type here"
          defaultText=""
          style={styles.textField}
          onChangeText={(text) =>
            showToast(text ? `Name changed: ${text}` : 'Name cleared')
          }
          onSubmit={(text) => showToast(`Name submitted: ${text || '(empty)'}`)}
        />
        <MainContainer style={styles.textField} filled overrideBorder>
          <MainTextField
            showLabel
            labelText="Email"
            hintText="you@example.com"
            inverted
            onChangeText={(text) =>
              showToast(text ? `Email changed: ${text}` : 'Email cleared')
            }
            onSubmit={(text) =>
              showToast(`Email submitted: ${text || '(empty)'}`)
            }
          />
        </MainContainer>

        <Text style={[styles.section, { color: colors.secondary }]}>
          Check item
        </Text>
        <MainCheckItem
          text="Buy groceries"
          style={styles.checkItem}
          onToggleOn={() => showToast('Check item toggled on')}
          onToggleOff={() => showToast('Check item toggled off')}
        />
        <MainCheckItem
          text="Already done task"
          checked
          style={styles.checkItem}
          onToggleOn={() => showToast('Pre-checked item toggled on')}
          onToggleOff={() => showToast('Pre-checked item toggled off')}
        />
        <MainContainer style={styles.checkItem} filled overrideBorder>
          <MainCheckItem
            text="Inverted check item"
            inverted
            onToggleOn={() => showToast('Inverted check toggled on')}
            onToggleOff={() => showToast('Inverted check toggled off')}
          />
        </MainContainer>

        <Text style={[styles.section, { color: colors.secondary }]}>
          Switch
        </Text>
        <View style={styles.switchRow}>
          <MainText variant="secondary">Notifications</MainText>
          <MainSwitch
            onToggleOn={() => showToast('Switch toggled on')}
            onToggleOff={() => showToast('Switch toggled off')}
          />
        </View>
        <View style={styles.switchRow}>
          <MainText variant="secondary">Pre-enabled</MainText>
          <MainSwitch
            active
            onToggleOn={() => showToast('Pre-enabled switch on')}
            onToggleOff={() => showToast('Pre-enabled switch off')}
          />
        </View>
        <MainContainer style={styles.checkItem} filled overrideBorder>
          <View style={styles.switchRowInverted}>
            <MainText variant="secondary" inverted>
              Inverted switch
            </MainText>
            <MainSwitch
              inverted
              onToggleOn={() => showToast('Inverted switch on')}
              onToggleOff={() => showToast('Inverted switch off')}
            />
          </View>
        </MainContainer>

        <Text style={[styles.section, { color: colors.secondary }]}>
          Shadow sided list
        </Text>
        <ShadowSidedList height={180} style={styles.listPreview}>
          <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
            {Array.from({ length: 12 }, (_, index) => (
              <MainContainer key={index} style={styles.listItem}>
                <MainText variant="primary">List item {index + 1}</MainText>
                <MainText variant="secondary">Scroll to see edge fades</MainText>
              </MainContainer>
            ))}
          </ScrollView>
        </ShadowSidedList>

        <MainContainer style={styles.listPreview} filled overrideBorder>
          <ShadowSidedList height={160} inverted>
            <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
              {Array.from({ length: 10 }, (_, index) => (
                <View key={index} style={styles.listItemInverted}>
                  <MainText variant="primary" inverted>
                    Inverted item {index + 1}
                  </MainText>
                </View>
              ))}
            </ScrollView>
          </ShadowSidedList>
        </MainContainer>

        <Text style={[styles.section, { color: colors.secondary }]}>Font</Text>
        <View style={styles.fontRow}>
          {THEME_FONTS.map((name) => (
            <FontChip
              key={name}
              label={name}
              active={font.name === name}
              onPress={() => changeFont(name)}
              ink={colors.secondary}
              accent={colors.accent}
            />
          ))}
        </View>
        <ResetButton label="Reset font" onPress={resetFont} ink={colors.secondary} />

        <Text style={[styles.section, { color: colors.secondary }]}>Colors</Text>
        <ColorPicker
          label="Primary"
          value={colors.primary}
          onChange={setPrimary}
          ink={colors.secondary}
          track={colors.accent}
        />
        <ColorPicker
          label="Secondary"
          value={colors.secondary}
          onChange={setSecondary}
          ink={colors.secondary}
          track={colors.accent}
        />
        <ResetButton label="Reset colors" onPress={resetColors} ink={colors.secondary} />

        <Text style={[styles.section, { color: colors.secondary }]}>Borders</Text>
        <ThemeSlider
          label="Border width (no thumb)"
          value={borders.borderWidth}
          minimumValue={MIN_BORDER_WIDTH}
          maximumValue={MAX_BORDER_WIDTH}
          onValueChange={setBorderWidth}
          ink={colors.secondary}
          track={colors.accent}
          hideThumb
        />
        <ThemeSlider
          label="Border radius"
          value={borders.borderRadius}
          minimumValue={MIN_BORDER_RADIUS}
          maximumValue={MAX_BORDER_RADIUS}
          onValueChange={setBorderRadius}
          ink={colors.secondary}
          track={colors.accent}
        />
        <MainContainer style={styles.sliderInverted} filled overrideBorder>
          <MainText variant="secondary" inverted style={styles.sliderInvertedLabel}>
            Inverted slider
          </MainText>
          <MainSlider
            value={borders.borderRadius}
            minimumValue={MIN_BORDER_RADIUS}
            maximumValue={MAX_BORDER_RADIUS}
            onValueChange={setBorderRadius}
            inverted
            trackHeight={10}
            thumbSize={24}
          />
        </MainContainer>
        <ResetButton label="Reset borders" onPress={resetBorders} ink={colors.secondary} />

        <Text style={[styles.section, { color: colors.secondary }]}>Shadows</Text>
        <ThemeSlider
          label="Opacity"
          value={shadows.opacity}
          minimumValue={MIN_SHADOW_OPACITY}
          maximumValue={MAX_SHADOW_OPACITY}
          onValueChange={setShadowOpacity}
          ink={colors.secondary}
          track={colors.accent}
        />
        <ThemeSlider
          label="Blur"
          value={shadows.blur}
          minimumValue={MIN_SHADOW_BLUR}
          maximumValue={MAX_SHADOW_BLUR}
          onValueChange={setShadowBlur}
          ink={colors.secondary}
          track={colors.accent}
        />
        <ThemeSlider
          label="Spread"
          value={shadows.spread}
          minimumValue={MIN_SHADOW_SPREAD}
          maximumValue={MAX_SHADOW_SPREAD}
          onValueChange={setShadowSpread}
          ink={colors.secondary}
          track={colors.accent}
        />
        <ThemeSlider
          label="Offset X"
          value={shadows.offsetX}
          minimumValue={MIN_SHADOW_OFFSET}
          maximumValue={MAX_SHADOW_OFFSET}
          onValueChange={setShadowOffsetX}
          ink={colors.secondary}
          track={colors.accent}
        />
        <ThemeSlider
          label="Offset Y"
          value={shadows.offsetY}
          minimumValue={MIN_SHADOW_OFFSET}
          maximumValue={MAX_SHADOW_OFFSET}
          onValueChange={setShadowOffsetY}
          ink={colors.secondary}
          track={colors.accent}
        />
        <ResetButton label="Reset shadows" onPress={resetShadows} ink={colors.secondary} />
      </ScrollView>
    </SafeAreaView>
  );
}

function ColorPicker(props: {
  label: string;
  value: string;
  onChange: (color: string) => void;
  ink: string;
  track: string;
}) {
  const hex = toPickerHex(props.value);
  const rgb = hexToRgb(hex);

  return (
    <View style={styles.control}>
      <View style={styles.controlHeader}>
        <Text style={[styles.controlLabel, { color: props.ink }]}>{props.label}</Text>
        <Text style={[styles.controlValue, { color: props.ink }]}>{hex}</Text>
      </View>

      {Platform.OS === 'web' ? (
        <WebColorInput value={hex} onChange={props.onChange} />
      ) : (
        <>
          <ThemeSlider
            label="Red"
            value={rgb.r}
            minimumValue={0}
            maximumValue={255}
            onValueChange={(r) =>
              props.onChange(rgbToHex(r, rgb.g, rgb.b))
            }
            ink={props.ink}
            track={props.track}
          />
          <ThemeSlider
            label="Green"
            value={rgb.g}
            minimumValue={0}
            maximumValue={255}
            onValueChange={(g) =>
              props.onChange(rgbToHex(rgb.r, g, rgb.b))
            }
            ink={props.ink}
            track={props.track}
          />
          <ThemeSlider
            label="Blue"
            value={rgb.b}
            minimumValue={0}
            maximumValue={255}
            onValueChange={(b) =>
              props.onChange(rgbToHex(rgb.r, rgb.g, b))
            }
            ink={props.ink}
            track={props.track}
          />
        </>
      )}

      <View
        style={[
          styles.colorPreview,
          { backgroundColor: hex, borderColor: props.ink },
        ]}
      />
    </View>
  );
}

function WebColorInput(props: { value: string; onChange: (color: string) => void }) {
  if (Platform.OS !== 'web') {
    return null;
  }

  return (
    <input
      type="color"
      value={props.value}
      onChange={(event) => props.onChange(event.target.value.toUpperCase())}
      style={{
        width: '100%',
        height: 44,
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        backgroundColor: 'transparent',
      }}
    />
  );
}

function ThemeSlider(props: {
  label: string;
  value: number;
  minimumValue: number;
  maximumValue: number;
  onValueChange: (value: number) => void;
  ink: string;
  track: string;
  hideThumb?: boolean;
}) {
  return (
    <View style={styles.control}>
      <View style={styles.controlHeader}>
        <Text style={[styles.controlLabel, { color: props.ink }]}>{props.label}</Text>
        <Text style={[styles.controlValue, { color: props.ink }]}>
          {formatOneDecimal(props.value)}
        </Text>
      </View>
      <MainSlider
        value={props.value}
        minimumValue={props.minimumValue}
        maximumValue={props.maximumValue}
        onValueChange={(next) => props.onValueChange(roundToOneDecimal(next))}
        hideThumb={props.hideThumb}
        trackHeight={10}
        thumbSize={24}
      />
    </View>
  );
}

function roundToOneDecimal(value: number): number {
  return Math.round(value * 10) / 10;
}

function formatOneDecimal(value: number): string {
  return roundToOneDecimal(value).toFixed(1);
}

function ResetButton(props: {
  label: string;
  onPress: () => void;
  ink: string;
}) {
  return (
    <Pressable onPress={props.onPress} style={styles.resetButton}>
      <Text style={[styles.resetText, { color: props.ink }]}>{props.label}</Text>
    </Pressable>
  );
}

function FontChip(props: {
  label: string;
  active: boolean;
  onPress: () => void;
  ink: string;
  accent: string;
}) {
  return (
    <Pressable
      onPress={props.onPress}
      style={[
        styles.fontChip,
        {
          borderColor: props.ink,
          backgroundColor: props.active ? props.accent : 'transparent',
        },
      ]}>
      <Text style={[styles.fontChipText, { color: props.ink }]}>{props.label}</Text>
    </Pressable>
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

function toPickerHex(color: string): string {
  const rgb = parseColor(color);
  if (!rgb) {
    return '#000000';
  }
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

function parseColor(color: string): { r: number; g: number; b: number } | null {
  const trimmed = color.trim();

  if (trimmed.startsWith('#')) {
    return hexToRgb(trimmed);
  }

  const rgbMatch = trimmed.match(
    /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i
  );
  if (rgbMatch) {
    return {
      r: Number(rgbMatch[1]),
      g: Number(rgbMatch[2]),
      b: Number(rgbMatch[3]),
    };
  }

  return null;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const raw = hex.replace('#', '');

  if (raw.length === 3) {
    return {
      r: parseInt(raw[0] + raw[0], 16),
      g: parseInt(raw[1] + raw[1], 16),
      b: parseInt(raw[2] + raw[2], 16),
    };
  }

  return {
    r: parseInt(raw.slice(0, 2), 16),
    g: parseInt(raw.slice(2, 4), 16),
    b: parseInt(raw.slice(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  const channel = (value: number) =>
    Math.round(Math.min(255, Math.max(0, value)))
      .toString(16)
      .padStart(2, '0');

  return `#${channel(r)}${channel(g)}${channel(b)}`.toUpperCase();
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  toast: {
    position: 'absolute',
    top: 30,
    left: 16,
    right: 16,
    zIndex: 100,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  toastText: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  content: {
    padding: 24,
    paddingBottom: 48,
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
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
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
    marginBottom: 28,
    alignSelf: 'stretch',
    gap: 8,
    // Give Android elevation room so ScrollView does not clip it.
    overflow: 'visible',
  },
  listPreview: {
    marginBottom: 28,
    alignSelf: 'stretch',
  },
  textField: {
    marginBottom: 16,
    alignSelf: 'stretch',
  },
  checkItem: {
    marginBottom: 12,
    alignSelf: 'stretch',
  },
  sliderInverted: {
    marginBottom: 16,
    alignSelf: 'stretch',
  },
  sliderInvertedLabel: {
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignSelf: 'stretch',
    gap: 12,
  },
  switchRowInverted: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    gap: 12,
    width: '100%',
  },
  listItem: {
    marginBottom: 10,
    alignSelf: 'stretch',
  },
  listItemInverted: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  fontRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  fontChip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  fontChipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  section: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 8,
  },
  control: {
    marginBottom: 16,
  },
  controlHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  controlLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  controlValue: {
    fontSize: 13,
    fontVariant: ['tabular-nums'],
  },
  colorPreview: {
    height: 28,
    borderRadius: 6,
    borderWidth: 1,
    marginTop: 8,
  },
  resetButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    marginBottom: 8,
  },
  resetText: {
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
