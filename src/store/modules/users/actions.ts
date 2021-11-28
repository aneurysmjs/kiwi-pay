import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import * as usersService from '~/services/usersService';
import { ApiMetaType } from '~/shared/types';
import { ASYNC_ACTION_TYPE } from '~/constants';
import { GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAILURE } from './types';
import { selectUsers } from '~/store/modules/users/selectors';

// eslint-disable-next-line import/prefer-default-export
export function useUserActions() {
  const dispatch = useDispatch();

  // const getUsers = useCallback(async () => {
  //   dispatch({
  //     type: GET_USERS_REQUEST,
  //   });

  //   try {
  //     const response = await usersService.getUsers();
  //     const users = response.data.reduce((current, user) => {
  //       return {
  //         ...current,
  //         [user.id]: {
  //           ...user,
  //         },
  //       };
  //     }, {});
  //     dispatch({
  //       type: GET_USERS_SUCCESS,
  //       payload: users,
  //     });
  //   } catch (error) {
  //     dispatch({
  //       type: GET_USERS_FAILURE,
  //     });
  //   }
  // }, [dispatch]);

  const getUsers = useCallback(async () => {
    const productMeta: ApiMetaType = {
      types: [GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAILURE],
      callAPI: () => usersService.getUsers(),
    };

    dispatch({
      type: ASYNC_ACTION_TYPE,
      payload: {},
      meta: productMeta,
    });
  }, [dispatch]);

  return { getUsers };
}
