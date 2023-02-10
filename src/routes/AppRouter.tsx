import { FunctionComponent, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from '@/components/common/Layout';
import Loader from '@/components/common/Loader';
import HomePage from '@/modules/Home/pages/HomePage';
const AdminPage = lazy(() => import('@/modules/Admin/pages/AdminPage'));

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
      </Route>
    </Routes>
  </Router>
);

export default AppRouter;
