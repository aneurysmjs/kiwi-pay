import { Config, CHANGE_CONFIG } from './types';
import { withMatcher } from '~/store/helpers/withMatcher';

// eslint-disable-next-line import/prefer-default-export
export const addConfig = withMatcher((config: Config) => ({
  type: CHANGE_CONFIG,
  payload: config,
}));
