import { FunctionComponent, FormEventHandler, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';

import type { User } from '@/store/modules/users/types';

interface UsersTableProps {
  users: User[];
  onEdit: (user: User) => void;
}

const UsersTable: FunctionComponent<UsersTableProps> = ({ users, onEdit }) => {
  const handleEdit = (user: User) => {
    onEdit(user);
  };
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>User Name</th>
          <th>Phone</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {users.length
          ? users.map((user) => (
              <tr>
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
