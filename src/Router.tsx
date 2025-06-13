import { Route, Switch } from 'wouter';
import routes from './conf/routes';

import Index from './pages/index';
import NotFound from './pages/not-found';

const Router = () => (
  <Switch>
    <Route path={routes().index.link} component={Index} />
    <Route>
      <NotFound />
    </Route>
  </Switch>
);

export default Router;