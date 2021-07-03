/* eslint-disable consistent-return */
import { Middleware } from 'redux';

import { AppState } from '~store/helpers/configureStore';

import { ApiMetaType } from '~/shared/types';

const apiMiddleware: Middleware<{}, AppState> =  // eslint-disable-line @typescript-eslint/ban-types
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    let meta: ApiMetaType = {};

    if (action.meta) {
      meta = { ...action.meta };
    }

    if (!action.meta && !meta.types) {
      // Normal action: pass it on
      return next(action);
    }

    const { payload = {} } = action;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { types, callAPI, shouldCallAPI = (state: AppState): boolean => true } = meta;

    if (
      !Array.isArray(types) ||
      types.length !== 3 ||
      !types.every((type) => typeof type === 'string')
    ) {
      throw new Error('Expected an array of three string types.');
    }

    if (typeof callAPI !== 'function') {
      throw new Error('Expected callAPI to be a function.');
    }

    if (!shouldCallAPI(getState())) {
      return;
    }

    const [requestType, successType, failureType] = types;
    dispatch({
      payload: { ...payload },
      type: requestType,
    });

    (async () => {
      try {
        const response = await callAPI();
        dispatch({
          payload: { response },
          type: successType,
        });
      } catch (error) {
        dispatch({
          payload: { error },
          type: failureType,
        });
      }
    })();
  };

export default apiMiddleware;
