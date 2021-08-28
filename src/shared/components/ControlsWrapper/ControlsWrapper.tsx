import { useRef, ReactNode, FunctionComponent } from 'react';
import { useDragging, UseDraggingOptions } from '~/shared/hooks/useDragging/useDragging';
import { Controls } from '~/shared/components/Controls/Controls';
import { useControls } from '~/shared/providers/ControlsProvider';

import './ControlsWrapper.scss';

type ControlsPosition = 'left' | 'top';

interface PropsType extends Omit<UseDraggingOptions, 'containerRef'> {
  children: ReactNode;
  position: ControlsPosition;
  onDelete: () => void;
}

// eslint-disable-next-line import/prefer-default-export
export const ControlsWrapper: FunctionComponent<PropsType> = ({
  children,
  position,
  onDelete,
  ...rest
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { dragRef, handlerId, isDragging } = useDragging({ ...rest, containerRef });
  const ref = useControls();

  console.log('ref', ref);

  return (
    <div
      className="controls-wrapper position-relative"
      ref={dragRef}
      style={{ opacity: isDragging ? 0 : 1 }}
      data-handler-id={handlerId}
    >
      <Controls position={position} dragRef={dragRef} onDelete={onDelete} />

      {children}
    </div>
  );
};
