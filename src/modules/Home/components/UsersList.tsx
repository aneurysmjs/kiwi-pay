import { FunctionComponent, useEffect } from 'react';
import isEmpty from 'ramda/src/isEmpty';

import { useUsers } from '~store_OLD/Users/UsersStore';

const UsersList: FunctionComponent = () => {
  const { usersState, usersActions } = useUsers();

  const { getUsers } = usersActions;

  if (isEmpty(usersState.users)) {
    getUsers();
  }

  console.log('usersState', usersState);

  // const [meta] = useGetUsers();

  // console.log('meta', meta);

  // return <div>{meta.data && <pre>{JSON.stringify(meta.data, null, 2)}</pre>}</div>;

  return <h1>Home</h1>;
};

export default UsersList;
