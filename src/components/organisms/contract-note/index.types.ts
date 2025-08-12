import { ContractMetadata } from '@/entities/Contract.entity';
import { toDay } from '@/utils';

export interface ContractNoteProps {
  metadata?: ContractMetadata | null;
  onSuccess: (contract: ContractMetadata) => void;
  onClose: () => void;
  loading: boolean;
  editable?: boolean;
}

const getCreatedAt = (): string => {
  return toDay().toString();
};

export const initialState = (): ContractMetadata => ({
  contractId: 0,
  note: null,
  reviewed: false,
  reviewedBy: null,
  reviewedAt: null,
  confirmedBy: null,
  confirmedAt: null,
  createdAt: getCreatedAt(),
  updatedAt: null,
});
