import type { AppState } from '@/store/helpers/configureStore';
import type { UsersState, User } from '@/store/modules/users/types';

export const selectUsersState = (state: AppState): UsersState => state.users;

export const selectUsers = (state: AppState): User[] =>
  Object.keys(state.users.users).map((key) => state.users.users[key]);

export const selectUser = (state: AppState): UsersState => ({
  ...state.users,
});
