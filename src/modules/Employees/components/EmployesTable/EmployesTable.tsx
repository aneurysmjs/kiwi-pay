import { FunctionComponent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import getUserAge from '@/utils/getUserAge';

import type { Employee } from '@/store/modules/employees/types';

interface EmployeesTableProps {
  employees: Employee[];
  onEdit: (user: Employee) => void;
}

const sortEmployees = (toggled: boolean) => (a: Employee, b: Employee) => {
  const x = a.name.toLowerCase();
  const y = b.name.toLowerCase();

  // const order = toggled ? 1 : -1;

  // if (x > y) {
  //   return 1;
  // }

  // if (x < y) {
  //   return -1;
  // }

  // return 0;

  return toggled ? x > y : x < y;
};

const EmployesTable: FunctionComponent<EmployeesTableProps> = ({ employees, onEdit }) => {
  const [isSorted, setIsSorted] = useState(true);
  const handleEdit = (user: Employee) => {
    onEdit(user);
  };

  const handleSort = (property: keyof Employee) => {
    console.log('property', property);

    setIsSorted((prev) => !prev);

    // sortEmployees(property);
  };

  const sortedEmployees = employees.sort(sortEmployees(isSorted));

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Years of experience</th>
          <th>Position Applied</th>
          <th>Applied</th>
          <th>Status</th>
          {/* <th onClick={() => handleSort('name')}>User Name</th>
          <th>Phone</th> */}
          {/* <th> </th> */}
        </tr>
      </thead>
      <tbody>
        {sortedEmployees.length
          ? sortedEmployees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{getUserAge(employee.birth_date)}</td>
                <td>{employee.year_of_experience}</td>
                <td>{employee.position_applied}</td>
                <td>{employee.application_date}</td>
                <td>{employee.status}</td>
                {/* <td>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="mx-3"
                    onClick={() => handleEdit(employee)}
                  />
                  <FontAwesomeIcon icon={faTrash} />
                </td> */}
              </tr>
            ))
          : null}
      </tbody>
    </table>
  );
};

export default EmployesTable;
