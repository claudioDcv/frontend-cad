import { clearAllProps, clearProp } from '../utils';
import { Props } from './types';
import { remap } from './utils';
import { getFetch } from '../customFetch';
import { Paginated } from '../types';
import { Resolution } from '@/entities/Resolution.entity';
import { ResolutionFormModel } from '@/pages/common/documents/types';
import { AllowedResolutionStatus } from '@/constants';

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
  
  // Si el statusId es all o no existe, entonces se agregan los estados permitidos
  const clearParams = clearAllProps(params);
  const query = new URLSearchParams(clearParams);
  if (!clearParams.statusId) {
    query.append('statusId', AllowedResolutionStatus.CLOSED.toString());
    query.append('statusId', AllowedResolutionStatus.PRE_RESOLVED.toString());
  }

  return getFetch<Paginated<Resolution>>(
    `resolutions?${query.toString()}`,
    { remap },
    {
      responseError: 'error.getAllResolutionsFetch',
      defaultError: 'error.getAllResolutionsParse',
    }
  );
};

export default client;
