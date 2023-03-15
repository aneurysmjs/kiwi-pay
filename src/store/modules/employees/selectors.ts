import type { RootState } from '@/store';
import type { EmployeesState, Employee } from '@/store/modules/employees/types';

export const selectEmployeesState = (state: RootState): EmployeesState => state.employees;

export const selectEmployees = (state: RootState): Employee[] =>
  Object.keys(state.employees.employees).map((key) => state.employees.employees[key]);

export const selectEmployee = (state: RootState) => (id: string) => state.employees[id];
