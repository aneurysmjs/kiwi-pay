import { FunctionComponent, FormEventHandler, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';

import type { User } from '@/store/modules/users/types';

interface UsersTableProps {
  users: User[];
  onEdit: (user: User) => void;
  // onSort: (property: keyof User) => void;
}

const sortUsers = (toggled: boolean) => (a: User, b: User) => {
  const x = a.username.toLowerCase();
  const y = b.username.toLowerCase();

  // const order = toggled ? 1 : -1;

  console.log('');

  // if (x > y) {
  //   return 1;
  // }

  // if (x < y) {
  //   return -1;
  // }

  // return 0;

  return toggled ? x > y : x < y;
};

const UsersTable: FunctionComponent<UsersTableProps> = ({ users, onEdit }) => {
  const [isSorted, setIsSorted] = useState(true);
  const handleEdit = (user: User) => {
    onEdit(user);
  };

  const handleSort = (property: keyof User) => {
    console.log('property', property);

    setIsSorted((prev) => !prev);

    // sortUsers(property);
  };

  const sortedUsers = users.sort(sortUsers(isSorted));

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Full Name</th>
          <th onClick={() => handleSort('username')}>User Name</th>
          <th>Phone</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {sortedUsers.length
          ? sortedUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.phone}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="mx-3"
                    onClick={() => handleEdit(user)}
                  />
                  <FontAwesomeIcon icon={faTrash} />
                </td>
              </tr>
            ))
          : null}
      </tbody>
    </table>
  );
};

export default UsersTable;
