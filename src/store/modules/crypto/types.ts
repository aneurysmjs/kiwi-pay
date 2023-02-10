export interface Time {
  updated: string;
  updatedISO: string;
  updateduk: string;
}

export interface BpiData {
  code: string;
  symbol: string;
  rate: string;
  description: string;
  rate_float: number;
}

export interface Bpi {
  USD: BpiData;
  GBP: BpiData;
  EUR: BpiData;
}

export interface Crypto {
  time: Time;
  disclaimer: string;
  chartName: string;
  bpi: Bpi;
}

export interface CryptoState extends Crypto {}

export const GET_CRYPTO_INFO_REQUEST = 'GET_CRYPTO_INFO_REQUEST';
export const GET_CRYPTO_INFO_SUCCESS = 'GET_CRYPTO_INFO_SUCCESS';
export const GET_CRYPTO_INFO_FAILURE = 'GET_CRYPTO_INFO_FAILURE';

interface GetCryptoInfoRequest {
  type: typeof GET_CRYPTO_INFO_REQUEST;
}

interface GetCryptoInfoSuccess {
  type: typeof GET_CRYPTO_INFO_SUCCESS;
  payload: Crypto;
}

interface GetCryptoInfoFailure {
  type: typeof GET_CRYPTO_INFO_FAILURE;
}

export type CryptoActions = GetCryptoInfoRequest | GetCryptoInfoSuccess | GetCryptoInfoFailure;
