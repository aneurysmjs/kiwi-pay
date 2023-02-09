import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import * as cryptoService from '@/services/cryptoService';
import { ApiMetaType } from '@/shared/types';
import { ASYNC_ACTION_TYPE } from '@/constants';
import { GET_CRYPTO_INFO_REQUEST, GET_CRYPTO_INFO_SUCCESS, GET_CRYPTO_INFO_FAILURE } from './types';

// eslint-disable-next-line import/prefer-default-export
export function useCryptoActions() {
  const dispatch = useDispatch();

  const getCryptoCurrentPrice = useCallback(async () => {
    const productMeta: ApiMetaType = {
      types: [GET_CRYPTO_INFO_REQUEST, GET_CRYPTO_INFO_SUCCESS, GET_CRYPTO_INFO_FAILURE],
      callAPI: () => cryptoService.getCryptoCurrentPrice(),
      shouldCallAPI: ({ crypto }) => Object.keys(crypto).length === 0,
    };

    dispatch({
      type: ASYNC_ACTION_TYPE,
      payload: {},
      meta: productMeta,
    });
  }, [dispatch]);

  return { getCryptoCurrentPrice };
}
