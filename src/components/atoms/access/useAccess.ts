import { useLocation } from 'wouter';
import { validRoles } from '@/constants';

const useAccess = (): ((roles: (string | number)[]) => boolean) => {
  const [location] = useLocation();

  const accessControl = (roles: (string | number)[]): boolean => {
    if (!location) return false;

    const rolesAsString = roles.map((r) => String(r));

    return rolesAsString.some((role) => {
      const routeKey = Object.keys(validRoles).find(
        (key) => validRoles[key as keyof typeof validRoles] === role
      );

      return routeKey ? location.includes(routeKey) : false;
    });
  };

  return accessControl;
};

export default useAccess;
