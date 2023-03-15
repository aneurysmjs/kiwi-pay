import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import * as employeesService from '@/services/employeesService';
import { ApiMetaType } from '@/shared/types';
import { ASYNC_ACTION_TYPE } from '@/constants';
import { GET_EMPLOYEES_REQUEST, GET_EMPLOYEES_SUCCESS, GET_EMPLOYEES_FAILURE } from './types';

export function useEmployeesActions() {
  const dispatch = useDispatch();

  const getEmployees = useCallback(async () => {
    const employeesMeta: ApiMetaType = {
      types: [GET_EMPLOYEES_REQUEST, GET_EMPLOYEES_SUCCESS, GET_EMPLOYEES_FAILURE],
      callAPI: () => employeesService.getEmployees(),
    };

    dispatch({
      type: ASYNC_ACTION_TYPE,
      payload: {},
      meta: employeesMeta,
    });
  }, [dispatch]);

  return { getEmployees };
}
