import axios from 'axios';

import type { Crypto } from '@/store/modules/crypto/types';

const CRYPTO_CURRENT_PRICE_URL = 'https://api.coindesk.com/v1/bpi/currentprice.json';

// eslint-disable-next-line import/prefer-default-export
export const getCryptoCurrentPrice = () => {
  return axios.get<Crypto>(CRYPTO_CURRENT_PRICE_URL);
};
