/* eslint-disable import/prefer-default-export */
import { useEffect } from 'react';

import { Keycodes } from './types';
import { compareHotkeys, getKeys, getModifiers, isKeydown } from './utils';
import { modifierKeys, modifiersCodeMap, keycodesMap, modifierKeysMap } from './constans';

interface HotkeyHandler {
  (evt?: KeyboardEvent, hotkeyInfo?: HotkeyInfo): void;
}

interface HotkeyInfo {
  callback: HotkeyHandler;
  keyShortcuts: string[];
  hotkey: string;
  mods: string[];
}

const hotkeysMap = new Map<string, HotkeyInfo>();

let pressedKeys: string[] = [];

const modifiers = {
  ControlLeft: false,
  ShiftLeft: false,
  AltLeft: false,
  MetaLeft: false,
};

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
  return modifiersCodeMap[key] || keycodesMap[key];
};

const eventHandler = (evt: KeyboardEvent, hotkeyInfo: HotkeyInfo): void => {
  let modifiersMatch;

  modifiersMatch = hotkeyInfo.mods.length > 0;

  Object.keys(modifiers).forEach((modifier) => {
    if (
      (!modifiers[modifier] && hotkeyInfo.mods.includes(modifier)) ||
      (modifiers[modifier] && !hotkeyInfo.mods.includes(modifier))
    ) {
      modifiersMatch = false;
    }
  });

  if (
    (hotkeyInfo.mods.length === 0 &&
      !modifiers.ControlLeft &&
      !modifiers.ShiftLeft &&
      !modifiers.AltLeft &&
      !modifiers.MetaLeft) ||
    modifiersMatch
  ) {
    hotkeyInfo.callback(evt, hotkeyInfo);
  }
};

const keyHandler = (evt: KeyboardEvent) => {
  const { code } = evt;

  if (!pressedKeys.includes(code)) {
    pressedKeys.push(code);
  }

  modifierKeys.forEach((keyName) => {
    const isModifierPressed = evt[keyName];
    const modifierCode = modifiersCodeMap[keyName];

    // if one of the modifier keys is pressed and doesn't exist on `pressedKeys`
    // then is able to added.
    if (isModifierPressed && !pressedKeys.includes(modifierCode)) {
      pressedKeys.push(code);
    } else if (!isModifierPressed && pressedKeys.includes(modifierCode)) {
      // remove modifier key after being pressed
      pressedKeys.splice(pressedKeys.indexOf(modifierCode), 1);
    } else if (keyName === 'metaKey' && isModifierPressed && pressedKeys.length === 3) {
      /**
       * Fix if Command is pressed
       */
      if (!(evt.ctrlKey || evt.shiftKey || evt.altKey)) {
        pressedKeys = pressedKeys.slice(pressedKeys.indexOf(code));
      }
    }
  });

  Object.keys(modifiers).forEach((modifierKey) => {
    modifiers[modifierKey] = evt[modifierKeysMap[modifierKey]];
  });

  if (!hotkeysMap.has(code)) {
    return;
  }

  hotkeysMap.forEach((info) => {
    if (isKeydown(evt)) {
      const keysToPress = info.keyShortcuts;

      if (compareHotkeys(keysToPress, pressedKeys)) {
        eventHandler(evt, info);
      }
    }
  });
};

/**
 * @description
 * restores all pressed keys on keyup event
 *
 * @function
 * @param {KeyboardEvent} evt keyboard event
 * @returns void
 */
const cleanKeys = (evt: KeyboardEvent) => {
  const { code } = evt;

  const i = pressedKeys.indexOf(code);

  if (i >= 0) {
    pressedKeys.splice(i, 1);
  }

  if (evt.key && evt.key.toLowerCase() === 'meta') {
    pressedKeys.splice(0, pressedKeys.length);
  }

  if (code in modifiers) {
    modifiers[code] = false;
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
  pressedKeys = [];
  const hotkeys = getKeys(keys);
  let mods: string[] = [];

  for (let i = 0; i < hotkeys.length; i += 1) {
    const hotkey = hotkeys[i];
    const keyShortcuts = hotkey.split('+');
    const key = keyShortcuts[keyShortcuts.length - 1];
    const keyCode = getKeycode(key);

    if (keyShortcuts.length > 1) {
      mods = getModifiers(keyShortcuts).map(getKeycode);
    }

    if (!hotkeysMap.has(keyCode)) {
      hotkeysMap.set(keyCode, {
        callback,
        keyShortcuts: keyShortcuts.map(getKeycode),
        hotkey,
        mods,
      });
    }
  }
};

const handleKeyDown = keyHandler;

const handleKeyUp = (evt: KeyboardEvent) => {
  keyHandler(evt);
  cleanKeys(evt);
};

const focusHandler = () => {
  pressedKeys = [];
};

export const useKeyShortcuts = (): typeof addHotkey => {
  useEffect(() => {
    window.addEventListener('focus', focusHandler);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('focus', focusHandler);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);

      hotkeysMap.clear();
    };
  }, []);

  return addHotkey;
};
