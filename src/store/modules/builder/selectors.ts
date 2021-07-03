/* eslint-disable import/no-unresolved */
import isEmpty from 'ramda/src/isempty';
import propEq from 'ramda/src/propeq';
import values from 'ramda/src/values';

import { RowElement, RowType } from '~/store/modules/builder/types';
import { AppState } from '~/store/helpers/configureStore';

const sortOrder = (a: { order: number }, b: { order: number }) => {
  return a.order - b.order;
};

export const getRowsSelector = ({ builder: { rows } }: AppState): RowType[] =>
  values(rows).sort(sortOrder);

export const getRowElementByIdSelector =
  (currentRowId: string) =>
  ({ builder: { rowElements } }: AppState): RowElement[] => {
    return isEmpty(rowElements)
      ? []
      : values(rowElements).filter(propEq('rowId', currentRowId)).sort(sortOrder);
  };
