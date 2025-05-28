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

