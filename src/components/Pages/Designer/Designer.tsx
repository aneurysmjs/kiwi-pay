import { useRef, useEffect, FunctionComponent } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const Designer: FunctionComponent = () => {
  const componentRef = useRef(null);

  useEffect(() => {}, []);

  return (
    <div>
      <button ref={componentRef} className="btn btn-primary">
        Print this out!
      </button>
    </div>
  );
};
