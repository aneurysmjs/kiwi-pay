import axios, { AxiosPromise } from 'axios';

import type { User } from '~/store/modules/users/types';

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

export const getUsers = (): AxiosPromise<User[]> => {
  return axios.get(USERS_URL);
};

export const getUserById = (id: string): AxiosPromise<User> => {
  return axios.get(`${USERS_URL}/${id}`);
};
