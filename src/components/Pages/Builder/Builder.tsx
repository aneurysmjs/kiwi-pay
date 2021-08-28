import { FunctionComponent, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RowType } from '~/store/modules/builder/types';
import { addRow, sortRows, deleteRow } from '~/store/modules/builder/actions';
import { getRowsSelector, getRowElementByIdSelector } from '~/store/modules/builder/selectors';
import { OnMove } from '~/shared/hooks/useDragging/useDragging';
import useKeyShortcuts from '~/shared/hooks/useKeyShortcuts';
import { ControlsWrapper } from '~/shared/components/ControlsWrapper/ControlsWrapper';
import { ControlsProvider } from '~/shared/providers/ControlsProvider';

import { Row } from './Row';
import { RowElement } from './RowElement';

// eslint-disable-next-line import/prefer-default-export
export const Builder: FunctionComponent = () => {
  const dispatch = useDispatch();
  const rows = useSelector(getRowsSelector);
  const addHotkey = useKeyShortcuts();

  // addHotkey('ctrl+shift+e, ctrl+shift+k', (event, info) => {
  //   console.log('event', event);
  //   console.log('info', info);
  //   // Prevent the default refresh event under WINDOWS system
  //   // event.preventDefault();
  //   // eslint-disable-next-line no-alert
  //   // console.log('you pressed ctrl+shift+e BITCH!');
  //   dispatch(addRow());
  // });

  // addHotkey('ctrl+shift+backspace', (event) => {
  //   console.log('you pressed ctrl+shift+backpace BITCH!');
  // });

  // const rowElements = useSelector(getRowElementByIdSelector(id));

  useEffect(() => {
    addHotkey('ctrl+shift+a, ctrl+shift+backspace, ctrl+r', (event, handler) => {
      // event?.preventDefault();
      if (handler?.hotkey === 'ctrl+r') {
        event?.preventDefault();
        console.log('you pressed ctrl+r MUDAFOCKA');
      }
      if (handler?.hotkey === 'ctrl+shift+a') {
        console?.log('you pressed ctrl+shift+a MUDAFOCKA');
      }

      if (handler?.hotkey === 'ctrl+shift+backspace') {
        console?.log('you pressed ctrl+shift+backspace MUDAFOCKA');
        // dispatch(addRow());
      }
    });
  }, [addHotkey, dispatch]);

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

  const handleDelete = useCallback(
    (id) => () => {
      dispatch(deleteRow(id));
    },
    [dispatch],
  );

  const renderRow = (row: RowType, index: number) => {
    return (
      <ControlsWrapper
        key={row.id}
        position="top"
        direction={'vertical'}
        onMove={handleMove}
        id={row.id}
        dragType={'ROW'}
        onDelete={handleDelete(row.id)}
        index={index}
      >
        <Row id={row.id} />
      </ControlsWrapper>
    );
  };

  return (
    <ControlsProvider>
      <div className="container mt-4">
        <div className="p-3">{rows.map((row, i) => renderRow(row, i))}</div>
        <hr />

        <div className="text-center">
          <button type="button" className="btn btn-primary" onClick={handleAddRow}>
            add row
          </button>
        </div>
      </div>
    </ControlsProvider>
  );
};
