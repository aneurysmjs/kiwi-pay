import { makeDigitsKeycode, makeLettersKeycode } from './utils';

import type { ModifierKeys } from './types';

export const modifierKeys: ModifierKeys[] = ['ctrlKey', 'altKey', 'shiftKey', 'metaKey'];

export const lettersKeycodeMap = makeLettersKeycode();
export const digitsKeycodeMap = makeDigitsKeycode();

export const modifierKeysMap = {
  // from code to event property name
  ShiftLeft: 'shiftKey',
  AltLeft: 'altKey',
  ControlLeft: 'ctrlKey',
  MetaLeft: 'metaKey',
};

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
  meta: 'MetaLeft',
  metaKey: 'MetaLeft',
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
