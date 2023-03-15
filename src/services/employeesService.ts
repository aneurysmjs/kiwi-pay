import axios, { AxiosPromise } from 'axios';

import type { Employee } from '@/store/modules/employees/types';

const EMPLOYEES_URL = 'http://localhost:3000/data';

export const getEmployees = (): AxiosPromise<{ data: Employee[] }> => axios.get(EMPLOYEES_URL);
