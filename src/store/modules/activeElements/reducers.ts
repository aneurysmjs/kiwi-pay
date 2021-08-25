import { AnyAction } from 'redux';

import { ActiveElementState } from './types';
import { setActiveElement, deleteActiveElement } from './actions';

const initialState = {} as ActiveElementState;

// eslint-disable-next-line import/prefer-default-export
export function activeElementsReducer(state = initialState, action: AnyAction): ActiveElementState {
  if (setActiveElement.match(action)) {
    return {
      [action.payload]: {
        id: action.payload,
      },
    };
  }

  if (deleteActiveElement.match(action)) {
    // eslint-disable-next-line no-param-reassign
    delete state[action.payload];

    return state;
  }

  return state;
}
