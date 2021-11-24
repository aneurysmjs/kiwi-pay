import { FunctionComponent } from 'react';
import loadable from '@loadable/component';
import { Switch, Route } from 'react-router-dom';

const HomePage = loadable(() => import('~/modules/Home/pages/HomePage'));

const HomeRouter: FunctionComponent = () => (
  <Switch>
    <Route component={HomePage} path="/" exact />
  </Switch>
);

export default HomeRouter;
