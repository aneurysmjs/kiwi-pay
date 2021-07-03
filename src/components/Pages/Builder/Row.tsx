import { FunctionComponent, ReactNode, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addRowElement, sortRowElements } from '~/store/modules/builder/actions';
import { getRowElementByIdSelector } from '~/store/modules/builder/selectors';

import { RowElement } from './RowElement';

import { withDrag, WithDragProps, OnMove } from '~/shared/hooks/withDrag/withDrag';

interface PropsType extends WithDragProps {
  id: string;
  children?: ReactNode;
}

const RowComponent: FunctionComponent<PropsType> = ({ id }) => {
  const dispatch = useDispatch();

  const rowElements = useSelector(getRowElementByIdSelector(id));

  const handleAddRow = useCallback(() => {
    dispatch(addRowElement(id));
  }, [dispatch, id]);

  const handleMove = useCallback(
    ({ dragIndex, hoverIndex }: OnMove) => {
      const { id: hoverId } = rowElements[hoverIndex];
      const { id: dragId } = rowElements[dragIndex];

      dispatch(sortRowElements({ hoverId, dragId, rowId: id }));
    },
    [dispatch, id, rowElements],
  );

  return (
    <div className="row-block card mb-2">
      <div className="card-body d-flex justify-content-start">
        {rowElements.length > 0 &&
          rowElements.map((rowElem, index) => (
            <RowElement
              key={rowElem.id}
              id={rowElem.id}
              dragOptions={{
                direction: 'horizontal',
                onMove: handleMove,
                index,
                id: rowElem.id,
                dragType: 'ROW_ELEMENT',
              }}
            >
              {rowElem.text}
            </RowElement>
          ))}
      </div>
      <button type="button" className="btn btn-outline-secondary" onClick={handleAddRow}>
        add element
      </button>
    </div>
  );
};

// eslint-disable-next-line import/prefer-default-export
export const Row = withDrag(RowComponent);
