import type { RootState } from '@/store';
import type { UsersState, User } from '@/store/modules/users/types';

export const selectUsersState = (state: RootState): UsersState => state.users;

export const selectUsers = (state: RootState): User[] =>
  Object.keys(state.users.users).map((key) => state.users.users[key]);

export const selectUser = (state: RootState) => (id: string) => state.users[id];
