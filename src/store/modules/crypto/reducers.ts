import { CryptoState, GET_CRYPTO_INFO_SUCCESS, CryptoActions } from './types';

const initialState = {} as CryptoState;

// eslint-disable-next-line import/prefer-default-export, default-param-last
export function cryptoReducer(state = initialState, action: CryptoActions) {
  if (action.type === GET_CRYPTO_INFO_SUCCESS) {
    return {
      ...state,
      ...action.payload,
    };
  }

  return state;
}
