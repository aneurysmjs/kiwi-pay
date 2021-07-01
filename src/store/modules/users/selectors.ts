import { prop } from 'ramda';
import { AppState } from '~/store/helpers/configureStore';
import { UserState } from '~/store/modules/users/types';

// export const getUsers = prop('users');

// eslint-disable-next-line import/prefer-default-export
export const getUsersState = (state: AppState): UserState => ({
  ...state.users,
});
