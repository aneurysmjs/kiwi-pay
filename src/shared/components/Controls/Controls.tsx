import { FunctionComponent } from 'react';
import { ConnectDragSource } from 'react-dnd';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons/faArrowsAlt';
import { faCopy } from '@fortawesome/free-solid-svg-icons/faCopy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

type ControlsPosition = 'left' | 'top';

interface PropsType {
  position?: ControlsPosition;
  dragRef: ConnectDragSource;
  onDelete: () => void;
}

const isVertical = (position: ControlsPosition): boolean => position === 'left';

// eslint-disable-next-line import/prefer-default-export
export const Controls: FunctionComponent<PropsType> = ({
  dragRef,
  position = 'left',
  onDelete,
}) => {
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
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus */}
      <span role="button" className="p-1 text-primary" onClick={onDelete}>
        <FontAwesomeIcon icon={faTrash} />
      </span>
    </div>
  );
};
