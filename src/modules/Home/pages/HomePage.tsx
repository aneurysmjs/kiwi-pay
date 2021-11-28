import { FunctionComponent, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectUsers } from '~/store/modules/users/selectors';
import { useUserActions } from '~/store/modules/users/actions';

const HomePage: FunctionComponent = () => {
  const users = useSelector(selectUsers);
  const { getUsers } = useUserActions();

  useEffect(() => {
    if (users.length === 0) {
      getUsers();
    }
  }, [getUsers, users.length]);

  return (
    <section>
      <h1>home</h1>
    </section>
  );
};

export default HomePage;
