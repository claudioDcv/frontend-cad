import { useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import routes from './conf/routes';
import Index from './pages/index';
import ResolutionDetail from './pages/resolution-detail';
import NotFound from './pages/not-found';
import Notifications from './pages/notifications';
import { Header } from './components';
import Receiver from './components/organisms/notification-container/components/receiver';

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
      <Receiver />
      <Header />
      <Switch>
        <Route path={routes.index.link} component={Index} />
        <Route
          path={routes.resolutionDetail.link}
          component={ResolutionDetail}
        />
        <Route path={routes.notifications.link} component={Notifications} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default Router;
