import { withMatcher } from '~/store/helpers/withMatcher';

import {
  SortRowsPayload,
  SortRowElementsPayload,
  ADD_ROW,
  ADD_ROW_ELEMENT,
  SORT_ROWS,
  SORT_ROW_ELEMENTS,
} from './types';

export const addRow = withMatcher(() => ({
  type: ADD_ROW,
}));

export const sortRows = withMatcher((payload: SortRowsPayload) => ({
  type: SORT_ROWS,
  payload,
}));

export const addRowElement = withMatcher((rowId: string) => ({
  type: ADD_ROW_ELEMENT,
  payload: {
    rowId,
  },
}));

export const sortRowElements = withMatcher((payload: SortRowElementsPayload) => ({
  type: SORT_ROW_ELEMENTS,
  payload,
}));
