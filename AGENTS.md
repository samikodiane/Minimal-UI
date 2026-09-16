# AGENTS.md — Minimal UI

Instructions for AI coding agents working **in this repository** or **integrating `@samikodiane/minimal-ui` into an app**.

Human API detail lives in [README.md](./README.md). Prefer this file for constraints, layout, and “how to change things safely.”

---

## What this is

- **Package:** `@samikodiane/minimal-ui`
- **Repo:** https://github.com/samikodiane/Minimal-UI
- **Stack:** Expo SDK **57**, React Native, TypeScript
- **Role:** Shared UI kit with **one runtime theme** (colors, borders, shadows, one font) consumed by Expo apps

**License:** PolyForm Noncommercial 1.0.0 (`LICENSE`). Do **not** suggest commercial redistribution or relicensing to MIT/Apache. Do not strip or weaken the license.

---

## Install / import (consumer apps)

```bash
npm install github:samikodiane/Minimal-UI
# or pin: github:samikodiane/Minimal-UI#main
```

```json
"@samikodiane/minimal-ui": "github:samikodiane/Minimal-UI#main"
```

```ts
import {
  ColorsProvider,
  loadMinimalUIFonts,
  useColors,
  MainContainer,
  MainText,
} from '@samikodiane/minimal-ui';
```

Required host-resolvable deps (also listed on the package): `expo-font`, `expo-linear-gradient`, `@react-native-async-storage/async-storage`. Peers: `expo`, `react`, `react-native`.

---

## Non‑negotiable product rules

1. **One theme at a time** — primary, secondary, borders, shadows, single active font.
2. **Accent is derived** — always secondary @ 60% opacity. Never add a public `setAccent`.
3. **Shadow color is derived** — secondary at `opacity / 100`. Never expose a free-form shadow color setter.
4. **Wrap + fonts** — apps must use `ColorsProvider` and call `loadMinimalUIFonts()` before themed text.
5. **`inverted`** — many components support inverted styling for dark / filled surfaces; keep that convention when adding UI.
6. **Persistence** — theme is stored via AsyncStorage (`@minimal-ui/colors`). Provider props are **initial defaults** until hydrate; do not “fix” props to overwrite storage every render.

---

## Repository layout

| Path | Purpose |
|------|---------|
| `src/` | Library source (edit here) |
| `src/index.ts` | Public exports — **only** export intentional API |
| `src/colors/` | `ColorsProvider`, tokens, clamps, storage |
| `src/typography/` | `ThemeFont`, font loading (`@expo-google-fonts/*`), text sizes |
| `src/components/` | UI components (`Main*`, `ShadowSidedList`) |
| `build/` | Compiled output (`main` / `types`) — generated |
| `example/` | Demo Expo app; local dependency `file:..` |
| `internal/module_scripts/` | build / clean / prepare / test helpers |
| `README.md` | Full human docs (props tables, install) |
| `LICENSE` | PolyForm Noncommercial |

Do not hand-edit `build/` as the source of truth; run the build scripts.

---

## Local development

```bash
# from repo root
npm run build
npm run start    # → example app
npm run android / ios / web
```

Example app wiring (Metro / TS paths) maps `@samikodiane/minimal-ui` → this workspace. When renaming the package or paths, update:

- root `package.json` `name`
- `example/package.json` dependency
- `example/metro.config.js` `extraNodeModules`
- `example/tsconfig.json` `paths`
- `example/webpack.config.js` transpile list
- `example/App.tsx` imports

**Expo docs:** use https://docs.expo.dev/versions/v57.0.0/ — SDK APIs change; do not invent from older Expo knowledge.

---

## When adding or changing components

- Put new UI under `src/components/<Name>/`, export from `src/components/index.ts` and `src/index.ts`.
- Read theme only via `useColors()` inside `ColorsProvider`.
- Prefer existing patterns: `inverted`, themed borders/shadows, primary/secondary/accent roles.
- Wire a small demo in `example/App.tsx` when adding interactive controls.
- Update `README.md` props / actions tables for public API changes.
- Keep TypeScript props exported (`export type …Props`).

### Known implementation notes

- Fonts are **bundled** offline via `@expo-google-fonts/*` in `loadMinimalUIFonts` — do not switch back to CDN-only loading for theme fonts.
- `MainContainer` shadows prefer cross-platform `boxShadow` when available; keep Android/iOS fallbacks coherent.
- `MainSlider`: default `liveUpdate={false}`; use `Animated` for the thumb/track during drag.
- `MainCheckItem` / `MainSwitch`: `checked` / `active` are **initial** (uncontrolled after mount) unless you intentionally change that contract and document it.
- `ShadowSidedList`: expect exactly one scrollable child; fades follow primary unless `inverted`.

---

## What agents should not do

- Do not rename the package away from `@samikodiane/minimal-ui` without an explicit user request.
- Do not make the license MIT or “more permissive” for convenience.
- Do not add a second parallel theme system or hard-code colors that ignore `useColors()`.
- Do not commit secrets, tokens, or force-push.
- Do not treat `example/` as the publishable package; the library root is.

---

## Quick consumer bootstrap

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
      <Screen />
    </ColorsProvider>
  );
}

function Screen() {
  const { colors } = useColors();
  return (
    <MainContainer style={{ backgroundColor: colors.primary }}>
      <MainText variant="primary">Hello</MainText>
    </MainContainer>
  );
}
```

For props, actions, and token ranges, read [README.md](./README.md).
