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
};

export type ContractQuery = {
  resolutionId?: number;
  clientRut?: string;
  responsible?: string;
  expirationBefore?: string;
  contractId?: number;
  contractNumber?: string;
};
