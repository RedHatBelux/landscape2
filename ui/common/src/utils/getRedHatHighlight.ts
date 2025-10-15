import { BaseItem } from '../types/types';

export interface RedHatHighlight {
  color: string;
  backgroundColor: string;
}

const DEFAULT_COLOR = '#ee0000';
const DEFAULT_BACKGROUND = 'rgba(238, 0, 0, 0.12)';
const SHORT_HEX_REGEX = /^#([0-9a-fA-F]{3})$/;
const LONG_HEX_REGEX = /^#([0-9a-fA-F]{6})$/;

const normalizeHex = (value: string): string | undefined => {
  const trimmed = value.trim();
  if (LONG_HEX_REGEX.test(trimmed)) {
    return trimmed.toLowerCase();
  }
  const shortMatch = trimmed.match(SHORT_HEX_REGEX);
  if (shortMatch && shortMatch[1]) {
    const [r, g, b] = shortMatch[1].split('');
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }
  return undefined;
};

const hexToRgba = (hex: string, alpha: number): string => {
  const value = hex.slice(1);
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const getRedHatHighlight = (item?: BaseItem | null): RedHatHighlight | undefined => {
  if (!item || !item.redhat || !item.redhat.supported) {
    return undefined;
  }

  const color = item.redhat.color?.trim() || DEFAULT_COLOR;
  const normalizedHex = normalizeHex(color);
  const backgroundColor =
    (normalizedHex ? hexToRgba(normalizedHex, 0.12) : undefined) ?? DEFAULT_BACKGROUND;

  return {
    color,
    backgroundColor,
  };
};
