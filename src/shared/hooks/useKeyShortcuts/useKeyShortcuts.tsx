/* eslint-disable import/prefer-default-export */
import { useEffect } from 'react';

const modifierKeys = ['ctrlKey', 'altKey', 'shiftKey', 'metaKey'];

const modifiersMap = {
  ctrl: 'Control',
  alt: 'Alt',
  shift: 'Shift',
};

interface HotkeyHandler {
  (evt?: KeyboardEvent): void;
}

const hotkeysMap = new Map<string, HotkeyHandler>();

let pressedKeys: string[] = [];

const getKey = (key: string) => {
  return modifiersMap[key] || key;
};

const handleKeyDown = (evt: KeyboardEvent) => {
  console.log('evt', evt);

  const { key } = evt;

  if (pressedKeys.indexOf(key) === -1) {
    pressedKeys.push(key);
  }

  modifierKeys.forEach((keyName) => {
    const isModifierPressed = evt[keyName];
    // const key = modifierMap[keyName];
    if (isModifierPressed && pressedKeys.indexOf(key) === -1) {
      pressedKeys.push(key);
    } else if (!isModifierPressed && pressedKeys.indexOf(key) > -1) {
      // pressedKeys.splice(pressedKeys.indexOf(key), 1);
    } else if (keyName === 'metaKey' && isModifierPressed && pressedKeys.length === 3) {
      /**
       * Fix if Command is pressed
       */
      if (!(evt.ctrlKey || evt.shiftKey || evt.altKey)) {
        pressedKeys = pressedKeys.slice(pressedKeys.indexOf(key));
      }
    }
  });

  hotkeysMap.forEach((callback, hotkey) => {
    const keyShortcut = hotkey.split('+');
    const keysToPress = [];

    for (let i = 0; i < keyShortcut.length; i += 1) {
      keysToPress.push(getKey(keyShortcut[i]));
    }

    if (keysToPress.sort().join('') === pressedKeys.sort().join('')) {
      callback(evt);
    }
  });
};

const handleKeyUp = (evt: KeyboardEvent) => {
  const { key } = evt;

  const i = pressedKeys.indexOf(key);

  if (i >= 0) {
    pressedKeys.splice(i, 1);
  }
  // 特殊处理 cmmand 键，在 cmmand 组合快捷键 keyup 只执行一次的问题
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
    };
  }, []);

  return addHotkey;
};
