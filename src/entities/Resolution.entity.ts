export interface ResolutionMetadata {
  resolutionId: number;
  resolvedBy: number | null;
  resolvedAt: string | null;
  opened: string;
  openedBy: number | null;
  openedAt: string | null;
}

export type Resolution = {
  resolutionId: number;
  resolutionNumber: number;
  barcode: string;
  dispatchGuide: number;
  investmentName: string;
  locationName: string;
  closeDate: string;
  contractCount: number;
  totalJewels: number;
  categoryName: string;
  stateName: string;
  locationAddress: string;
  investmentRut: string;
  securityBag: string;
  statusId: number;
  categoryId: number;
  metadata: ResolutionMetadata | null;
  hasMetadata: boolean;
};
