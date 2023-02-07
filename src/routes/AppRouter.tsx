import { FunctionComponent } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from '@/components/common/Layout';
import HomePage from '@/modules/Home/pages/HomePage';
import AdminPage from '@/modules/Admin/pages/AdminPage';

const AppRouter: FunctionComponent = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRouter;
