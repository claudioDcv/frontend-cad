import { use } from 'react';
import { InitialDataContextValue } from './types';
import InitialDataContext from './InitialDataContext';

export function useInitialData(): InitialDataContextValue {
  const context = use(InitialDataContext);
  if (!context) {
    throw new Error('useInitialData must be used within a InitialDataProvider');
  }
  return context;
}
