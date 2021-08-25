export interface ActiveElement {
  id: string;
}

export interface ActiveElementState {
  [Key: string]: ActiveElement;
}

export const SET_ACTIVE_ELEMENT = 'SET_ACTIVE_ELEMENT';
export const DELETE_ACTIVE_ELEMENT = 'DELETE_ACTIVE_ELEMENT';
