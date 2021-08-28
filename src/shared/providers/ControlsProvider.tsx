import type { Context, FunctionComponent, ReactNode, RefObject } from 'react';
import { createContext, useRef, useContext, useState, useEffect } from 'react';

import { useDragging, UseDraggingOptions } from '~/shared/hooks/useDragging/useDragging';

export const ControlsContext = createContext<RefObject<HTMLDivElement> | null>(null);

interface PropsType {
  children?: ReactNode;
}

export const ControlsProvider: FunctionComponent<PropsType> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [refState, setRefState] = useState(null);
  // const { dragRef, handlerId, isDragging } = useDragging({ ...rest, containerRef });

  console.log('containerRef', containerRef);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    setRefState(containerRef.current);
  }, []);

  return (
    <div ref={refState}>
      <ControlsContext.Provider value={containerRef}>{children}</ControlsContext.Provider>
    </div>
  );
};

export function useControls() {
  const context = useContext(ControlsContext);
  if (context === undefined) {
    throw new Error('useControls must be used within a ControlsProvider');
  }
  return context;
}
