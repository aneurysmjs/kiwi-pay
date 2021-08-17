import { makeDigitsKeycode, makeLettersKeycode } from './utils';

import type { ModifierKeys } from './types';

export const modifierKeys: ModifierKeys[] = ['ctrlKey', 'altKey', 'shiftKey', 'metaKey'];

export const lettersKeycodeMap = makeLettersKeycode();
export const digitsKeycodeMap = makeDigitsKeycode();

export const modifiersCodeMap = {
  // shift
  shift: 'ShiftLeft',
  shiftKey: 'ShiftLeft',
  // alt
  alt: 'AltLeft',
  altKey: 'AltLeft',
  // control
  ctrl: 'ControlLeft',
  ctrlKey: 'ControlLeft',
  // meta
  meta: 'OSLeft',
  metaKey: 'OSLeft',
} as const;

export const specialKeysKeycodeMap = {
  backspace: 'Backspace',
  enter: 'Enter',
} as const;

export const keycodesMap = {
  ...lettersKeycodeMap,
  ...digitsKeycodeMap,
  ...specialKeysKeycodeMap,
  ...modifiersCodeMap,
} as const;
