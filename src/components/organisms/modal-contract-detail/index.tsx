import { Box, Card, Dialog, DialogContent, Divider } from '@mui/material';
import { formatCurrency, formatNumberWithGr } from '../../../utils';
import { MaterialType } from '../../molecules/material-type';
import Table from '../../organisms/table';
import { initialStateI18n, ModalContractDetailProps } from './index.type';
import { columns } from './index.utils';
import ModalHeader from '../../molecules/modal-header';
import { DisplayData } from '../..';
import { Jewel } from '@/entities/Jewel.entity';
import ContractNote from '@/components/organisms/contract-note';
import useGetContractJewels from '@/clients/get-contract-jewels';
import { useEffect } from 'react';
import { FetchStatus } from '@/constants';
import { ContractMetadata } from '@/entities/Contract.entity';

const ModalContractDetail: React.FC<ModalContractDetailProps> = ({
  onClose,
  onSuccess,
  material,
  contract,
  i18n,
}) => {
  const lang = i18n ? { ...initialStateI18n, ...i18n } : initialStateI18n;

  const getContractJewels = useGetContractJewels();

  const metadata: ContractMetadata = {
    note: null,
    reviewed: false,
    reviewedBy: null,
    reviewedAt: null,
    confirmedBy: null,
    confirmedAt: null,
    createdAt: '',
    updatedAt: null,
    ...(contract?.cadMetadata ?? {}),
    contractId: contract?.contractId ?? 0,
  };

  const handleClose = () => {
    getContractJewels.reset();
    onClose();
  };

  const handleSuccess = (data: ContractMetadata) => {
    getContractJewels.reset();
    onSuccess(data);
  };

  useEffect(() => {
    if (contract?.contractId && getContractJewels.status === FetchStatus.IDLE) {
      getContractJewels.call(contract.contractId);
    }
  }, [contract, getContractJewels]);

  return (
    <Dialog open={!!contract} onClose={handleClose} maxWidth="md" fullWidth>
      <ModalHeader onClose={handleClose}>
        <MaterialType size="medium" material={material} label={lang.label} />
      </ModalHeader>
      <DialogContent>
        {contract && (
          <Card>
            <Box
              p={2}
              display="grid"
              gridTemplateColumns="repeat(3, 1fr)"
              gap={2}
              mb={2}
            >
              <Box>
                <DisplayData
                  label={lang.weight}
                  value={formatNumberWithGr(contract.totalWeight)}
                />
                <DisplayData
                  label={lang.totalContractValue}
                  value={formatCurrency(contract.totalContractValue)}
                />
                <DisplayData
                  label={lang.averagePurchaseValue}
                  value={formatCurrency(contract.averagePurchaseValue)}
                />
              </Box>

              <Box>
                <DisplayData
                  label={lang.responsible}
                  value={contract.responsibleName}
                />
                <DisplayData label={lang.expiration} value={contract.endDate} />
              </Box>

              <Box>
                <DisplayData label={lang.client} value={contract.clientName} />
                <DisplayData
                  label={lang.clientRut}
                  value={contract.clientRut}
                />
              </Box>
            </Box>
          </Card>
        )}
        <Divider sx={{ mb: 2 }} />
        <Table<Jewel>
          columns={columns}
          rows={getContractJewels.data}
          size="small"
        />
      </DialogContent>
      <ContractNote
        metadata={metadata}
        onClose={handleClose}
        onSuccess={handleSuccess}
      />
    </Dialog>
  );
};

export default ModalContractDetail;
