import { FunctionComponent, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { loadingSelector, errorMessageSelector } from '@/store/helpers/selectors';
import { selectUsers } from '@/store/modules/users/selectors';
import { useUserActions } from '@/store/modules/users/actions';

import './HomePage.scss';

const HomePage: FunctionComponent = () => {
  const users = useSelector(selectUsers);
  const isLoading = useSelector(loadingSelector(['GET_USERS']));
  const hasError = useSelector(errorMessageSelector(['GET_USERS']));
  console.log('isLoading', isLoading);
  console.log('hasError', hasError);
  const { getUsers } = useUserActions();

  useEffect(() => {
    if (users.length === 0) {
      getUsers();
    }
  }, [getUsers, users.length]);

  return (
    <section>
      <h1 data-testid="page-title" className="home-title">
        home
      </h1>
    </section>
  );
};

export default HomePage;
