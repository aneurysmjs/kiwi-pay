import { AnyAction } from 'redux';

import { ConfigState } from './types';
import { addConfig } from './actions';

const initialState: ConfigState = {
  theme: 'light',
  storageType: {
    name: 'some random',
    company: 'meme',
    type: 'cloud',
  },
};

// eslint-disable-next-line import/prefer-default-export
export function configReducer(state = initialState, action: AnyAction): ConfigState {
  if (addConfig.match(action)) {
    return {
      ...action.payload,
    };
  }

  return state;
}
