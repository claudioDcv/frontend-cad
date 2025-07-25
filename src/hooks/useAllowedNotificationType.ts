import { commonNotificationTypes } from "@/constants";
import { useCallback } from "react";

// TODO: Implementar dependiendo del rol debe tener un tipo de notificaciones validas
const useAllowedNotificationType = () => {
  const getTypes = () => {
    return commonNotificationTypes;
  };

  const isAllowedType = useCallback((notificationType: string) => {
    return commonNotificationTypes.includes(notificationType);
  }, []);

  return { getTypes, isAllowedType };
};

export default useAllowedNotificationType;