const prefix = import.meta.env.VITE_URL_PREFIX || '';

const appendPrefix = (path: string) => {
    return prefix + path;
};

const routes = {
    index: {
        link: appendPrefix('/'),
        label: 'Home',
    },
    contracts: {
        link: appendPrefix('/contracts/:id'),
        label: 'Lista de Contratos',
    },
}

export default routes;