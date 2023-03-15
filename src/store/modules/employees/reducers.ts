import toKeyedObject from '@/utils/toKeyedObject';

import { EmployeesActions, GET_EMPLOYEES_SUCCESS, EmployeesState } from './types';

const initialState: EmployeesState = {
  employees: {},
  isLoading: false,
  error: null,
};

export function employeesReducer(state = initialState, action: EmployeesActions) {
  if (action.type === GET_EMPLOYEES_SUCCESS) {
    return {
      ...state,

      employees: toKeyedObject(action.payload, 'id'),
    };
  }

  return state;
}
