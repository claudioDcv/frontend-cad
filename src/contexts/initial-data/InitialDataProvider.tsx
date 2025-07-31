import { useEffect, useState } from 'react';
import InitialDataContext, { initialValue } from './InitialDataContext';
import { InitialDataContextValue } from './types';
import useServices from './hooks/useServices';
import { FetchStatus } from '@/constants';

const InitialDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [value, setValue] = useState<InitialDataContextValue>(initialValue);

  const services = useServices();

  useEffect(() => {
    if (services.getAllInventoryTypes.status === FetchStatus.SUCCESS) {
      setValue((prevData) => ({
        ...prevData,
        inventoryTypes: services.getAllInventoryTypes.data,
      }));
    }
  }, [
    services.getAllInventoryTypes.data,
    services.getAllInventoryTypes.status,
  ]);

  return (
    <InitialDataContext.Provider value={value}>
      {children}
    </InitialDataContext.Provider>
  );
};

export default InitialDataProvider;
