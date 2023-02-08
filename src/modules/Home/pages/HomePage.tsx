import { FunctionComponent, useEffect } from 'react';
import { loadingSelector, errorMessageSelector } from '@/store/helpers/selectors';
import { useAppSelector } from '@/store/hooks';
import { selectCrypto } from '@/store/modules/crypto/selectors';
import { useCryptoActions } from '@/store/modules/crypto/actions';

import './HomePage.scss';

const HomePage: FunctionComponent = () => {
  const crypto = useAppSelector(selectCrypto);
  const isLoading = useAppSelector(loadingSelector(['GET_CRYPTO_INFO']));
  const hasError = useAppSelector(errorMessageSelector(['GET_CRYPTO_INFO']));
  const { getCryptoCurrentPrice } = useCryptoActions();

  useEffect(() => {
    getCryptoCurrentPrice();
  }, [getCryptoCurrentPrice]);

  return (
    <section>
      <h1 data-testid="page-title" className="home-title">
        home
      </h1>
    </section>
  );
};

export default HomePage;
