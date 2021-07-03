import { FunctionComponent, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RowType } from '~/store/modules/builder/types';
import { addRow, sortRows } from '~/store/modules/builder/actions';
import { getRowsSelector } from '~/store/modules/builder/selectors';
import { OnMove } from '~/shared/hooks/withDrag/withDrag';

import { Row } from './Row';

// eslint-disable-next-line import/prefer-default-export
export const Builder: FunctionComponent = () => {
  const dispatch = useDispatch();
  const rows = useSelector(getRowsSelector);

  const handleAddRow = useCallback(() => {
    dispatch(addRow());
  }, [dispatch]);

  const handleMove = useCallback(
    ({ dragIndex, hoverIndex }: OnMove) => {
      const { id: hoverId } = rows[hoverIndex];
      const { id: dragId } = rows[dragIndex];

      dispatch(sortRows({ hoverId, dragId }));
    },
    [rows, dispatch],
  );

  const renderRow = (row: RowType, index: number) => {
    return (
      <Row
        key={row.id}
        id={row.id}
        dragOptions={{
          direction: 'vertical',
          onMove: handleMove,
          index,
          id: row.id,
          dragType: 'ROW',
        }}
      >
        {row.text}
      </Row>
    );
  };

  return (
    <div className="container">
      <div className="p-3">{rows.map((row, i) => renderRow(row, i))}</div>
      <hr />

      <div className="text-center">
        <button type="button" className="btn btn-primary" onClick={handleAddRow}>
          add row
        </button>
      </div>
    </div>
  );
};
