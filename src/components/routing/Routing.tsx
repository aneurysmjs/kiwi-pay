import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Layout from '~/components/common/Layout';

import Home from '~/components/pages/Home';

const Routing = (): JSX.Element => (
  <Router>
    <Layout>
      <Route exact path="/" component={Home} />
    </Layout>
  </Router>
);

export default Routing;
