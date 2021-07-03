import { useDispatch } from 'react-redux';

import { withMatcher } from '~/store/helpers/withMatcher';

import {
  SortRowsPayload,
  SortRowElementsPayload,
  ADD_ROW,
  ADD_ROW_ELEMENT,
  SORT_ROWS,
  SORT_ROW_ELEMENTS,
} from './types';

export default function useBuilderActions() {
  const dispatch = useDispatch();

  return {
    addRow: withMatcher(() => {
      dispatch({
        type: ADD_ROW,
      });
    }),
  };
}
