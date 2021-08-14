export interface RowType {
  id: string;
  text: string;
  order: number;
}

export interface RowElement {
  id: string;
  text: string;
  rowId: string;
  order: number;
}

export interface BuilderState {
  rows: {
    [Key: string]: RowType;
  };
  rowElements: {
    [Key: string]: RowElement;
  };
}

export const ADD_ROW = 'ADD_ROW';
export const DELETE_ROW = 'DELETE_ROW';
export const SORT_ROWS = 'SORT_ROWS';

export const ADD_ROW_ELEMENT = 'ADD_ROW_ELEMENT';
export const SORT_ROW_ELEMENTS = 'SORT_ROW_ELEMENTS';

export interface Sortable {
  dragIndex?: number;
  hoverIndex?: number;
  dragId: string;
  hoverId: string;
}

export type DeleteRowPayload = string;

export type SortRowsPayload = Sortable;
export interface SortRowElementsPayload extends Sortable {
  rowId: string;
}
