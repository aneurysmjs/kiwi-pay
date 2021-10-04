import { Route, BrowserRouter as Router } from 'react-router-dom';
import loadable from '@loadable/component';

import Layout from '~/components/common/Layout';

import Home from '~/components/pages/Home';

import Range from '~/components/pages/Range';

const Builder = loadable(() => import('~/components/pages/Builder'));

const Routing = (): JSX.Element => (
  <Router>
    <Layout>
      <Route exact path="/" component={Home} />
      <Route path="/builder" component={Builder} />
      <Route path="/range" component={Range} />
    </Layout>
  </Router>
);

export default Routing;
