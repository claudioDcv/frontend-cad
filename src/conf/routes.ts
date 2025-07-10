const prefix = import.meta.env.VITE_URL_PREFIX || '';

const appendPrefix = (path: string) => {
  return prefix + path;
};

const routes = {
  index: {
    link: appendPrefix('/'),
    label: 'routes.home',
  },
  resolutionDetail: {
    link: appendPrefix('/resolutions/:id'),
    path: (id: string) => appendPrefix(`/resolutions/${id}`),
    label: 'routes.resolutions',
  },
  notifications: {
    link: appendPrefix('/notifacations'),
    label: 'notificaciones',
  },
  notFound: {
    link: '',
    label: 'routes.notFound',
  },
};

export default routes;
