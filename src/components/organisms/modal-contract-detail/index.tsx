import { useEffect } from 'react';
import { Dialog, DialogContent, Divider } from '@mui/material';
import useGetContractJewels from '@/clients/get-contract-jewels';
import usePatchReviewedContract from '@/clients/patch-reviewed-contract';
import { FetchStatus } from '@/constants';
import { Contract, ContractMetadata } from '@/entities/Contract.entity';
import { Jewel } from '@/entities/Jewel.entity';
import { Material } from '@/components/molecules/material-type/types';
import ContractNote from '@/components/organisms/contract-note';
import { MaterialType } from '../../molecules/material-type';
import ModalHeader from '../../molecules/modal-header';
import Table from '../../organisms/table';
import ContractSummaryCard from '../contract-summary-card';
import { columns } from './index.utils';
import tsStyles from './index.styles';

interface I18N {
  label: string;
  checkboxLabel: string;
  success: string;
  cancel: string;
}

const initialStateI18n: I18N = {
  label: 'Label',
  checkboxLabel: 'Check Label',
  success: 'Success',
  cancel: 'Cancel',
};

interface ModalContractDetailProps {
  onClose: () => void;
  onSuccess: (contract: Contract) => void;
  material: Material;
  contract?: Contract | null;
  i18n?: Partial<I18N>;
  editable?: boolean;
}

const ModalContractDetail: React.FC<ModalContractDetailProps> = ({
  onClose,
  onSuccess,
  material,
  contract,
  i18n,
  editable,
}) => {
  const lang = i18n ? { ...initialStateI18n, ...i18n } : initialStateI18n;

  const getContractJewels = useGetContractJewels();
  const patchReviewedContract = usePatchReviewedContract();

  const metadata: ContractMetadata = {
    note: null,
    reviewed: false,
    reviewedBy: null,
    reviewedAt: null,
    confirmedBy: null,
    confirmedAt: null,
    createdAt: '',
    updatedAt: null,
    ...(contract?.metadata ?? {}),
    contractId: contract?.contractId ?? 0,
  };

  const handleClose = () => {
    getContractJewels.reset();
    onClose();
  };

  const handleSuccess = async (data: ContractMetadata) => {
    if (!contract) {
      return;
    }
    const result = await patchReviewedContract.call({
      ...contract,
      metadata: {
        ...metadata,
        note: data.note,
        reviewed: data.reviewed,
        contractId: contract?.contractId ?? 0,
      },
    });
    getContractJewels.reset();

    if (result) {
      onSuccess(result);
    }
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
          <>
            <ContractSummaryCard contract={contract} />
            <Divider sx={tsStyles.dividier} />
            <Table<Jewel>
              columns={columns}
              rows={getContractJewels.data}
              size="small"
            />
          </>
        )}
      </DialogContent>
      <ContractNote
        metadata={metadata}
        onClose={handleClose}
        onSuccess={handleSuccess}
        loading={patchReviewedContract.status === FetchStatus.LOADING}
        editable={editable}
      />
    </Dialog>
  );
};

export default ModalContractDetail;
