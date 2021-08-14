import { Alphabet, Digits, Valueof } from '~/shared/types';

export type CharCodeMap<Chars extends string, Prefix extends string> = {
  [Char in Chars]: `${Prefix}${Char extends Alphabet ? Capitalize<Char> : Char}`;
};

export type ModifierKeys = keyof Pick<KeyboardEvent, 'ctrlKey' | 'altKey' | 'shiftKey' | 'metaKey'>;

export type Modifiers = 'ControlLeft' | 'AltLeft' | 'ShiftLeft' | 'OSLeft';

export type SpecialKeys = 'Backspace' | 'Enter';

export type Keycodes =
  | Valueof<CharCodeMap<Alphabet, 'Key'>>
  | Valueof<CharCodeMap<Digits, 'Digit'>>
  | Modifiers
  | SpecialKeys;
