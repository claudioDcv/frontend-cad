export interface Location {
  locationId: number;
  locationNumber: number;
  locationCode: string;
  locationName: string;
  locationAlias: string;
  locationAddress: string;
  locationManager: string;
  managerEmail: string | null;
  managerPhone: string | null;
}

export interface Props {
  investmentId: string;
  status: boolean | null;
}
