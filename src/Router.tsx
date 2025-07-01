import { useEffect } from 'react';
import { Redirect, Route, Switch, useLocation } from 'wouter';
import routes from './conf/routes';
import Index from './pages/index';
import ResolutionDetail from './pages/resolution-detail';
import NotFound from './pages/not-found';

const Router = () => {
  const [location] = useLocation();

  useEffect(() => {
    window.parent.postMessage(
      { action: 'changeLocation', location: location },
      '*'
    );
  }, [location]);

  return (
    <Switch>
      <Route path={routes().index.link} component={Index} />
      <Route path={routes().contracts.link} component={ResolutionDetail} />
      <Route path={routes().notFound.link} component={NotFound} />
      <Route>
        <Redirect to={routes().notFound.link} />
      </Route>
    </Switch>
  );
};

export default Router;
