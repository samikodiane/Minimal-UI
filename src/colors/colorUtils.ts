/** Accent is always secondary at this opacity. */
export const ACCENT_OPACITY = 0.6;

export const DEFAULT_PRIMARY = '#FFFFFF';
export const DEFAULT_SECONDARY = '#000000';

/**
 * Apply an opacity to a color string.
 * Supports #RGB, #RRGGBB, #RRGGBBAA, rgb(), and rgba().
 */
export function colorWithOpacity(color: string, opacity: number): string {
  const clamped = Math.min(1, Math.max(0, opacity));
  const trimmed = color.trim();

  const hex = parseHex(trimmed);
  if (hex) {
    return `rgba(${hex.r}, ${hex.g}, ${hex.b}, ${clamped})`;
  }

  const rgbMatch = trimmed.match(
    /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*[\d.]+\s*)?\)$/i
  );
  if (rgbMatch) {
    return `rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}, ${clamped})`;
  }

  // Fallback: wrap unknown formats as best-effort (named colors won't parse here)
  throw new Error(
    `Unsupported color format: "${color}". Use hex (#RGB / #RRGGBB) or rgb/rgba.`
  );
}

export function accentFromSecondary(secondary: string): string {
  return colorWithOpacity(secondary, ACCENT_OPACITY);
}

function parseHex(color: string): { r: number; g: number; b: number } | null {
  const raw = color.startsWith('#') ? color.slice(1) : color;

  if (/^[0-9a-fA-F]{3}$/.test(raw)) {
    return {
      r: parseInt(raw[0] + raw[0], 16),
      g: parseInt(raw[1] + raw[1], 16),
      b: parseInt(raw[2] + raw[2], 16),
    };
  }

  if (/^[0-9a-fA-F]{6}$/.test(raw) || /^[0-9a-fA-F]{8}$/.test(raw)) {
    return {
      r: parseInt(raw.slice(0, 2), 16),
      g: parseInt(raw.slice(2, 4), 16),
      b: parseInt(raw.slice(4, 6), 16),
    };
  }

  return null;
}
