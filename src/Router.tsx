import { useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import routes from './conf/routes';
import Index from './pages/index';
import ResolutionDetail from './pages/resolution-detail';
import NotFound from './pages/not-found';

const Router = (props: { hostUrl: string }) => {
  const [location, setLocation] = useLocation();
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (props.hostUrl && props.hostUrl !== '/' && !init) {
      setLocation(props.hostUrl);
      setInit(true);
    }
  }, [init, props.hostUrl, setLocation]);

  useEffect(() => {
    window.parent.postMessage(
      { action: 'changeLocation', location: location },
      '*'
    );
  }, [location]);

  return (
    <Switch>
      <Route path={routes.index.link} component={Index} />
      <Route path={routes.resolutionDetail.link} component={ResolutionDetail} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Router;
