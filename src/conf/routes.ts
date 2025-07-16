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
    link: appendPrefix('/operator'),
    label: 'routes.operatorDocuments',
  },
  resolutionDetail: {
    link: appendPrefix('/operator/resolutions/:id'),
    path: (id: string) => appendPrefix(`/operator/resolutions/${id}`),
    label: 'routes.resolutions',
  },
  notifications: {
    link: appendPrefix('/operator/notifications'),
    label: 'routes.notifications',
  },
};

const cordinator = {
  documents: {
    link: appendPrefix('/cordinator'),
    label: 'routes.cordinatorDocuments',
  },
  resolutionDetail: {
    link: appendPrefix('/cordinator/resolutions/:id'),
    path: (id: string) => appendPrefix(`/cordinator/resolutions/${id}`),
    label: 'routes.resolutions',
  },
  notifications: {
    link: appendPrefix('/cordinator/notifications'),
    label: 'routes.notifications',
  },
};

const routes = {
  common,
  operator,
  cordinator,
};

export default routes;
