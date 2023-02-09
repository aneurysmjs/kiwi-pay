export interface Time {
  updated: string;
  updatedISO: string;
  updateduk: string;
}

export interface Usd {
  code: string;
  symbol: string;
  rate: string;
  description: string;
  rate_float: number;
}

export interface Gbp {
  code: string;
  symbol: string;
  rate: string;
  description: string;
  rate_float: number;
}

export interface Eur {
  code: string;
  symbol: string;
  rate: string;
  description: string;
  rate_float: number;
}

export interface Bpi {
  USD: Usd;
  GBP: Gbp;
  EUR: Eur;
}

export interface Crypto {
  time: Time;
  disclaimer: string;
  chartName: string;
  bpi: Bpi;
}

export interface CryptoState {
  [K: string]: Crypto;
}

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
