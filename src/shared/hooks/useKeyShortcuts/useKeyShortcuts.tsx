/* eslint-disable import/prefer-default-export */
import { useEffect } from 'react';

import { Keycodes } from './types';
import { compareHotkeys, getKeys } from './utils';
import { modifierKeys, modifiersCodeMap, keycodesMap } from './constans';

interface HotkeyHandler {
  (evt?: KeyboardEvent, hotkeyInfo?: HotkeyInfo): void;
}

interface HotkeyInfo {
  callback: HotkeyHandler;
  keyShortcuts: string[];
  hotkey: string;
}

const hotkeysMap = new Map<string, HotkeyInfo>();

let pressedKeys: string[] = [];

/**
 * @description
 * gets the corresponding keycode.
 *
 * @function
 * @param key Keyshorcut
 * @returns Keycodes
 *
 * @example
 *
 * getKeycode('ctrl'); // 'ControLeft;
 * getKeycode('a'); // 'KeyA'
 */
const getKeycode = (key: string): Keycodes => {
  return modifiersCodeMap[key] || keycodesMap[key] || key.toLowerCase();
};

const handleKeyDown = (evt: KeyboardEvent) => {
  const { code } = evt;

  if (!pressedKeys.includes(code)) {
    pressedKeys.push(code);
  }

  modifierKeys.forEach((keyName) => {
    const isModifierPressed = evt[keyName];

    // if one of the modifier keys is pressed and doesn't exist on `pressedKeys`
    // then is able to added.
    if (isModifierPressed && !pressedKeys.includes(code)) {
      pressedKeys.push(code);
    } else if (keyName === 'metaKey' && isModifierPressed && pressedKeys.length === 3) {
      /**
       * Fix if Command is pressed
       */
      if (!(evt.ctrlKey || evt.shiftKey || evt.altKey)) {
        pressedKeys = pressedKeys.slice(pressedKeys.indexOf(code));
      }
    }
  });

  hotkeysMap.forEach((info) => {
    const keysToPress = info.keyShortcuts;

    if (compareHotkeys(keysToPress, pressedKeys)) {
      info.callback(evt, info);
    }
  });

  // console.log('pressedKeys', pressedKeys);
};

/**
 * @description
 * restores all pressed keys on keyup event
 *
 * @function
 * @param {KeyboardEvent} evt keyboard event
 * @returns void
 */
const handleKeyUp = (evt: KeyboardEvent) => {
  const { code } = evt;

  const i = pressedKeys.indexOf(code);

  if (i >= 0) {
    pressedKeys.splice(i, 1);
  }

  if (evt.key && evt.key.toLowerCase() === 'meta') {
    pressedKeys.splice(0, pressedKeys.length);
  }
};

/**
 * @description
 * adds hotkeys with their respective callback.
 *
 * @param {string} keys keys combinations to trigger.
 * @param {HotkeyHandler} callback function to be called when the hotkeys are valid.
 * @returns void
 */
const addHotkey = (keys: string, callback: HotkeyHandler): void => {
  const hotkeys = getKeys(keys);

  for (let i = 0; i < hotkeys.length; i += 1) {
    const hotkey = hotkeys[i];

    if (!hotkeysMap.has(hotkey)) {
      pressedKeys = [];
      const keyShortcuts = hotkey.split('+').map(getKeycode);

      hotkeysMap.set(hotkey, { callback, keyShortcuts, hotkey });
    }
  }
};

export const useKeyShortcuts = (): typeof addHotkey => {
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);

      hotkeysMap.clear();
    };
  }, []);

  return addHotkey;
};
