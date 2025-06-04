import { Route, Switch } from 'wouter';
import routes from './conf/routes';

import Index from './pages/index';
import Contracts from './pages/contracts';
import NotFound from './pages/not-found';

const Router = () => (
  <Switch>
    <Route path={routes.index.link} component={Index} />
    <Route path={routes.contracts.link} component={Contracts} />
    <Route>
      <NotFound />
    </Route>
  </Switch>
);

export default Router;