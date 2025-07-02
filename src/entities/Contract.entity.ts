type ContractMetaData = {
  contractId: number;
  note: string | null;
  reviewed: boolean;
  reviewedBy: number | null;
  reviewedAt: string | null;
  confirmedBy: number | null;
  confirmedAt: string | null;
  createdAt: string;
  updatedAt: string | null;
};

export type Contract = {
  contractId: number;
  contractNumber: number;
  securityBagCode: string;
  jewelQuantity: number;
  totalContractValue: number;
  averagePurchaseValue: number;
  totalWeight: number;
  startDate: string;
  endDate: string;
  responsibleName: string;
  clientName: string;
  clientRut: string;
  cadMetadata: ContractMetaData | null;
};
