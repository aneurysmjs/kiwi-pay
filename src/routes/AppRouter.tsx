import { FunctionComponent } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from '@/components/common/Layout';
import HomePage from '@/modules/Home/pages/HomePage';

const AppRouter: FunctionComponent = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRouter;
