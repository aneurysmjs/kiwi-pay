import { Alphabet, Digits } from '~/shared/types';

import { Keycodes, CharCodeMap } from './types';

/**
 *  @description
 * Compares two arrays that are out of order.
 *
 * @template T
 * @function
 * @param {T[]} arrOne array with elements
 * @param {T[]} arrTwo array that should get compared
 * @returns boolean
 */
const compareArrays = <T>(arrOne: T[], arrTwo: T[]) => {
  return (
    arrOne.length === arrTwo.length &&
    arrOne.every((element) => {
      return arrTwo.includes(element);
    })
  );
};

/**
 * @description
 * Builds an object from characters of a determined unicode range with their respective keycodes.
 *
 * @function
 * @param {number} from Start of the range
 * @param {number} to End of the range
 * @param {string} keycodePrefix Keycode's prefix
 * @returns Keycode<Prefix>
 */
const makeKeycodeFromRange = <Chars extends string, Prefix extends string>(
  from: number,
  to: number,
  keycodePrefix: Prefix,
): CharCodeMap<Chars, typeof keycodePrefix> => {
  const keyCodes = {} as CharCodeMap<Chars, typeof keycodePrefix>;
  let char = '';

  for (let i = from; i < to; i += 1) {
    char = String.fromCharCode(i);

    keyCodes[char] = `${keycodePrefix}${char.toUpperCase()}`;
  }

  return keyCodes;
};

/**
 * @description
 * Builds an object of letters from `a` to `z` with their respective keycodes.
 *
 * @function
 * @returns CharCodeMap<Alphabet, 'Key'>
 */
export const makeLettersKeycode = (): CharCodeMap<Alphabet, 'Key'> =>
  makeKeycodeFromRange(97, 123, 'Key');

/**
 * @description
 * Builds an object of digits from 0 to 9 with their respective keycodes.
 *
 * @function
 * @returns CharCodeMap<Digits, 'Digit'>
 */
export const makeDigitsKeycode = (): CharCodeMap<Digits, 'Digit'> =>
  makeKeycodeFromRange(48, 58, 'Digit');

/**
 * @description
 * it compares the keys combitation against the pressed keys to see
 * of the user typed the correct hotkey combination.
 *
 * @function
 * @param keysToPress Keys that conforms the hotkeys
 * @param pressKeys Pressed keys that should match againts hotkeys
 * @returns boolean
 */
export const compareHotkeys = (keysToPress: string[], pressKeys: string[]): boolean => {
  return compareArrays(keysToPress, pressKeys);
};

/**
 * @description
 * Checks of the current character is between a-z range.
 *
 * @function
 * @param {string} char character
 * @returns boolean
 */
export const isLetterInRange = (char: string): boolean => {
  const code = char.toLowerCase().charCodeAt(0);

  return code > 96 && code < 123;
};
