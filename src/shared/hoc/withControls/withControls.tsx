import { JSXElementConstructor, useRef, ReactElement, ReactNode } from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons/faArrowsAlt';
import { faCopy } from '@fortawesome/free-solid-svg-icons/faCopy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import { ConnectDragSource } from 'react-dnd';

import { useDragging, UseDraggingOptions } from '~/shared/hooks/useDragging/useDragging';

import './withControls.scss';

type ControlsPosition = 'left' | 'top';

interface ControlsProps {
  position?: ControlsPosition;
  dragRef: ConnectDragSource;
}

const isVertical = (position: ControlsPosition): boolean => position === 'left';

const Controls = ({ dragRef, position = 'left' }: ControlsProps) => {
  const postFix = isVertical(position) ? '-vertical' : '';
  return (
    <div
      style={{ zIndex: 10 }}
      // className="btn-group-vertical position-absolute top-50 start-0 translate-left left-n1"
      className={classNames('position-absolute', {
        [`btn-group${postFix}`]: true,
        'top-50 start-0 translate-left left-n1': isVertical(position),
        'start-0 controls-top': !isVertical(position),
      })}
      role="group"
      aria-label="controls"
    >
      <span role="button" className="p-1 text-primary" ref={dragRef}>
        <FontAwesomeIcon icon={faArrowsAlt} color="text-primary" />
      </span>
      <span role="button" className="p-1 text-primary">
        <FontAwesomeIcon icon={faCopy} />
      </span>
      <span role="button" className="p-1 text-primary">
        <FontAwesomeIcon icon={faTrash} />
      </span>
    </div>
  );
};
export interface WithControlsProps {
  children?: ReactNode;
  position?: ControlsPosition;
  dragOptions: Omit<UseDraggingOptions, 'containerRef'>;
}
interface WithControls {
  <TProps extends WithControlsProps>(Component: JSXElementConstructor<TProps>): (
    props: TProps,
  ) => ReactElement;
}

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
      <Controls position={props.position} dragRef={dragRef} />

      <Component {...props} />
    </div>
  );
};
