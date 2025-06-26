import { useEffect } from 'react';

import { FetchStatus } from '../../../utils';

import useGetAllContractDetails from '../../../clients/get-detail-contract';

const useContractDetail = (contractId: number | null) => {
  const getDetailContract = useGetAllContractDetails();

  useEffect(() => {
    if (!contractId) return;

    if (getDetailContract.status === FetchStatus.IDLE) {
        getDetailContract.call({ contractId });
      }
    }, [contractId, getDetailContract]);

  return { getDetailContract };
};

export default useContractDetail;
