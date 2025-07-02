import { Box, Card, Dialog, DialogContent, Divider } from '@mui/material';
import { formatCurrency, formatNumberWithGr } from '../../../utils';
import { MaterialType } from '../../molecules/material-type';
import Table from '../../organisms/table';
import { initialStateI18n, ModalContractDetailProps } from './index.type';
import { columns } from './index.utils';
import ModalHeader from '../../molecules/modal-header';
import ModalActions from '../../molecules/modal-actions';
import { DisplayData } from '../..';
import { Jewel } from '@/entities/Jewel.entity';

const ModalContractDetail: React.FC<ModalContractDetailProps> = ({
  open,
  onClose,
  onSuccess,
  material,
  data,
  checked,
  contractData,
  i18n,
}) => {
  const lang = i18n ? { ...initialStateI18n, ...i18n } : initialStateI18n;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <ModalHeader onClose={onClose}>
        <MaterialType size="medium" material={material} label={lang.label} />
      </ModalHeader>
      <DialogContent>
        {contractData && (
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
                  value={formatNumberWithGr(contractData.weight ?? 0)}
                />
                <DisplayData
                  label={lang.totalContractValue}
                  value={formatCurrency(contractData.totalContractValue ?? 0)}
                />
                <DisplayData
                  label={lang.averagePurchaseValue}
                  value={formatCurrency(contractData.averagePurchaseValue ?? 0)}
                />
              </Box>

              <Box>
                <DisplayData
                  label={lang.responsible}
                  value={contractData.responsibleName}
                />
                <DisplayData
                  label={lang.expiration}
                  value={contractData.endDate}
                />
              </Box>

              <Box>
                <DisplayData
                  label={lang.client}
                  value={contractData.clientName}
                />
                <DisplayData
                  label={lang.clientRut}
                  value={contractData.clientRut}
                />
              </Box>
            </Box>
          </Card>
        )}
        <Divider sx={{ mb: 2 }} />
        <Table<Jewel> columns={columns} rows={data.jewels} size="small" />
      </DialogContent>
      <ModalActions
        i18n={lang}
        onClose={onClose}
        onSuccess={onSuccess}
        showCheckbox
        checked={checked}
      />
    </Dialog>
  );
};

export default ModalContractDetail;
