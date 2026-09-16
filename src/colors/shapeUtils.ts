export const MIN_BORDER_WIDTH = 0;
export const MAX_BORDER_WIDTH = 3;
export const DEFAULT_BORDER_WIDTH = 2;

export const MIN_BORDER_RADIUS = 0;
export const MAX_BORDER_RADIUS = 60;
export const DEFAULT_BORDER_RADIUS = 15;

export function clampBorderWidth(value: number): number {
  if (!Number.isFinite(value)) {
    return DEFAULT_BORDER_WIDTH;
  }
  return Math.min(MAX_BORDER_WIDTH, Math.max(MIN_BORDER_WIDTH, value));
}

export function clampBorderRadius(value: number): number {
  if (!Number.isFinite(value)) {
    return DEFAULT_BORDER_RADIUS;
  }
  return Math.min(MAX_BORDER_RADIUS, Math.max(MIN_BORDER_RADIUS, value));
}
