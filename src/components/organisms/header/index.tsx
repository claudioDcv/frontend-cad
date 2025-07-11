import { Breadcrumb, NotificationDrawer } from '@/components';
import breadcrumbs from '@/conf/breadcrumbs';
import { Box } from '@mui/material';
import { useLocation } from 'wouter';

function matchPattern(
  path: string,
  pattern: string
): { params: Record<string, string> } | null {
  // Normalizar el patrón
  const normalizedPattern = pattern.replace(/\/$/, '') || '/';

  // Coincidencia exacta
  if (normalizedPattern === path) {
    return { params: {} };
  }

  // Convertir el patrón en regex
  const paramNames: string[] = [];
  const regexPattern = normalizedPattern
    .replace(/:[^/]+/g, (match) => {
      // Extraer el nombre del parámetro sin los dos puntos
      paramNames.push(match.slice(1));
      return '([^/]+)';
    })
    .replace(/\//g, '\\/');

  const regex = new RegExp(`^${regexPattern}$`);
  const match = path.match(regex);

  if (!match) {
    return null;
  }

  // Construir objeto de parámetros
  const params: Record<string, string> = {};
  paramNames.forEach((name, index) => {
    params[name] = match[index + 1];
  });

  return { params };
}

function matchRoute<T>(
  path: string,
  patterns: Record<string, T>
): { match: T; params: Record<string, string> } | null {
  // Normalizar el path removiendo barras finales
  const normalizedPath = path.replace(/\/$/, '') || '/';

  for (const [pattern, value] of Object.entries(patterns)) {
    const result = matchPattern(normalizedPath, pattern);
    if (result) {
      return {
        match: value,
        params: result.params,
      };
    }
  }

  return null;
}

const Header = () => {
  const [location] = useLocation();
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ my: 1.2 }}
    >
      <Breadcrumb items={matchRoute(location, breadcrumbs)?.match || []} />
      <NotificationDrawer />
    </Box>
  );
};

export default Header;
