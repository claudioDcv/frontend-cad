import { validRoles } from '@/constants';

const prefix = import.meta.env.VITE_URL_PREFIX || '';

const appendPrefix = (path: string) => {
  return prefix + path;
};

const common = {
  index: {
    link: appendPrefix('/'),
    label: 'Inicio',
  },
  notFound: {
    link: '',
    label: 'routes.notFound',
  },
};

const operator = {
  documents: {
    link: appendPrefix(`/${validRoles.operator}`),
    label: 'routes.operatorDocuments',
  },
  resolutionDetail: {
    link: appendPrefix(`/${validRoles.operator}/resolutions/:id`),
    path: (id: string | number) =>
      appendPrefix(`/${validRoles.operator}/resolutions/${id}`),
    label: 'routes.resolutions',
  },
  packinglistDetail: {
    link: appendPrefix(`/${validRoles.operator}/packinglist/:id`),
    path: (id: string | number) =>
      appendPrefix(`/${validRoles.operator}/packinglist/${id}`),
    label: 'routes.packingList',
  },
  notifications: {
    link: appendPrefix(`/${validRoles.operator}/notifications`),
    label: 'routes.notifications',
  },
  resolutionList: {
    link: appendPrefix(`/${validRoles.operator}`),
    path: (id: string | number) =>
      appendPrefix(`/${validRoles.cordinator}?q=${id}`),
    label: 'routes.resolutionList',
  },
};

const cordinator = {
  documents: {
    link: appendPrefix(`/${validRoles.cordinator}`),
    label: 'routes.cordinatorDocuments',
  },
  resolutionDetail: {
    link: appendPrefix(`/${validRoles.cordinator}/resolutions/:id`),
    path: (id: string | number) =>
      appendPrefix(`/${validRoles.cordinator}/resolutions/${id}`),
    label: 'routes.resolutions',
  },
  packinglistDetail: {
    link: appendPrefix(`/${validRoles.cordinator}/packinglist/:id`),
    path: (id: string | number) =>
      appendPrefix(`/${validRoles.cordinator}/packinglist/${id}`),
    label: 'routes.packingList',
  },
  notifications: {
    link: appendPrefix(`/${validRoles.cordinator}/notifications`),
    label: 'routes.notifications',
  },
  resolutionList: {
    link: appendPrefix(`/${validRoles.cordinator}`),
    path: (id: string | number) =>
      appendPrefix(`/${validRoles.cordinator}?q=${id}`),
    label: 'routes.resolutionList',
  },
};

const admin = {
  receivable: {
    link: appendPrefix(`/${validRoles.admin}/receivables`),
    label: 'routes.adminReceivables',
  },
};

const routes = {
  common,
  operator,
  cordinator,
  admin,
};

export default routes;
