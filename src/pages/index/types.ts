import { Option } from '../../types';

export interface FormModel {
  materialType: Option;
  status: Option;
  investment: Option;
  location: Option;
  dateRange: [Date, Date];
}

export type ResolutionModel = {
  resolutionId: number;
  resolutionNumber: number;
  resolutionBarcode: string;
  dispatchGuideNumber: number;
  investmentName: string;
  branchName: string;
  closureDate: string;
  contractQuantity: number;
  jewelTotalCount: number;
  categoryName: string;
  stateName: string;
};

export type PropsResolution = {
  page: number;
  size?: number;
  sort?: string;
  investmentId?: number;
  locationId?: number;
  categoryId?: number;
  stateId?: number;
  startDate?: string;
  endDate?: string;
};