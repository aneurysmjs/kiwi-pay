import { FunctionComponent, useEffect } from 'react';
import { loadingSelector, errorMessageSelector } from '@/store/helpers/selectors';
import { useAppSelector } from '@/store/hooks';
import { selectCrypto } from '@/store/modules/crypto/selectors';
import { useCryptoActions } from '@/store/modules/crypto/actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';

import CurrencyInfo from '@/modules/Admin/components/CurrencyInfo';
import { BpiData } from '@/store/modules/crypto/types';

const AdminPage: FunctionComponent = () => {
  const crypto = useAppSelector(selectCrypto);

  const isLoading = useAppSelector(loadingSelector(['GET_CRYPTO_INFO']));

  const hasError = useAppSelector(errorMessageSelector(['GET_CRYPTO_INFO']));

  const { getCryptoCurrentPrice } = useCryptoActions();

  useEffect(() => {
    getCryptoCurrentPrice();
  }, [getCryptoCurrentPrice]);

  const bpiData: BpiData[] = crypto.bpi ? Object.keys(crypto.bpi).map((k) => crypto.bpi[k]) : [];

  return (
    <section className="text-center">
      <h2 data-testid="page-title">Admin page</h2>
      {isLoading ? <FontAwesomeIcon data-testid="loader" icon={faSpinner} /> : null}
      {hasError ? (
        <div className="alert alert-danger mx-auto" style={{ width: '20rem' }} role="alert">
          {hasError}
        </div>
      ) : null}

      <div className="row justify-content-center">
        {bpiData.length
          ? bpiData.map((bpi, idx) => (
              <div className="col-3" key={`${bpi.code}-${idx}`}>
                <CurrencyInfo {...bpi} />
              </div>
            ))
          : null}
      </div>
    </section>
  );
};

export default AdminPage;
