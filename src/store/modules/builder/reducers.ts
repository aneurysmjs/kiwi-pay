/* eslint-disable no-param-reassign */
import { AnyAction } from 'redux';
import { v4 as uuidV4 } from 'uuid';
import produce from 'immer';

import { addRow, addRowElement, sortRows, sortRowElements, deleteRow } from './actions';
import { BuilderState } from './types';

// function updateItem<T, I extends Number, U>(arr: T[], index: number, item) {
//   return [...arr.slice(0, index), item, ...arr.slice(index + 1)];
// }

// function deleteItem<T>(arr: T[], index: number) {
//   return [...arr.slice(0, index), ...arr.slice(index + 1)];
// }

function makeId() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 5; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function swap<T>(arr: T, indexA: number, indexB: number) {
  const temp = arr[indexA];

  arr[indexA] = arr[indexB];
  arr[indexB] = temp;

  return [...arr];
}

const initialState: BuilderState = {
  rows: {},
  rowElements: {},
};

let rowOrder = -1;
let rowElementOrder = -1;

// function swapObject<T extends Row>(sourceObj: T, sourceKey, targetObj, targetKey) {
//   var temp = sourceObj[sourceKey];
//   sourceObj[sourceKey] = targetObj[targetKey];
//   targetObj[targetKey] = temp;
// }

// function swapProps<T, >(sourceObj: T, sourceKey, targetObj, targetKey) {
//   var temp = sourceObj[sourceKey];
//   sourceObj[sourceKey] = targetObj[targetKey];
//   targetObj[targetKey] = temp;
// }

// eslint-disable-next-line import/prefer-default-export
export const builderReducer = produce((state, action: AnyAction) => {
  if (addRow.match(action)) {
    const id = uuidV4();
    // return {
    //   ...state,
    //   rows: {
    //     ...state.rows,
    //     [id]: {
    //       id,
    //       order: (rowOrder += 1),
    //       text: makeId(),
    //     },
    //   },
    // };

    state.rows[id] = {
      id,
      order: (rowOrder += 1),
      text: makeId(),
    };

    return state;
  }
  if (deleteRow.match(action)) {
    const { payload } = action;

    delete state.rows[payload];

    return state;
  }

  if (addRowElement.match(action)) {
    const id = uuidV4();
    // return {
    //   ...state,
    //   rowElements: {
    //     ...state.rowElements,
    //     [id]: {
    //       id,
    //       text: makeId(),
    //       rowId: action.payload.rowId,
    //       order: (rowElementOrder += 1),
    //     },
    //   },
    // };

    state.rowElements[id] = {
      id,
      text: makeId(),
      rowId: action.payload.rowId,
      order: (rowElementOrder += 1),
    };

    return state;
  }

  if (sortRows.match(action)) {
    const { hoverId, dragId } = action.payload;

    return {
      ...state,
      rows: {
        ...state.rows,
        [dragId]: {
          ...state.rows[dragId],
          order: state.rows[hoverId].order,
        },
        [hoverId]: {
          ...state.rows[hoverId],
          order: state.rows[dragId].order,
        },
      },
    };
  }

  if (sortRowElements.match(action)) {
    const { hoverId, dragId } = action.payload;

    return {
      ...state,
      rowElements: {
        ...state.rowElements,
        [dragId]: {
          ...state.rowElements[dragId],
          order: state.rowElements[hoverId].order,
        },
        [hoverId]: {
          ...state.rowElements[hoverId],
          order: state.rowElements[dragId].order,
        },
      },
    };
  }

  return state;
}, initialState);
