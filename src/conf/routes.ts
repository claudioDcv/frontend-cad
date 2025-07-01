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
    link: appendPrefix('/contracts/:id'),
    path: (id: string) => appendPrefix(`/contracts/${id}`),
    label: 'routes.contracts',
  },
  notFound: {
    link: '',
    label: 'routes.notFound',
  },
};

export default routes;
