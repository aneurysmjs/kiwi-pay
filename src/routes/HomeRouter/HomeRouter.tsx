import { FunctionComponent } from 'react';
import { Route } from 'react-router-dom';

import Home from '~/components/pages/Home';

const HomeRouter: FunctionComponent = () => {
  return <Route exact path="/" component={Home} />;
};

export default HomeRouter;
