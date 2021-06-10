import { pick } from 'ramda';
import { AppState } from '~/store/helpers/configureStore';

import { ConfigState } from '~/store/modules/config/types';

export const getConfig = pick(['config']);

// eslint-disable-next-line import/prefer-default-export
export const getConfigState = (state: AppState): ConfigState => ({
  ...state.config,
});
