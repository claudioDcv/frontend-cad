import { createContext } from 'react';
import { InitialDataContextValue } from './types';

export const initialValue: InitialDataContextValue = {
  inventoryTypes: [],
};

const InitialDataContext = createContext<InitialDataContextValue>(initialValue);

export default InitialDataContext;
