import { Box, Card, Dialog, DialogContent, Divider } from '@mui/material';
import { formatCurrency, formatNumberWithGr } from '../../../utils';
import { MaterialType } from '../../molecules/material-type';
import Table from '../../organisms/table';
import { initialStateI18n, ModalContractDetailProps } from './index.type';
import { columns } from './index.utils';
import ModalHeader from '../../molecules/modal-header';
import { DisplayData } from '../..';
import { Jewel } from '@/entities/Jewel.entity';
import ContractNote from '@/components/atoms/contract-note';

const ModalContractDetail: React.FC<ModalContractDetailProps> = ({
  onClose,
  onSuccess,
  material,
  jewels = [],
  contract,
  i18n,
}) => {
  const lang = i18n ? { ...initialStateI18n, ...i18n } : initialStateI18n;

  return (
    <Dialog open={!!contract} onClose={onClose} maxWidth="md" fullWidth>
      <ModalHeader onClose={onClose}>
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
                  value={formatNumberWithGr(contract.totalWeight ?? 0)}
                />
                <DisplayData
                  label={lang.totalContractValue}
                  value={formatCurrency(contract.totalContractValue ?? 0)}
                />
                <DisplayData
                  label={lang.averagePurchaseValue}
                  value={formatCurrency(contract.averagePurchaseValue ?? 0)}
                />
              </Box>

              <Box>
                <DisplayData
                  label={lang.responsible}
                  value={contract.responsibleName}
                />
                <DisplayData
                  label={lang.expiration}
                  value={contract.endDate}
                />
              </Box>

              <Box>
                <DisplayData
                  label={lang.client}
                  value={contract.clientName}
                />
                <DisplayData
                  label={lang.clientRut}
                  value={contract.clientRut}
                />
              </Box>
            </Box>
          </Card>
        )}
        <Divider sx={{ mb: 2 }} />
        <Table<Jewel> columns={columns} rows={jewels} size="small" />
      </DialogContent>
      <ContractNote
        metadata={contract?.cadMetadata}
        onClose={onClose}
        onSuccess={onSuccess}
      />
    </Dialog>
  );
};

export default ModalContractDetail;
