/* eslint-disable import/prefer-default-export */
// Describing the shape of the pricing's slice of state
export interface User {
  name: string;
  lastName: string;
  id: string;
  location: {
    city: string;
    country: string;
    adress: string;
  };
}

export interface UserState {
  users: Array<User>;
  user: User | undefined;
}

export const ADD_USER = 'ADD_USER';
export const FIND_USER = 'FIND_USER';
