import { Option } from '../../types';

export interface ResolutionFormModel {
  materialType: Option;
  status: Option;
  investment: Option;
  location: Option;
  dateRange: [Date, Date];
}

export interface PackingListFormModel {
  status: Option;
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

export type PropsPackingList = {
  page: number;
  size?: number;
  sort?: string;
  startDate?: string;
  endDate?: string;
  originCcId?: number;
  destinyCcId?: number;
  categoryId?: number;
  statusId?: number;
};
