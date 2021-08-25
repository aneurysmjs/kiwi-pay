import { AppState } from '~/store/helpers/configureStore';
import { ActiveElement } from '~/store/modules/activeElements/types';

// eslint-disable-next-line import/prefer-default-export
export const getActiveElement =
  (state: AppState) =>
  (id: string): ActiveElement =>
    state[id];
