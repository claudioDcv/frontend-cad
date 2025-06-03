import { PropsResolution } from './types';

export function ResolutionParams(
  page: number,
  filters: {
    investment?: { value: string };
    location?: { value: string };
    materialType?: { value: string };
    status?: { value: string };
    range: [Date, Date];
  }
): PropsResolution {
  const { investment, location, materialType, status, range } = filters;

  const params: PropsResolution = {
    page,
    investmentId: investment?.value ? Number(investment.value) : undefined,
    locationId: location?.value ? Number(location.value) : undefined,
    categoryId: materialType?.value ? Number(materialType.value) : undefined,
    stateId: status?.value ? Number(status.value) : undefined,
    endDate: range[1].toISOString().split('.')[0],
  };

  if (range[0].toDateString() !== range[1].toDateString()) {
    params.startDate = range[0].toISOString().split('.')[0];
  }

  return params;
}
