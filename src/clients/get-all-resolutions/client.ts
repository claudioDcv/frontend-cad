import { clearAllProps, clearProp } from '../utils';
import { Props } from './types';
import { remap } from './utils';
import { getFetch } from '../customFetch';
import { Paginated } from '../types';
import { Resolution } from '@/entities/Resolution.entity';
import { ResolutionFormModel } from '@/pages/common/documents/types';

const client = async (props: ResolutionFormModel) => {
  const params: Props = {
    page: Number(clearProp(props.page - 1)),
    resolutionNumber: clearProp(props.resolutionNumber),
    investmentId: clearProp(props.investment.value),
    locationId: clearProp(props.location.value),
    categoryId: clearProp(props.categoryId.value),
    statusId: clearProp(props.status.value),
    startDate: clearProp(props?.range?.[0]?.toISOString()),
    endDate: clearProp(props?.range?.[1]?.toISOString()),
    size: 15,
  };

  if (typeof props.hasMetadata !== 'undefined') {
    params.hasMetadata = props.hasMetadata;
  }

  const query = new URLSearchParams(clearAllProps(params)).toString();
  const url = `resolutions?${query}`;
  return getFetch<Paginated<Resolution>>(url, { remap }, {
    responseError: 'error.getAllResolutionsFetch',
    defaultError: 'error.getAllResolutionsParse',
  });
}

export default client;
