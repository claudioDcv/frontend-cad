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

export function matchRoute<T>(
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
