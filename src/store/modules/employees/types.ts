import { AsyncState } from '@/shared/types';

export const GET_EMPLOYEES_REQUEST = 'GET_EMPLOYEES_REQUEST';
export const GET_EMPLOYEES_SUCCESS = 'GET_EMPLOYEES_SUCCESS';
export const GET_EMPLOYEES_FAILURE = 'GET_EMPLOYEES_FAILURE';

export interface Employee {
  id: number;
  name: string;
  email: string;
  birth_date: string;
  position_applied: string;
  application_date: string;
  status: string;
  year_of_experience: number;
}

export interface Employees {
  [K: string]: Employee;
}

export interface EmployeesState extends AsyncState {
  employees: Employees;
}

interface GetEmployeesRequest {
  type: typeof GET_EMPLOYEES_REQUEST;
}

interface GetEmployeesSuccess {
  type: typeof GET_EMPLOYEES_SUCCESS;
  payload: Employee[];
}

interface GetEmployeesFailure {
  type: typeof GET_EMPLOYEES_FAILURE;
}

export type EmployeesActions = GetEmployeesRequest | GetEmployeesSuccess | GetEmployeesFailure;
