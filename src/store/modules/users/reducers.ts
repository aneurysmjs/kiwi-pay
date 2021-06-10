import { AnyAction } from 'redux';

import { UserState, User } from './types';
import { addUser, findUser } from './actions';

const initialState: UserState = {
  users: [
    {
      name: 'jero',
      lastName: 'js',
      id: '2342134124',
      location: {
        city: 'Cali',
        country: 'Colombia',
        adress: 'carrera 30#33-10',
      },
    },
  ],
  user: {} as User,
};

// eslint-disable-next-line import/prefer-default-export
export function usersReducer(state = initialState, action: AnyAction): UserState {
  if (addUser.match(action)) {
    return {
      ...state,
      users: [...state.users, action.payload],
    };
  }

  if (findUser.match(action)) {
    return {
      ...state,
      user: state.users.find(({ id }) => id === action.payload),
    };
  }

  return state;
}
