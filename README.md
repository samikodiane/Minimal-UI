# Minimal UI

Shared Expo / React Native UI components with a single runtime theme: colors, borders, shadows, and one active font for the whole app.

Package name: `@samikodiane/minimal-ui`  
Repository: [https://github.com/samikodiane/Minimal-UI](https://github.com/samikodiane/Minimal-UI)  
Peer dependencies: `expo`, `react`, `react-native`

---

## Table of contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Quick start](#quick-start)
4. [Theming system](#theming-system)
5. [Typography and fonts](#typography-and-fonts)
6. [Components](#components)
   - [MainContainer](#maincontainer)
   - [MainText](#maintext)
   - [MainIcon](#mainicon)
   - [MainTextField](#maintextfield)
   - [ShadowSidedList](#shadowsidedlist)
   - [MainCheckItem](#maincheckitem)
   - [MainSwitch](#mainswitch)
   - [MainSlider](#mainslider)
7. [Helpers and constants](#helpers-and-constants)
8. [Notes and caveats](#notes-and-caveats)

---

## Overview

Minimal UI is built around a few rules:

- **One theme at a time** — primary, secondary, borders, shadows, and a single font apply everywhere.
- **Accent is derived** — you never set accent; it is always secondary at 60% opacity.
- **Components read the theme** — wrap once with `ColorsProvider`, call `loadMinimalUIFonts()` at startup, then use the components.
- **Inverted mode** — many components accept `inverted` so text and controls work on dark / filled surfaces.

---

## Installation

Install from the public GitHub repository.

### CLI

```bash
npm install github:samikodiane/Minimal-UI
```

Equivalent forms:

```bash
npm install git+https://github.com/samikodiane/Minimal-UI.git
# pin a branch or tag:
npm install github:samikodiane/Minimal-UI#main
```

With Yarn / pnpm / Bun:

```bash
yarn add github:samikodiane/Minimal-UI
pnpm add github:samikodiane/Minimal-UI
bun add github:samikodiane/Minimal-UI
```

### `package.json` dependencies

Add the package under `dependencies` (npm resolves the scoped name from the repo’s `package.json`):

```json
{
  "dependencies": {
    "@samikodiane/minimal-ui": "github:samikodiane/Minimal-UI#main"
  }
}
```

Then install:

```bash
npm install
```

### Import

```ts
import {
  ColorsProvider,
  loadMinimalUIFonts,
  useColors,
  MainContainer,
  MainText,
  // …
} from '@samikodiane/minimal-ui';
```

Also ensure these resolve in the host app (they are dependencies of the library):

- `expo-font`
- `expo-linear-gradient`
- `@react-native-async-storage/async-storage`

### Local development (this repo’s example)

```bash
cd example
npx expo start
```

Or from the library root:

```bash
npm run start   # / android / ios / web
```

---

## Quick start

```tsx
import { useEffect, useState } from 'react';
import {
  ColorsProvider,
  loadMinimalUIFonts,
  MainContainer,
  MainText,
  useColors,
} from '@samikodiane/minimal-ui';

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadMinimalUIFonts()
      .then(() => setReady(true))
      .catch(() => setReady(true));
  }, []);

  if (!ready) return null;

  return (
    <ColorsProvider>
      <Home />
    </ColorsProvider>
  );
}

function Home() {
  const { colors, changeFont } = useColors();

  return (
    <MainContainer style={{ backgroundColor: colors.primary }}>
      <MainText variant="primary">Hello</MainText>
      <MainText variant="secondary">Themed secondary text</MainText>
    </MainContainer>
  );
}
```

Switch fonts with:

```tsx
import { ThemeFont, useColors } from '@samikodiane/minimal-ui';

const { changeFont } = useColors();
changeFont(ThemeFont.Poppins);
```

---

## Theming system

### Architecture

```text
ColorsProvider
 ├── colors   → primary, secondary, accent (derived)
├── borders  → borderWidth, borderRadius
├── shadows  → opacity, blur, spread, offsetX, offsetY, color (derived)
└── font     → name, family, boldFamily, semiBoldFamily
```

Everything is available from `useColors()` inside `ColorsProvider`. Values are **persisted** with AsyncStorage (`@minimal-ui/colors`) after the first hydrate. Provider props are **initial defaults** only until stored values load.

### Colors

| Token | Type | Settable | Default | Meaning |
|-------|------|----------|---------|---------|
| `primary` | `string` | Yes — `setPrimary` | `#FFFFFF` | Page / surface background |
| `secondary` | `string` | Yes — `setSecondary` | `#000000` | Ink, borders, strong fills |
| `accent` | `string` | **No** (derived) | secondary @ **60%** opacity | Soft text, tracks, outlines |

Supported color formats for setters / opacity helpers: `#RGB`, `#RRGGBB`, `#RRGGBBAA`, `rgb()`, `rgba()`.

### Borders

| Token | Type | Min | Max | Default |
|-------|------|-----|-----|---------|
| `borderWidth` | `number` | `0` | `3` | `2` |
| `borderRadius` | `number` | `0` | `60` | `15` |

### Shadows

| Token | Type | Min | Max | Default | Meaning |
|-------|------|-----|-----|---------|---------|
| `opacity` | `number` | `0` | `100` | `0` | Strength (also drives shadow color alpha) |
| `blur` | `number` | `0` | `24` | `0` | Softness |
| `spread` | `number` | `0` | `8` | `0` | Expansion (best on web / boxShadow) |
| `offsetX` | `number` | `-16` | `16` | `0` | Horizontal offset |
| `offsetY` | `number` | `-16` | `16` | `0` | Vertical offset |
| `color` | `string` | — | — | derived | Always secondary at `opacity / 100` |

Shadows on `MainContainer` use cross-platform `boxShadow` when New Architecture / web is available; otherwise iOS `shadow*` props and an Android `elevation` fallback.

### `ColorsProvider` props

| Parameter | Type | Required | Default | When / how to use |
|-----------|------|----------|---------|-------------------|
| `children` | `ReactNode` | **Yes** | — | App tree that needs the theme |
| `primary` | `string` | No | `#FFFFFF` | Initial primary before storage hydrate |
| `secondary` | `string` | No | `#000000` | Initial secondary before storage hydrate |
| `borderWidth` | `number` | No | `2` | Initial border width |
| `borderRadius` | `number` | No | `15` | Initial border radius |
| `shadowOpacity` | `number` | No | `0` | Initial shadow opacity (0–100) |
| `shadowBlur` | `number` | No | `0` | Initial blur |
| `shadowSpread` | `number` | No | `0` | Initial spread |
| `shadowOffsetX` | `number` | No | `0` | Initial X offset |
| `shadowOffsetY` | `number` | No | `0` | Initial Y offset |
| `font` | `ThemeFont` | No | `ThemeFont.Geist` | Initial theme font |

### `useColors()` API

| Name | Type | What it does |
|------|------|--------------|
| `colors` | `{ primary, secondary, accent }` | Current color tokens |
| `borders` | `{ borderWidth, borderRadius }` | Current border tokens |
| `shadows` | `{ opacity, blur, spread, offsetX, offsetY, color }` | Current shadow tokens |
| `font` | `{ name, family, boldFamily, semiBoldFamily }` | Current font faces |
| `setPrimary(color)` | `(string) => void` | Set primary and persist |
| `setSecondary(color)` | `(string) => void` | Set secondary and persist |
| `resetColors()` | `() => void` | Restore white / black |
| `setBorderWidth(n)` | `(number) => void` | Set width (clamped) |
| `setBorderRadius(n)` | `(number) => void` | Set radius (clamped) |
| `resetBorders()` | `() => void` | Restore width `2`, radius `15` |
| `setShadowOpacity(n)` | `(number) => void` | Set opacity 0–100 |
| `setShadowBlur(n)` | `(number) => void` | Set blur |
| `setShadowSpread(n)` | `(number) => void` | Set spread |
| `setShadowOffsetX(n)` | `(number) => void` | Set X offset |
| `setShadowOffsetY(n)` | `(number) => void` | Set Y offset |
| `resetShadows()` | `() => void` | Restore all shadow values to `0` |
| `changeFont(font)` | `(ThemeFont) => void` | Switch the single active font |
| `resetFont()` | `() => void` | Restore Geist |

```tsx
const {
  colors,
  setPrimary,
  setSecondary,
  changeFont,
  resetColors,
} = useColors();

setPrimary('#F5F5F5');
setSecondary('#111111');
changeFont(ThemeFont.Outfit);
```

---

## Typography and fonts

### Model

- **One font family** is active for the whole theme (`changeFont`).
- **Two text roles** (variants):
  - **Primary text** — size `16`, bold face, color = secondary (or primary when inverted)
  - **Secondary text** — size `14`, semi-bold face, color = accent (or primary @ 60% when inverted)

Constants: `PRIMARY_TEXT_SIZE = 16`, `SECONDARY_TEXT_SIZE = 14`.

### Loading fonts (required)

Fonts are **bundled** (Geist locally + `@expo-google-fonts/*`). Call once at startup **before** rendering themed text:

```tsx
await loadMinimalUIFonts();
```

Works fully **offline** after the app is installed (no CDN).

### Available fonts (`ThemeFont`)

| Enum member | Family id |
|-------------|-----------|
| `ThemeFont.Geist` | Geist (default) |
| `ThemeFont.Poppins` | Poppins |
| `ThemeFont.PixelifySans` | PixelifySans |
| `ThemeFont.Cinzel` | Cinzel |
| `ThemeFont.Iceland` | Iceland |
| `ThemeFont.Abel` | Abel |
| `ThemeFont.Sail` | Sail |
| `ThemeFont.PoiretOne` | PoiretOne |
| `ThemeFont.RobotoMono` | RobotoMono |
| `ThemeFont.Lora` | Lora |
| `ThemeFont.Ubuntu` | Ubuntu |
| `ThemeFont.Outfit` | Outfit |
| `ThemeFont.BebasNeue` | BebasNeue |
| `ThemeFont.SourceCodePro` | SourceCodePro |
| `ThemeFont.JosefinSans` | JosefinSans |
| `ThemeFont.InstrumentSerif` | InstrumentSerif |
| `ThemeFont.Caveat` | Caveat |
| `ThemeFont.Bungee` | Bungee |
| `ThemeFont.Pacifico` | Pacifico |
| `ThemeFont.Kalam` | Kalam |
| `ThemeFont.AmaticSc` | AmaticSc |
| `ThemeFont.Acme` | Acme |
| `ThemeFont.ShareTechMono` | ShareTechMono |
| `ThemeFont.Bangers` | Bangers |
| `ThemeFont.LexendExa` | LexendExa |
| `ThemeFont.Courgette` | Courgette |
| `ThemeFont.Changa` | Changa |
| `ThemeFont.Gruppo` | Gruppo |
| `ThemeFont.Goldman` | Goldman |
| `ThemeFont.Audiowide` | Audiowide |

Use `THEME_FONTS` (`ThemeFont[]`) for pickers.

### Font state (`font` from `useColors`)

| Field | Type | Meaning |
|-------|------|---------|
| `name` | `ThemeFont` | Active font token |
| `family` | `string` | Regular face (`"Poppins"`) |
| `boldFamily` | `string` | Bold face (`"Poppins-Bold"`) — used by primary text |
| `semiBoldFamily` | `string` | Semi-bold face (`"Poppins-SemiBold"`) — used by secondary text |

Missing Google weights fall back to the regular file for that slot so native bold still follows `changeFont`.

---

## Components

### MainContainer

Themed surface / card / button. Background, border, radius, and shadow come from the theme.

**When to use:** cards, panels, tappable rows, filled chips, any bordered surface.

```tsx
<MainContainer
  filled={false}
  onPress={() => console.log('pressed')}
  onLongPress={() => console.log('long pressed')}
>
  <MainText>Content</MainText>
</MainContainer>
```

#### Parameters

| Parameter | Type | Required | Default | Represents / when to use |
|-----------|------|----------|---------|--------------------------|
| `children` | `ReactNode` | No | — | Inner content |
| `width` | `number \| string` | No | — | Fixed width |
| `height` | `number \| string` | No | — | Fixed height |
| `radius` | `number` | No | theme `borderRadius` | Override corner radius for this instance |
| `overrideBorder` | `boolean` | No | `false` | Hide border (`borderWidth` 0) |
| `filled` | `boolean` | No | `false` | Fill with **secondary** instead of primary |
| `padding` | `number` | No | `16` | Inner padding |
| `style` | `StyleProp<ViewStyle>` | No | — | Extra styles |

Minimum size: **25×25**.

#### Actions

| Action | Type | Required | When it fires | How to use |
|--------|------|----------|---------------|------------|
| `onPress` | `() => void` | No | User taps the container | `onPress={() => { … }}` |
| `onLongPress` | `() => void` | No | User long-presses | `onLongPress={() => { … }}` |

If either action is set, the container renders as a `Pressable`.

---

### MainText

Themed text using the active theme font and primary / secondary roles.

**When to use:** all labels, titles, and body copy that should follow the theme font and colors.

```tsx
<MainText variant="primary">Title</MainText>
<MainText variant="secondary">Caption</MainText>
<MainText inverted variant="primary">On dark surface</MainText>
```

#### Parameters

| Parameter | Type | Required | Default | Represents / when to use |
|-----------|------|----------|---------|--------------------------|
| `children` | `ReactNode` | No | — | Text content |
| `variant` | `'primary' \| 'secondary'` | No | `'primary'` | Role: primary = strong ink @ 16 bold; secondary = accent @ 14 semi-bold |
| `size` | `number` | No | `16` or `14` by variant | Override font size |
| `underline` | `boolean` | No | `false` | Underline decoration |
| `stroke` | `boolean` | No | `false` | Strikethrough (line-through) |
| `italic` | `boolean` | No | `false` | Italic style |
| `inverted` | `boolean` | No | `false` | Light text for dark / filled backgrounds |
| `style` | `StyleProp<TextStyle>` | No | — | Extra text styles |

**Inverted colors**

| Variant | Normal | Inverted |
|---------|--------|----------|
| `primary` | secondary | primary |
| `secondary` | accent | primary @ 60% |

#### Actions

| Action | Type | Required | When it fires | How to use |
|--------|------|----------|---------------|------------|
| `onPress` | `() => void` | No | User taps the text | `onPress={() => { … }}` |
| `onLongPress` | `() => void` | No | User long-presses the text | `onLongPress={() => { … }}` |

---

### MainIcon

Themed icon wrapper. You pass the glyph from the host app (e.g. `@expo/vector-icons`); Minimal UI injects theme `color` and `size`.

**When to use:** any icon that should follow primary / secondary roles and inverted surfaces.

```tsx
import { Ionicons } from '@expo/vector-icons';
import { MainIcon } from '@samikodiane/minimal-ui';

<MainIcon variant="primary" inverted>
  <Ionicons name="home" />
</MainIcon>

<MainIcon variant="secondary">
  <Ionicons name="settings-outline" />
</MainIcon>

<MainIcon variant="primary" size={32} inverted>
  <Ionicons name="heart" />
</MainIcon>
```

#### Parameters

| Parameter | Type | Required | Default | Represents / when to use |
|-----------|------|----------|---------|--------------------------|
| `children` | `ReactNode` | No* | — | Icon element (e.g. `<Ionicons name="home" />`) |
| `icon` | `ReactNode` | No* | — | Same as `children`; wins if both are set |
| `variant` | `'primary' \| 'secondary'` | No | `'primary'` | Role: primary @ 24px; secondary @ 16px |
| `size` | `number` | No | `24` or `16` by variant | Override icon size |
| `inverted` | `boolean` | No | `false` | Flip colors for dark / filled backgrounds |
| `style` | `StyleProp<ViewStyle>` | No | — | Wrapper style |

\* Pass either `children` or `icon` (a single React element that accepts `color` and `size`).

**Colors**

| Variant | Normal | Inverted |
|---------|--------|----------|
| `primary` | primary | secondary |
| `secondary` | accent | primary @ 60% |

**Sizes**

| Variant | Default size | Constant |
|---------|--------------|----------|
| `primary` | `24` | `PRIMARY_ICON_SIZE` |
| `secondary` | `16` | `SECONDARY_ICON_SIZE` |

---

### MainTextField

Transparent themed text input: secondary-style label/hint, primary-style typed value, active theme font.

**When to use:** forms and inputs that should match MainText styling and sit on any background.

```tsx
<MainTextField
  showLabel
  labelText="Name"
  hintText="Type here"
  defaultText=""
  onChangeText={(text) => console.log(text)}
  onSubmit={(text) => console.log('submit', text)}
/>

<MainContainer filled>
  <MainTextField showLabel labelText="Email" hintText="you@site.com" inverted />
</MainContainer>
```

#### Parameters

| Parameter | Type | Required | Default | Represents / when to use |
|-----------|------|----------|---------|--------------------------|
| `showLabel` | `boolean` | No | `false` | `false` = hide label; `true` = show `labelText` |
| `labelText` | `string` | No | — | Label copy (secondary text style) |
| `hintText` | `string` | No | — | Placeholder / hint (same style as label) |
| `defaultText` | `string` | No | `''` | Initial value when uncontrolled |
| `value` | `string` | No | — | Controlled value (overrides `defaultText`) |
| `readOnly` | `boolean` | No | `false` | Block editing when `true` |
| `autoFocus` | `boolean` | No | `false` | Focus and open keyboard on mount |
| `inverted` | `boolean` | No | `false` | Invert label + value colors for dark surfaces |
| `style` | `StyleProp<ViewStyle>` | No | — | Wrapper style (transparent background) |
| `inputStyle` | `StyleProp<TextStyle>` | No | — | Style applied to the `TextInput` |
| *(other)* | RN `TextInput` props | No | — | Extra `TextInput` props except overridden ones |

Background is always **transparent** so the field adapts to whatever sits behind it.

#### Actions

| Action | Type | Required | When it fires | How to use |
|--------|------|----------|---------------|------------|
| `onChangeText` | `(text: string) => void` | No | Every character add/remove | `onChangeText={(t) => { … }}` |
| `onSubmit` | `(text: string) => void` | No | Keyboard return / submit key | `onSubmit={(t) => { … }}` |

---

### ShadowSidedList

Fixed-height scroll viewport with top and bottom theme-colored fades so content soft-edges instead of hard-clipping.

**When to use:** lists that should fade into the page (or into a filled surface when `inverted`).

```tsx
<ShadowSidedList height={180}>
  <ScrollView nestedScrollEnabled>
    {/* items */}
  </ScrollView>
</ShadowSidedList>

<MainContainer filled>
  <ShadowSidedList height={160} inverted>
    <ScrollView>{/* items */}</ScrollView>
  </ShadowSidedList>
</MainContainer>
```

#### Parameters

| Parameter | Type | Required | Default | Represents / when to use |
|-----------|------|----------|---------|--------------------------|
| `children` | `ReactNode` | **Yes*** | — | Exactly **one** scrollable child (`ScrollView`, `FlatList`, …) |
| `height` | `number` | No | `500` | Viewport height |
| `fadeSize` | `number` | No | `20` | Height of top and bottom fade bands |
| `contentInset` | `number` | No | `fadeSize` | Top/bottom padding inside scroll content so items clear fades at rest |
| `inverted` | `boolean` | No | `false` | Fade with **secondary** (for dark / filled backgrounds) instead of primary |
| `style` | `StyleProp<ViewStyle>` | No | — | Wrapper style |

\*Required in practice: the component uses `Children.only`.

Requires `expo-linear-gradient`. Fades use `pointerEvents="none"` so scrolling still works.

#### Actions

None (pass handlers on the child list / items).

---

### MainCheckItem

Checkbox + label row. Unchecked: accent outline, primary text at secondary size. Checked: secondary fill, primary check icon, accent stroked text.

**When to use:** todo rows, agreements, selectable list lines.

```tsx
<MainCheckItem
  text="Buy groceries"
  checked={false}
  onToggleOn={() => console.log('on')}
  onToggleOff={() => console.log('off')}
/>

<MainContainer filled>
  <MainCheckItem text="Dark surface item" inverted />
</MainContainer>
```

#### Parameters

| Parameter | Type | Required | Default | Represents / when to use |
|-----------|------|----------|---------|--------------------------|
| `text` | `string` | No | — | Label string (preferred) |
| `children` | `ReactNode` | No | — | Label fallback if `text` is omitted |
| `checked` | `boolean` | No | `false` | **Initial** checked state only (uncontrolled after mount) |
| `inverted` | `boolean` | No | `false` | Invert colors for filled / dark surfaces |
| `style` | `StyleProp<ViewStyle>` | No | — | Row style |

**Visual rules**

| State | Box | Icon | Label |
|-------|-----|------|-------|
| Off | accent outline | — | primary text, size 14 |
| On | secondary fill | primary ✓ | accent text, strikethrough |
| Off + inverted | primary @ 60% outline | — | inverted primary text |
| On + inverted | primary fill | secondary ✓ | inverted secondary text, strikethrough |

#### Actions

| Action | Type | Required | When it fires | How to use |
|--------|------|----------|---------------|------------|
| `onToggleOn` | `() => void` | No | Checkbox becomes checked | `onToggleOn={() => { … }}` |
| `onToggleOff` | `() => void` | No | Checkbox becomes unchecked | `onToggleOff={() => { … }}` |

---

### MainSwitch

Themed boolean switch.

**When to use:** settings toggles (notifications, flags, etc.).

```tsx
<MainSwitch
  active={false}
  onToggleOn={() => console.log('on')}
  onToggleOff={() => console.log('off')}
/>

<MainContainer filled>
  <MainSwitch inverted />
</MainContainer>
```

#### Parameters

| Parameter | Type | Required | Default | Represents / when to use |
|-----------|------|----------|---------|--------------------------|
| `active` | `boolean` | No | `false` | **Initial** on/off state (uncontrolled after mount) |
| `inverted` | `boolean` | No | `false` | Invert track colors for dark surfaces |
| `disabled` | `boolean` | No | `false` | Disable interaction |
| `style` | `StyleProp<ViewStyle>` | No | — | Passed to RN `Switch` |

**Colors**

| Mode | Track off | Track on | Thumb |
|------|-----------|----------|-------|
| Normal | accent | secondary | primary |
| Inverted | primary @ 60% | primary | primary |

On web, `activeThumbColor` is set so the thumb does not fall back to the browser teal default.

#### Actions

| Action | Type | Required | When it fires | How to use |
|--------|------|----------|---------------|------------|
| `onToggleOn` | `() => void` | No | Switch turns on | `onToggleOn={() => { … }}` |
| `onToggleOff` | `() => void` | No | Switch turns off | `onToggleOff={() => { … }}` |

---

### MainSlider

Custom slider with controllable track/thumb thickness. Fill = secondary, rest = accent (inverted: primary / primary @ 60%).

**When to use:** continuous values (opacity, sizes, RGB channels, etc.) with Flutter-like thickness.

```tsx
<MainSlider
  value={0.5}
  minimumValue={0}
  maximumValue={1}
  onValueChange={(v) => console.log(v)}
  onSlidingComplete={(v) => console.log('done', v)}
  trackHeight={10}
  thumbSize={24}
  hideThumb={false}
/>

<MainContainer filled>
  <MainSlider value={10} minimumValue={0} maximumValue={60} inverted />
</MainContainer>
```

#### Parameters

| Parameter | Type | Required | Default | Represents / when to use |
|-----------|------|----------|---------|--------------------------|
| `value` | `number` | **Yes** | — | Current value |
| `minimumValue` | `number` | No | `0` | Range start |
| `maximumValue` | `number` | No | `1` | Range end |
| `liveUpdate` | `boolean` | No | `false` | When `true`, fire `onValueChange` while dragging (can re-render parents). When `false` (default), value commits on release for smooth dragging |
| `trackHeight` | `number` | No | `10` | Track thickness |
| `thumbSize` | `number` | No | `24` | Thumb diameter when visible |
| `hideThumb` | `boolean` | No | `false` | Transparent thumb; track still draggable |
| `inverted` | `boolean` | No | `false` | Invert track colors; thumb stays primary on inverted |
| `disabled` | `boolean` | No | `false` | Ignore gestures (dimmed) |
| `style` | `StyleProp<ViewStyle>` | No | — | Wrapper style (touch area height 44) |

#### Actions

| Action | Type | Required | When it fires | How to use |
|--------|------|----------|---------------|------------|
| `onValueChange` | `(value: number) => void` | No | On release by default; while dragging if `liveUpdate` | `onValueChange={(v) => setValue(v)}` |
| `onSlidingComplete` | `(value: number) => void` | No | Finger / pointer released | `onSlidingComplete={(v) => save(v)}` |

Thumb/fill move with `Animated` during the gesture so the knob stays responsive even when parent state updates are deferred.

---

## Helpers and constants

| Export | Kind | Description |
|--------|------|-------------|
| `colorWithOpacity(color, opacity)` | function | Apply alpha to hex / rgb(a) |
| `accentFromSecondary(secondary)` | function | Build accent (secondary @ 0.6) |
| `ACCENT_OPACITY` | `0.6` | Accent opacity constant |
| `clampBorderWidth` / `clampBorderRadius` | functions | Clamp border tokens |
| `clampShadowOpacity` / `Blur` / `Spread` / `Offset` | functions | Clamp shadow tokens |
| `MIN_*` / `MAX_*` / `DEFAULT_*` | numbers | Theme token bounds and defaults |
| `PRIMARY_TEXT_SIZE` / `SECONDARY_TEXT_SIZE` | `16` / `14` | Default text sizes |
| `PRIMARY_ICON_SIZE` / `SECONDARY_ICON_SIZE` | `24` / `16` | Default icon sizes |
| `THEME_FONTS` | `ThemeFont[]` | All fonts for pickers |
| `loadMinimalUIFonts` | `() => Promise<void>` | Load bundled fonts at startup |

---

## Notes and caveats

1. **Always** wrap with `ColorsProvider` and call `loadMinimalUIFonts()` before rendering themed text.
2. **Accent** and **shadow color** are derived — do not try to set them directly.
3. **Persistence:** theme changes save to device storage; provider props only seed first launch / empty storage.
4. **MainCheckItem** / **MainSwitch:** `checked` and `active` are **initial** values only (uncontrolled after mount).
5. **MainSlider:** prefer default `liveUpdate={false}` for smooth dragging; enable live updates only when the parent tree is light.
6. **ShadowSidedList:** pass exactly one scrollable child; fades match primary unless `inverted`.
7. **Shadows:** best fidelity with New Architecture / web `boxShadow`; Android may approximate with elevation when New Arch is off.
8. **Example app:** lives in `/example` — use it as the reference for wiring actions and inverted surfaces.
