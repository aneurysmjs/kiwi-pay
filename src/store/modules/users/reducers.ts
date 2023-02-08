/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */

import toKeyedObject from '@/utils/toKeyedObject';

import {
  UsersActions,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  UsersState,
} from './types';

const initialState: UsersState = {
  users: {},
  isLoading: false,
  error: null,
};

export function usersReducer(state = initialState, action: UsersActions) {
  if (action.type === GET_USERS_REQUEST) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === GET_USERS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      error: null,
      users: toKeyedObject(action.payload, 'id'),
    };
  }

  if (action.type === GET_USERS_FAILURE) {
    return {
      ...state,
      error: true,
    };
  }

  return state;
}
