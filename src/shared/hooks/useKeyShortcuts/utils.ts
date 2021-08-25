import { Alphabet, Digits } from '~/shared/types';

import { CharCodeMap } from './types';

/**
 * @description
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
 * deletes an item from an array without modifing it.
 *
 * @template T
 * @function
 * @param {T[]} arr array with elements
 * @param {number} index array's index.
 * @returns T[]
 */
export const deleteItem = <T>(arr: T[], index: number): T[] => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
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
 *
 * @example
 *
 * {
 *  a: 'KeyA'
 *  ...
 *  z: 'KeyZ'
 * }
 */
export const makeLettersKeycode = (): CharCodeMap<Alphabet, 'Key'> =>
  makeKeycodeFromRange(97, 123, 'Key');

/**
 * @description
 * Builds an object of digits from 0 to 9 with their respective keycodes.
 *
 * @function
 * @returns CharCodeMap<Digits, 'Digit'>
 *
 *  @example
 *
 * {
 *  0: 'Digit0'
 *  ...
 *  9: 'Digit9'
 * }
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

/**
 * @description
 * Function that makes and array of hotkeys by splitting the given string
 *
 * @function
 * @param {string} keyShortcuts all the hotkeys to process.
 * @returns string[]
 *
 * @example
 *
 * 'ctrl+shift+a, ctrl+shift+b' => ['ctrl+shift+a', 'ctrl+shift+b']
 *
 */
export const getKeys = (keyShortcuts: string): string[] => {
  let hotkeys = keyShortcuts;

  if (typeof hotkeys !== 'string') {
    hotkeys = '';
  }

  // remove empty spaces
  // 'ctrl+shift+a, ctrl+shift+b' => 'ctrl+shift+a,ctrl+shift+b'
  hotkeys = hotkeys.replace(/\s/g, '');

  // split by ','
  // 'ctrl+shift+a,ctrl+shift+b' => ['ctrl+shift+a', 'ctrl+shift+b']
  const keys = hotkeys.split(',');

  // check if there's trailing empty spaces.
  let lastIndex = keys.lastIndexOf('');

  // remove all traling empty spaces and replace them with only one ','
  // ['ctrl+shift+a', 'ctrl+shift+b', '', '', ''] => ['ctrl+shift+a', 'ctrl+shift+b', ',']
  for (; lastIndex >= 0; ) {
    keys[lastIndex - 1] += ',';
    keys.splice(lastIndex, 1);
    lastIndex = keys.lastIndexOf('');
  }

  return keys;
};

/**
 * @description
 * Gets only the modifiers from the keyshortcut.
 *
 * @function
 * @param {string[]} keyshortcut the key combinations that forms the hotkey.
 * @returns string[]
 *
 * @example
 *
 * ['ctrl+shift+a'] => ['ctrl+shift']
 *
 */
export const getModifiers = (keyshortcut: string[]): string[] => {
  const modifiers = keyshortcut.slice(0, keyshortcut.length - 1);
  return modifiers;
};

/**
 * @description
 * checks whether the event is of type `keydown`
 *
 * @function
 * @param {KeyboardEvent} event keybooard event.
 *
 * @returns boolean
 */
export const isKeydown = (event: KeyboardEvent): boolean => event.type === 'keydown';
