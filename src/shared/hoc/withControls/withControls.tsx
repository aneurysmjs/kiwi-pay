import { JSXElementConstructor, useRef, ReactElement, ReactNode } from 'react';

import { ConnectDragSource } from 'react-dnd';

import { useDragging, UseDraggingOptions } from '~/shared/hooks/useDragging/useDragging';

import './withControls.scss';

export interface WithControlsProps {
  children?: ReactNode;
  dragOptions: Omit<UseDraggingOptions, 'containerRef'>;
}
interface WithControls {
  <TProps extends WithControlsProps>(Component: JSXElementConstructor<TProps>): (
    props: TProps,
  ) => ReactElement;
}

interface ControlsProps {
  dragRef: ConnectDragSource;
}

const Controls = ({ dragRef }: ControlsProps) => (
  <div
    className="btn-group-vertical position-absolute top-50 start-0 translate-left left-n1"
    role="group"
    aria-label="controls"
  >
    <span role="button" className="btn btn-secondary btn-small p-1" ref={dragRef}>
      +
    </span>
    <button type="button" className="btn btn-secondary btn-small p-1">
      C
    </button>
    <button type="button" className="btn btn-secondary btn-small p-1">
      X
    </button>
  </div>
);

// eslint-disable-next-line react/display-name
export const withControls: WithControls = (Component) => (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { dragRef, handlerId, isDragging } = useDragging({ ...props.dragOptions, containerRef });

  return (
    <div
      className="controls-wrapper position-relative"
      ref={containerRef}
      style={{ opacity: isDragging ? 0 : 1 }}
      data-handler-id={handlerId}
    >
      <Controls dragRef={dragRef} />

      <Component {...props} />
    </div>
  );
};
