import { Option } from '../../types';

export interface FormModel {
  materialType: Option;
  status: Option;
  investment: Option;
  branch: Option;
  dateRange: [Date, Date];
}

export type ResolutionModel = {
  resolutionId: number;
  resolutionNumber: number;
  resolutionBarcode: string;
  dispatchGuideNumber: number;
  investmentName: string;
  branchName: string;
  closureDate: string; // o Date
  contractQuantity: number;
  jewelTotalCount: number;
  categoryName: string;
  stateName: string;
};

