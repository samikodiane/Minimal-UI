export const MIN_SHADOW_OPACITY = 0;
export const MAX_SHADOW_OPACITY = 100;
export const DEFAULT_SHADOW_OPACITY = 0;

export const MIN_SHADOW_BLUR = 0;
export const MAX_SHADOW_BLUR = 24;
export const DEFAULT_SHADOW_BLUR = 0;

export const MIN_SHADOW_SPREAD = 0;
export const MAX_SHADOW_SPREAD = 8;
export const DEFAULT_SHADOW_SPREAD = 0;

export const MIN_SHADOW_OFFSET = -16;
export const MAX_SHADOW_OFFSET = 16;
export const DEFAULT_SHADOW_OFFSET = 0;

function clamp(value: number, min: number, max: number, fallback: number): number {
  if (!Number.isFinite(value)) {
    return fallback;
  }
  return Math.min(max, Math.max(min, value));
}

export function clampShadowOpacity(value: number): number {
  return clamp(value, MIN_SHADOW_OPACITY, MAX_SHADOW_OPACITY, DEFAULT_SHADOW_OPACITY);
}

export function clampShadowBlur(value: number): number {
  return clamp(value, MIN_SHADOW_BLUR, MAX_SHADOW_BLUR, DEFAULT_SHADOW_BLUR);
}

export function clampShadowSpread(value: number): number {
  return clamp(value, MIN_SHADOW_SPREAD, MAX_SHADOW_SPREAD, DEFAULT_SHADOW_SPREAD);
}

export function clampShadowOffset(value: number): number {
  return clamp(value, MIN_SHADOW_OFFSET, MAX_SHADOW_OFFSET, DEFAULT_SHADOW_OFFSET);
}
