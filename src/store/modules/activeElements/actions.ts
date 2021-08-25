import { withMatcher } from '~/store/helpers/withMatcher';
import { SET_ACTIVE_ELEMENT, DELETE_ACTIVE_ELEMENT } from './types';

export const setActiveElement = withMatcher((id: string) => ({
  type: SET_ACTIVE_ELEMENT,
  payload: id,
}));

export const deleteActiveElement = withMatcher((id: string) => ({
  type: DELETE_ACTIVE_ELEMENT,
  payload: id,
}));
