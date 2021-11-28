import { AsyncState } from '~/shared/types';

export const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';

interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Users {
  [K: string]: User;
}

export interface UsersState extends AsyncState {
  users: Users;
}

interface GetUsersRequest {
  type: typeof GET_USERS_REQUEST;
}

interface GetUsersSuccess {
  type: typeof GET_USERS_SUCCESS;
  payload: User[];
}

interface GetUsersFailure {
  type: typeof GET_USERS_FAILURE;
}

export type UsersActions = GetUsersRequest | GetUsersSuccess | GetUsersFailure;
