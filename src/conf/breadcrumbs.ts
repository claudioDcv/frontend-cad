import { validRoles } from '@/constants';
import routes from './routes';

const breadcrumbs = {
  '/': [routes.common.index],
  // Operador
  [`/${validRoles.operator}`]: [routes.common.index, routes.operator.documents],
  [`/${validRoles.operator}/resolutions/:id`]: [
    routes.common.index,
    routes.operator.documents,
    routes.operator.resolutionDetail,
  ],
  [`/${validRoles.operator}/packinglist/:id`]: [
    routes.common.index,
    routes.operator.documents,
    routes.operator.packinglistDetail,
  ],
  [`/${validRoles.operator}/notifications`]: [
    routes.common.index,
    routes.operator.documents,
    routes.operator.notifications,
  ],
  // Cordinador
  [`/${validRoles.cordinator}`]: [
    routes.common.index,
    routes.cordinator.documents,
  ],
  [`/${validRoles.cordinator}/resolutions/:id`]: [
    routes.common.index,
    routes.cordinator.documents,
    routes.cordinator.resolutionDetail,
  ],
  [`/${validRoles.cordinator}/packinglist/:id`]: [
    routes.common.index,
    routes.cordinator.documents,
    routes.cordinator.packinglistDetail,
  ],
  [`/${validRoles.cordinator}/notifications`]: [
    routes.common.index,
    routes.cordinator.documents,
    routes.cordinator.notifications,
  ],
};

export default breadcrumbs;
