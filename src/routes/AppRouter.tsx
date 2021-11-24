import { FunctionComponent } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Layout from '~/components/common/Layout';

import HomeRouter from '~/routes/Home/HomeRouter';

const AppRouter: FunctionComponent = () => (
  <Router>
    <Layout>
      <HomeRouter />
    </Layout>
  </Router>
);

export default AppRouter;
