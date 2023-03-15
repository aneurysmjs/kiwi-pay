import { FunctionComponent, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from '@/components/common/Layout';
import Loader from '@/components/common/Loader';
import HomePage from '@/modules/Home/pages/HomePage';
const AdminPage = lazy(() => import('@/modules/Admin/pages/AdminPage'));
const UsersPage = lazy(() => import('@/modules/Users/pages/UsersPage'));
const EmployeesPage = lazy(() => import('@/modules/Employees/pages/EmployeesPage'));

const AppRouter: FunctionComponent = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="/admin"
          element={
            <Suspense fallback={<Loader />}>
              <AdminPage />
            </Suspense>
          }
        />
        <Route
          path="/users"
          element={
            <Suspense fallback={<Loader />}>
              <UsersPage />
            </Suspense>
          }
        />
        <Route
          path="/employees"
          element={
            <Suspense fallback={<Loader />}>
              <EmployeesPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  </Router>
);

export default AppRouter;
