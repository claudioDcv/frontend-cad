import { useTranslation } from 'react-i18next';

const prefix = import.meta.env.VITE_URL_PREFIX || '';

const appendPrefix = (path: string) => {
  return prefix + path;
};

const useRoutes = () => {
  const { t } = useTranslation();

  return {
    index: {
      link: appendPrefix('/'),
      label: t('routes.home'),
    },
    contracts: {
      link: appendPrefix('/contracts/:id'),
      label: t('routes.contracts'),
    },
  };
};

export default useRoutes;
