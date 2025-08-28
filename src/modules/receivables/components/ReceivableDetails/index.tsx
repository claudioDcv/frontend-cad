import { Box, LinearProgress, Typography } from '@mui/material';
import { useEffect, useRef } from 'react';
import useGetContract from '@/clients/get-contract';
import { FetchStatus } from '@/constants';
import { Receivable } from '@/entities/Receivable.entity';
import { ContractSummaryCard, ReceivableSummaryCard } from '@/components';
import { useTranslation } from 'react-i18next';

interface ReceivableDetailsProps {
  receivable: Receivable;
}

const ReceivableDetails = ({ receivable }: ReceivableDetailsProps) => {
  const { t } = useTranslation();
  const { data, call, status } = useGetContract();

  const lastContractIdRef = useRef<string | number | null>(null);

  useEffect(() => {
    if (
      receivable.contractId &&
      lastContractIdRef.current !== receivable.contractId
    ) {
      call(receivable.contractId);
      lastContractIdRef.current = receivable.contractId;
    }
  }, [receivable.contractId, call]);

  if (status === FetchStatus.LOADING || data === null) {
    return <LinearProgress />;
  }

  return (
    <Box gap={2} display="grid" gridTemplateColumns="1fr">
      <div>
        <Typography mt={2}>{t('accountsReceivable.contractTitle')}</Typography>
        <ContractSummaryCard contract={data} />
      </div>
      <div>
        <Typography>{t('accountsReceivable.receivableDetails')}</Typography>
        <ReceivableSummaryCard
          receivable={receivable}
          contractAveragePurchaseValue={data.averagePurchaseValue}
        />
      </div>
    </Box>
  );
};

export default ReceivableDetails;
