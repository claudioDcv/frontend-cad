import { ContractMetadata } from '@/entities/Contract.entity';
import { toDay } from '@/utils';

export const initialState: ContractMetadata = {
  contractId: 0,
  note: null,
  reviewed: false,
  reviewedBy: null,
  reviewedAt: null,
  confirmedBy: null,
  confirmedAt: null,
  createdAt: toDay.toString(),
  updatedAt: null,
};
