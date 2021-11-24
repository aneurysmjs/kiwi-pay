import { FunctionComponent } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import Layout from '~/components/common/Layout';
import Home from '~/components/pages/Home';

const AppRouter: FunctionComponent = () => (
  <Router>
    <Layout>
      <Route exact path="/" component={Home} />
    </Layout>
  </Router>
);

export default AppRouter;
