import { FunctionComponent } from 'react';

import EmployesTable from '@/modules/Employees/components/EmployeesTable';

const EmployeesPage: FunctionComponent = () => {
  return (
    <section>
      <header>
        <h2 className="text-center my-3">Employees</h2>
      </header>

      {/* <div className="w-25 mx-auto mb-3">
        <UsersForm onSubmit={handleSubmit} />
      </div> */}

      <EmployesTable />
    </section>
  );
};

export default EmployeesPage;
