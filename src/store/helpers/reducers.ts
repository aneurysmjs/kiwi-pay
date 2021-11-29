/* eslint-disable default-param-last */
import { combineReducers, Action } from 'redux';

/**
 * TS4023: Exported Variable <x> has or is using name <y> from external module but cannot be named
 * @link https://stackoverflow.com/questions/43900035/ts4023-exported-variable-x-has-or-is-using-name-y-from-external-module-but
 */

type LoadingState = {
  [K: string]: boolean;
};

const loadingInitialState: LoadingState = {};

function loadingReducer(state = loadingInitialState, action: Action) {
  const { type } = action;
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

  // not a *_REQUEST / *_SUCCESS /  *_FAILURE actions, so we ignore them
  if (!matches) {
    return state;
  }

  const [, requestName, requestState] = matches;

  return {
    ...state,
    // Store whether a request is happening at the moment or not
    // e.g. will be true when receiving GET_TODOS_REQUEST
    //      and false when receiving GET_TODOS_SUCCESS / GET_TODOS_FAILURE
    [requestName]: requestState === 'REQUEST',
  };
}

type ErrorState = {
  [K: string]: boolean | string;
};

type ErrorAction = {
  payload: string;
} & Action;

const errorInitialState: ErrorState = {};

function errorReducer(state = errorInitialState, action: ErrorAction) {
  const { type, payload } = action;
  const matches = /(.*)_(REQUEST|FAILURE)/.exec(type);

  // not a *_REQUEST / *_FAILURE actions, so we ignore them
  if (!matches) {
    return state;
  }

  const [, requestName, requestState] = matches;

  return {
    ...state,
    // Store errorMessage
    // e.g. stores errorMessage when receiving GET_TODOS_FAILURE
    //      else clear errorMessage when receiving GET_TODOS_REQUEST
    [requestName]: requestState === 'FAILURE' ? payload : '',
  };
}

// eslint-disable-next-line import/prefer-default-export
export const apiReducer = combineReducers({
  loading: loadingReducer,
  error: errorReducer,
});
