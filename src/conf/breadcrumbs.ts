import routes from './routes';

const breadcrumbs = {
  '/': [routes.index],
  '/resolutions/:id': [routes.index, routes.resolutionDetail],
  '/notifications': [routes.index, routes.notifications],
  '/ws-test': [routes.index, routes.wsTest],
};

export default breadcrumbs;
