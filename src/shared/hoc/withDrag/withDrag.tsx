import { JSXElementConstructor, ReactElement, ReactNode, useRef } from 'react';
import { useDragging, UseDraggingOptions } from '~/shared/hooks/useDragging/useDragging';

export interface WithDragProps {
  children?: ReactNode;
  dragOptions: Omit<UseDraggingOptions, 'containerRef'>;
}

interface WithDrag {
  <TProps extends WithDragProps>(Component: JSXElementConstructor<TProps>): (
    props: TProps,
  ) => ReactElement;
}

export const withDrag: WithDrag = (Component) => (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { dragRef, handlerId, isDragging } = useDragging({ ...props.dragOptions, containerRef });

  return (
    <div
      className="position-relative"
      ref={containerRef}
      style={{ opacity: isDragging ? 0 : 1 }}
      data-handler-id={handlerId}
    >
      <span
        ref={dragRef}
        id="drag-handler"
        style={{ cursor: 'move' }}
        className="bg-success position-absolute p-2 top-50 start-0 translate-middle"
      />
      <Component {...props} />
    </div>
  );
};
