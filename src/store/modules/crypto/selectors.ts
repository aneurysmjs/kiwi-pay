import type { RootState } from '@/store';
// import { CryptoState } from './types';

// eslint-disable-next-line import/prefer-default-export
export const selectCrypto = (state: RootState) => state.crypto;
