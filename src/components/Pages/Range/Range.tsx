import { useState, FunctionComponent } from 'react';

import './Range.scss';

const defaultState = {
  isPricingOpened: false,
};

const Range: FunctionComponent = () => {
  const [state, setState] = useState(defaultState);

  return (
    <div className="container">
      <h2 className="text-center">range</h2>
      <div className="range">
        <div className="range-drag">
          <div className="range-drag__point"></div>
          <div className="range-drag__point"></div>
        </div>
      </div>
    </div>
  );
};

export default Range;
