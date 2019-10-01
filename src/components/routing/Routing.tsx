import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import loadable from '@loadable/component';

import Layout from '~/components/common/Layout';

import Home from '~/components/pages/Home';

const Admin = loadable(() => import('~/components/pages/Admin'));

const Routing = (): JSX.Element => (
  <Router>
    <Layout>
      <Route exact path="/" component={Home} />
      <Route path="/admin" component={Admin} />
    </Layout>
  </Router>
);

export default Routing;
