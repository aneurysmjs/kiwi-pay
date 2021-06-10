import { withMatcher } from '~/store/helpers/withMatcher';
import { User, ADD_USER, FIND_USER } from './types';

export const addUser = withMatcher((user: User) => ({
  type: ADD_USER,
  payload: user,
}));

export const findUser = withMatcher((id: string) => ({
  type: FIND_USER,
  payload: id,
}));
