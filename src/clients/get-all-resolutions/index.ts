import client from './client';
import { Resolution } from '@/entities/Resolution.entity';
import { Paginated } from '../types';
import useAsyncCall from '@/hooks/useAsyncCall';
import { ResolutionFormModel } from '@/pages/common/documents/types';
import { initial } from './utils';

const useGetAllResolutions = () => useAsyncCall<ResolutionFormModel, Paginated<Resolution>>({
  client,
  initial,
});

export default useGetAllResolutions;
