import { validRoles } from '@/constants';
import routes from './routes';

const breadcrumbs = {
  '/': [routes.common.index],
  // Operador
  [`/${validRoles.operator}`]: [routes.common.index, routes.operator.documents],
  [`/${validRoles.operator}/resolutions/:id`]: [
    routes.operator.documents,
    routes.operator.resolutionDetail,
  ],
  [`/${validRoles.operator}/notifications`]: [
    routes.operator.documents,
    routes.operator.notifications,
  ],
  // Cordinador
  [`/${validRoles.cordinator}`]: [routes.common.index, routes.cordinator.documents],
  [`/${validRoles.cordinator}/resolutions/:id`]: [
    routes.cordinator.documents,
    routes.cordinator.resolutionDetail,
  ],
  [`/${validRoles.cordinator}/notifications`]: [
    routes.cordinator.documents,
    routes.cordinator.notifications,
  ],
};

export default breadcrumbs;
