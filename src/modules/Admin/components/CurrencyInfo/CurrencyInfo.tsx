import { FunctionComponent } from 'react';

import type { BpiData } from '@/store/modules/crypto/types';

interface CurrencyInfoProps extends BpiData {}

const CurrencyInfo: FunctionComponent<CurrencyInfoProps> = ({ code, description, rate }) => {
  return (
    <div className="card">
      <div className="card-header">{code}</div>
      <div className="card-body">
        <h5 className="card-title">{description}</h5>
        <p className="card-text">{rate}</p>
      </div>
    </div>
  );
};

export default CurrencyInfo;
