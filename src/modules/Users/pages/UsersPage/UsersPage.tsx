import { FunctionComponent, useEffect } from 'react';

import { useAppSelector } from '@/store/hooks';
import { selectUsers } from '@/store/modules/users/selectors';
import { loadingSelector, errorMessageSelector } from '@/store/helpers/selectors';
import { useUserActions } from '@/store/modules/users/actions';

import UsersForm from '@/modules/Users/components/UsersForm/UsersForm';
import UsersTable from '@/modules/Users/components/UsersTable';

const UsersPage: FunctionComponent = () => {
  const users = useAppSelector(selectUsers);
  const isLoading = useAppSelector(loadingSelector(['GET_USERS']));
  const hasError = useAppSelector(errorMessageSelector(['GET_USERS']));
  console.log('isLoading', isLoading);
  console.log('hasError', hasError);
  const { getUsers } = useUserActions();

  useEffect(() => {
    if (users.length === 0) {
      getUsers();
    }
  }, [users.length]);

  const handleSubmit = () => {};

  return (
    <section>
      <header>
        <h2 className="text-center my-3">Users</h2>
      </header>

      <div className="w-25 mx-auto mb-3">
        <UsersForm onSubmit={handleSubmit} />
      </div>

      <div className="w-50 mx-auto mb-3">
        <UsersTable users={users} />
      </div>
    </section>
  );
};

export default UsersPage;
