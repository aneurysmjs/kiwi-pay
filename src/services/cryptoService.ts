import axios, { AxiosPromise } from 'axios';

import type { Crypto } from '@/store/modules/crypto/types';

const CRYPTO_CURRENT_PRICE_URL = 'https://api.coindesk.com/v1/bpi/currentprice.json';

// eslint-disable-next-line import/prefer-default-export
export const getCryptoCurrentPrice = (): AxiosPromise<Crypto> => {
  return axios.get(CRYPTO_CURRENT_PRICE_URL);
};
