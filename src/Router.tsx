import { useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import routes from './conf/routes';
import NotFound from './pages/common/not-found';
import Notifications from './pages/common/notifications';
import { Header } from './components';
import Index from './pages/common/index';
import Documents from './pages/common/documents';
import ResolutionDetail from './pages/common/resolution-detail';

const Router = (props: { hostUrl: string }) => {
  const [location, setLocation] = useLocation();
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (
      props.hostUrl &&
      props.hostUrl !== '/' &&
      !init &&
      props.hostUrl !== ''
    ) {
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
    <div>
      <Header />
      <Switch>
        <Route path={routes.common.index.link} component={Index} />
        <Route path={routes.operator.documents.link} component={Documents} />
        <Route
          path={routes.operator.resolutionDetail.link}
          component={ResolutionDetail}
        />
        <Route
          path={routes.operator.notifications.link}
          component={Notifications}
        />
        <Route path={routes.cordinator.documents.link} component={Documents} />
        <Route
          path={routes.cordinator.resolutionDetail.link}
          component={ResolutionDetail}
        />
        <Route
          path={routes.cordinator.notifications.link}
          component={Notifications}
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default Router;
