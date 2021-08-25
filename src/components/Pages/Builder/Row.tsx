import { FunctionComponent, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setActiveElement } from '~/store/modules/activeElements/actions';
import { addRowElement, sortRowElements } from '~/store/modules/builder/actions';
import { getRowElementByIdSelector } from '~/store/modules/builder/selectors';

import { RowElement } from './RowElement';

import { OnMove } from '~/shared/hooks/useDragging/useDragging';
import { withControls, WithControlsProps } from '~/shared/hoc/withControls/withControls';

interface PropsType extends WithControlsProps {
  id: string;
  index: number;
}

const RowComponent: FunctionComponent<PropsType> = ({ id, children }) => {
  const dispatch = useDispatch();
  const rowElements = useSelector(getRowElementByIdSelector(id));

  const handleMove = useCallback(
    ({ dragIndex, hoverIndex }: OnMove) => {
      const { id: hoverId } = rowElements[hoverIndex];
      const { id: dragId } = rowElements[dragIndex];

      dispatch(sortRowElements({ hoverId, dragId, rowId: id }));
    },
    [dispatch, id, rowElements],
  );

  const handleAddRow = useCallback(() => {
    dispatch(addRowElement(id));
  }, [dispatch, id]);

  const handleClick = () => {
    dispatch(setActiveElement(id));
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className="card mb-4 position-relative" onClick={handleClick}>
      {children}
      <div className="card-body d-flex justify-content-start">
        {rowElements.length > 0 &&
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
          ))}
      </div>
      <button type="button" className="btn btn-outline-secondary" onClick={handleAddRow}>
        add element
      </button>
    </div>
  );
};

// eslint-disable-next-line import/prefer-default-export
export const Row = withControls(RowComponent);
