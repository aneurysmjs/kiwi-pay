import { AppState } from '~/store/helpers/configureStore';

function sortOrder(a: { order: number }, b: { order: number }) {
  return a.order - b.order;
}

export const getRowsSelector = ({ builder }: AppState) =>
  Object.values(builder.rows).sort(sortOrder);

export const getRowElementByIdSelector =
  (currentRowId: string) =>
  ({ builder }: AppState) => {
    return Object.keys(builder.rowElements).length
      ? Object.values(builder.rowElements)
          .filter(({ rowId }) => rowId === currentRowId)
          .sort(sortOrder)
      : [];
  };
