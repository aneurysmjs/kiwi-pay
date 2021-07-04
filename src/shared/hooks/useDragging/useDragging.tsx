import { RefObject } from 'react';
import {
  useDrag,
  useDrop,
  DropTargetMonitor,
  DragSourceMonitor,
  ConnectDragSource,
} from 'react-dnd';
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

export interface UseDraggingOptions {
  id: string;
  direction: 'horizontal' | 'vertical';
  index: number;
  onMove: (move: OnMove) => void;
  dragType: string;
  containerRef: RefObject<HTMLDivElement>;
}

type UseDragging = {
  dragRef: ConnectDragSource;
  isDragging: boolean;
  handlerId: Identifier | null;
};
// eslint-disable-next-line import/prefer-default-export
export const useDragging = ({
  direction,
  index,
  onMove,
  id,
  dragType,
  containerRef,
}: UseDraggingOptions): UseDragging => {
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

  const [{ isDragging }, dragRef, preview] = useDrag({
    type: dragType,

    item: () => {
      return { id, index };
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  preview(drop(containerRef));

  return {
    dragRef,
    isDragging,
    handlerId,
  };
};
