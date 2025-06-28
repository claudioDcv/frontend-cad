import { Route, Switch, useLocation } from 'wouter';
import routes from './conf/routes';

import Index from './pages/index';
import ResolutionDetail from './pages/resolution-detail';
import NotFound from './pages/not-found';
import { useEffect } from 'react';

const Router = () => {
  const [location] = useLocation();

  useEffect(() => {
    window.parent.postMessage({ action: 'changeLocation', location: '/todo-lo-nuevo' }, '*');
  }, [location]);

  return (
    <Switch>
      <Route path={routes().index.link} component={Index} />
      <Route path={routes().contracts.link} component={ResolutionDetail} />
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Router;
