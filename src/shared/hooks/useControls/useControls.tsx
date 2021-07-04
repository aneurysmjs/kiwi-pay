import { RefObject, useEffect } from 'react';
import { useDrag, useDrop, DropTargetMonitor, DragSourceMonitor } from 'react-dnd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { XYCoord, Identifier } from 'dnd-core';

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export interface OnMove {
  dragIndex: number;
  hoverIndex: number;
  dragId?: number;
  hoverId?: number;
  blockId?: string;
}

interface DragOptions {
  id: string;
  direction: 'horizontal' | 'vertical';
  index: number;
  onMove: (move: OnMove) => void;
  dragType: string;
  containerRef: RefObject<HTMLDivElement>;
}

export interface WithDragProps {
  dragOptions: DragOptions;
}

interface Controls {
  isDragging: boolean;
  handlerId: Identifier | null;
}

type UseControls = [Controls];
// eslint-disable-next-line import/prefer-default-export
export const useControls = ({
  direction,
  index,
  onMove,
  id,
  dragType,
  containerRef,
}: DragOptions): UseControls => {
  const [{ handlerId }, drop] = useDrop({
    accept: dragType,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!containerRef.current) {
        return;
      }

      const dragIndex = item.index;

      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = containerRef.current?.getBoundingClientRect();

      // Determine mouse position
      const clientOffset = monitor.getClientOffset() as XYCoord;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      if (direction === 'vertical') {
        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Перестакивание вниз
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }

        // Перестакивание вверх
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
      }

      // Only perform the move when the mouse has crossed half of the items width
      // When dragging left, only move when the cursor is below 50%
      // When dragging right, only move when the cursor is above 50%
      if (direction === 'horizontal') {
        // Get horizontal middle
        const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
        // Get pixels to the left
        const hoverClientX = clientOffset.x - hoverBoundingRect.left;

        // перетаскивание влево
        if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
          return;
        }

        // Перестакивание вправо
        if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
          return;
        }
      }

      // Time to actually perform the action
      onMove({ dragIndex, hoverIndex });

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex; // eslint-disable-line no-param-reassign
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: dragType,

    item: () => {
      return { id, index };
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    const span = document.createElement('span');
    span.className = 'bg-success position-absolute p-2 top-50 start-0 translate-middle';
    span.textContent = 'X';
    span.style.cursor = 'move';

    if (containerRef.current) {
      containerRef.current?.prepend(span);
      // ConnectableElement = RefObject<any> | ReactElement | Element | null;
      drag(span);
    }
  }, [containerRef, drag]);

  preview(drop(containerRef));

  // drag(spanRef);

  return [{ isDragging, handlerId }];
};
