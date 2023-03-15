import { FunctionComponent, useEffect } from 'react';

import { useAppSelector } from '@/store/hooks';
import { selectEmployees } from '@/store/modules/employees/selectors';
import { loadingSelector, errorMessageSelector } from '@/store/helpers/selectors';
import { useEmployeesActions } from '@/store/modules/employees/actions';

import EmployesTable from '@/modules/Employees/components/EmployesTable';

const EmployeesPage: FunctionComponent = () => {
  const employeees = useAppSelector(selectEmployees);
  const isLoading = useAppSelector(loadingSelector(['GET_EMPLOYEES']));
  const hasError = useAppSelector(errorMessageSelector(['GET_EMPLOYEES']));
  console.log('isLoading', isLoading);
  console.log('hasError', hasError);
  const { getEmployees } = useEmployeesActions();

  useEffect(() => {
    if (employeees.length === 0) {
      getEmployees();
    }
  }, [employeees.length]);

  return (
    <section>
      <header>
        <h2 className="text-center my-3">Employees</h2>
      </header>

      {/* <div className="w-25 mx-auto mb-3">
        <UsersForm onSubmit={handleSubmit} />
      </div> */}

      <div className="w-75 mx-auto mb-3">
        <EmployesTable employees={employeees} onEdit={() => {}} />
      </div>
    </section>
  );
};

export default EmployeesPage;
