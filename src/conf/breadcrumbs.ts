import routes from './routes';

const breadcrumbs = {
  '/': [routes.common.index],
  // Operador
  '/operator': [routes.common.index, routes.operator.documents],
  '/operator/resolutions/:id': [
    routes.operator.documents,
    routes.operator.resolutionDetail,
  ],
  '/operator/notifications': [
    routes.operator.documents,
    routes.operator.notifications,
  ],
  // Cordinador
  '/cordinator': [routes.common.index, routes.cordinator.documents],
  '/cordinator/resolutions/:id': [
    routes.cordinator.documents,
    routes.cordinator.resolutionDetail,
  ],
  '/cordinator/notifications': [
    routes.cordinator.documents,
    routes.cordinator.notifications,
  ],
};

export default breadcrumbs;
