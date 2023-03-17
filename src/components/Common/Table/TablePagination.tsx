import { FunctionComponent, useEffect, Dispatch, SetStateAction } from 'react';

interface TablePaginationProps {
  range: number[];
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
  slice: any[];
}

export const TablePagination: FunctionComponent<TablePaginationProps> = ({ range, setPage, page, slice }) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);

  return (
    <div className="btn-group">
      {range.map((el, index) => (
        <button
          key={index}
          className={`btn btn-primary ${page === el ? 'active' : 'btn-secondary'}`}
          onClick={() => setPage(el)}
        >
          {el}
        </button>
      ))}
    </div>
  );
};
