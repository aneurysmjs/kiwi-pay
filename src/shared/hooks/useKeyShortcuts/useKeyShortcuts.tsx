/* eslint-disable import/prefer-default-export */
import { useEffect } from 'react';

import { Keycodes } from './types';

import { compareHotkeys } from './utils';

import { modifierKeys, modifiersCodeMap, keycodesMap } from './constans';

interface HotkeyHandler {
  (evt?: KeyboardEvent): void;
}

const hotkeysMap = new Map<string, HotkeyHandler>();
const keysToPressMap = new Map<string, string[]>();

let pressedKeys: string[] = [];

export const getKeycode = (key: string): Keycodes | string => {
  return modifiersCodeMap[key] || keycodesMap[key] || key.toLowerCase();
};

const handleKeyDown = (evt: KeyboardEvent) => {
  console.log('evt', evt);

  const { code } = evt;

  if (pressedKeys.includes(code)) {
    pressedKeys.push(code);
  }

  modifierKeys.forEach((keyName) => {
    const isModifierPressed = evt[keyName];

    if (isModifierPressed && !pressedKeys.includes(code)) {
      pressedKeys.push(code);
    } else if (!isModifierPressed && pressedKeys.indexOf(code) > -1) {
      // pressedKeys.splice(pressedKeys.indexOf(key), 1);
    } else if (keyName === 'metaKey' && isModifierPressed && pressedKeys.length === 3) {
      /**
       * Fix if Command is pressed
       */
      if (!(evt.ctrlKey || evt.shiftKey || evt.altKey)) {
        pressedKeys = pressedKeys.slice(pressedKeys.indexOf(code));
      }
    }
  });

  hotkeysMap.forEach((callback, hotkey) => {
    let keysToPress: string[] = [];

    if (!keysToPressMap.has(hotkey)) {
      const keyShortcut = hotkey.split('+');
      for (let i = 0; i < keyShortcut.length; i += 1) {
        keysToPress.push(getKeycode(keyShortcut[i]));
      }
      keysToPressMap.set(hotkey, keysToPress);
    } else {
      keysToPress = keysToPressMap.get(hotkey) as string[];
    }

    if (compareHotkeys(keysToPress, pressedKeys)) {
      callback(evt);
    }

    // console.log('keysToPress', keysToPress);
  });

  // console.log('pressedKeys', pressedKeys);
};

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

const addHotkey = (hotkeys: string, callback: HotkeyHandler) => {
  pressedKeys = [];

  if (!hotkeysMap.has(hotkeys)) {
    hotkeysMap.set(hotkeys, callback);
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
      keysToPressMap.clear();
    };
  }, []);

  return addHotkey;
};
