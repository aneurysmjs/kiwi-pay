import { FunctionComponent, useEffect, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSortDown } from '@fortawesome/free-solid-svg-icons/faSortDown';
// import { faSortUp } from '@fortawesome/free-solid-svg-icons/faSortUp';
// import { faSort } from '@fortawesome/free-solid-svg-icons/faSort';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector } from '@/store/hooks';
import { selectEmployees } from '@/store/modules/employees/selectors';
import { loadingSelector, errorMessageSelector } from '@/store/helpers/selectors';
import { useEmployeesActions } from '@/store/modules/employees/actions';
import { type Employee } from '@/store/modules/employees/types';
import getUserAge from '@/utils/getUserAge';
import Table, { type TableColumn } from '@/components/common/Table';

const columns: TableColumn<Employee>[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    sortBy: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Age',
    dataIndex: 'birth_date',
    formatter: (birthDate: Employee[keyof Employee]) => `${getUserAge(birthDate as string)}`,
  },
  {
    title: 'Years of experience',
    dataIndex: 'year_of_experience',
  },
  {
    title: 'Position Applied',
    dataIndex: 'position_applied',
  },
  {
    title: 'Applied',
    dataIndex: 'application_date',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
];

const EmployeesTable: FunctionComponent = () => {
  const employees = useAppSelector(selectEmployees);
  const isLoading = useAppSelector(loadingSelector(['GET_EMPLOYEES']));
  const hasError = useAppSelector(errorMessageSelector(['GET_EMPLOYEES']));
  console.log('isLoading', isLoading);
  console.log('hasError', hasError);
  const { getEmployees } = useEmployeesActions();

  const [searchParams, setSearchParams] = useSearchParams();

  console.log('Object.fromEntries(searchParams)', Object.fromEntries(searchParams));
  const rowsPerPage = 15;
  // const [page, setPage] = useState(1);
  // const { slice, range } = usePagination(employees, page, rowsPerPage);

  // console.log('slice', slice);

  useEffect(() => {
    setSearchParams(`?${new URLSearchParams({ sort: 'name', filter: 'status' })}`);
  }, []);

  useEffect(() => {
    if (employees.length === 0) {
      getEmployees();
    }
  }, [employees.length]);

  return (
    <section>
      <div className="w-75 mx-auto mb-3">
        <Table<Employee> columns={columns} dataSource={employees} />
      </div>
    </section>
  );
};

export default EmployeesTable;
