import { FunctionComponent, useState, PropsWithChildren } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons/faSortDown';
import { faSortUp } from '@fortawesome/free-solid-svg-icons/faSortUp';
import { faSort } from '@fortawesome/free-solid-svg-icons/faSort';

import type { Employee } from '@/store/modules/employees/types';

import { usePagination } from './usePagination';
import { TablePagination } from './TablePagination';

export interface TableColumn<T> {
  title: string;
  sortBy?: keyof T;
  dataIndex: keyof T;

  onSort?: (prop: string) => void;
  formatter?: (prop: T[keyof T]) => string;
}

interface EmployeesTableProps<T> {
  dataSource: T[];
  columns: TableColumn<T>[];
  stickyHeader?: boolean;
}

const SortIcon: FunctionComponent = () => {
  return (
    <span>
      {/* <FontAwesomeIcon icon={faSortUp} />
      <FontAwesomeIcon icon={faSortDown} /> */}
      <FontAwesomeIcon icon={faSort} />
    </span>
  );
};

interface Keyable {
  id: number;
}

const paginate = <T,>(array: T[], pageSize: number, pageMumber: number) => {
  return array.slice((pageMumber - 1) * pageSize, pageMumber * pageSize);
};

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

const Table = <T extends Keyable>({
  dataSource,
  columns,
  stickyHeader,
}: PropsWithChildren<EmployeesTableProps<T>>) => {
  const [isSorted, setIsSorted] = useState(true);

  const handleSort = (property: keyof T) => {
    console.log('property', property);

    setIsSorted((prev) => !prev);
  };

  const sortedData = dataSource.sort(sortEmployees(isSorted));

  const rowsPerPage = 15;
  const [page, setPage] = useState(1);
  const { slice, range } = usePagination(sortedData, page, rowsPerPage);

  console.log('slice', slice);

  /* <td>
    <FontAwesomeIcon
      icon={faEdit}
      className="mx-3"
      onClick={() => handleEdit(employee)}
    />
    <FontAwesomeIcon icon={faTrash} />
  </td> */

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={`${index}-${column.title}`}
                {...(stickyHeader
                  ? {
                      style: {
                        position: 'sticky',
                        top: 0,
                      },
                    }
                  : null)}
                {...(column.sortBy
                  ? {
                      onClick: () => handleSort(column.sortBy as NonNullable<typeof column.sortBy>),
                    }
                  : undefined)}
              >
                {column.title}
                {column.sortBy ? <SortIcon /> : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {slice.length
            ? slice.map((dataItem) => {
                return (
                  <tr key={dataItem.id}>
                    {columns.map((column, index) => {
                      const tdData = dataItem[column.dataIndex];

                      return (
                        <td key={`${index}-${column.title}`}>
                          {/*
                           * by wrapping with fragment we avoid the following type error:
                           *
                           * Type 'T[string] | T[number] | T[symbol]' cannot be assigned to type 'ReactNode'
                           */}
                          <>{column.formatter ? column.formatter(tdData) : tdData}</>
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>

      <TablePagination range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default Table;
