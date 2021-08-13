import { FunctionComponent, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import hotkeys from 'hotkeys-js';
import { RowType } from '~/store/modules/builder/types';
import { addRow, sortRows } from '~/store/modules/builder/actions';
import { getRowsSelector, getRowElementByIdSelector } from '~/store/modules/builder/selectors';
import { OnMove } from '~/shared/hooks/useDragging/useDragging';
import useKeyShortcuts from '~/shared/hooks/useKeyShortcuts';

import { Row } from './Row';
import { RowElement } from './RowElement';

// eslint-disable-next-line import/prefer-default-export
export const Builder: FunctionComponent = () => {
  const dispatch = useDispatch();
  const rows = useSelector(getRowsSelector);
  const addHotkey = useKeyShortcuts();

  addHotkey('ctrl+a', (event) => {
    // Prevent the default refresh event under WINDOWS system
    // event.preventDefault();
    // eslint-disable-next-line no-alert
    // console.log('you pressed ctrl+a BITCH!');
    dispatch(addRow());
  });

  addHotkey('ctrl+d', (event) => {
    // Prevent the default refresh event under WINDOWS system
    // event.preventDefault();
    // eslint-disable-next-line no-alert
    console.log('you pressed ctrl+d BITCH!');
  });
  // const rowElements = useSelector(getRowElementByIdSelector(id));

  // hotkeys('ctrl+a', (event, handler) => {
  //   // Prevent the default refresh event under WINDOWS system
  //   event.preventDefault();
  //   alert('you pressed F5!');
  // });

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
        position="top"
        key={row.id}
        id={row.id}
        index={index}
        dragOptions={{
          direction: 'vertical',
          onMove: handleMove,
          index,
          id: row.id,
          dragType: 'ROW',
        }}
      >
        {/* {rowElements.length > 0 &&
          rowElements.map((rowElem, idx) => (
            <RowElement
              key={rowElem.id}
              id={rowElem.id}
              dragOptions={{
                direction: 'horizontal',
                onMove: handleMove,
                index: idx,
                id: rowElem.id,
                dragType: 'ROW_ELEMENT',
              }}
            >
              {rowElem.text}
            </RowElement>
          ))} */}
      </Row>
    );
  };

  return (
    <div className="container mt-4">
      {/* <ListOfTenThings /> */}
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
