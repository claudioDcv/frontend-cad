import { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Dialog,
  DialogContent,
  Divider,
  LinearProgress,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import useServices from './hooks/useServices';
import { Inventory } from '@/entities/Inventory.entity';
import { Resolution } from '@/entities/Resolution.entity';
import { FetchStatus } from '@/constants';
import { formatCurrency, formatToDDMMYYYY, verboseGram } from '@/utils';
import { DisplayData, InventoryEditableTable, IconList } from '@/components';
import ModalHeader from '@/components/molecules/modal-header';
import ActionsResolution from './components/actions-resolution';
import styles from './index.module.css';
import tsStyles from './index.styles';

interface ModalMassUploadProps {
  resolution: Resolution;
  open: boolean;
  onClose: () => void;
  onSuccess: (data: Inventory[]) => void;
  onSendOutput: (data: Inventory[]) => void;
  loading: boolean;
}

const ModalMassUpload: React.FC<ModalMassUploadProps> = ({
  open,
  resolution,
  onClose,
  onSuccess,
  onSendOutput,
  loading,
}) => {
  const { t } = useTranslation();
  const [data, setData] = useState<Inventory[]>([]);
  const { resolutionId } = resolution ?? {};

  const services = useServices(resolutionId);

  const [, setCurrentInventory] = useState(
    services.getResolutionInventory.data || []
  );

  const expectedTotal = {
    quantity: services.getResolution.data.totalJewels ?? 0,
    weight: services.getResolution.data.totalWeight ?? 0,
  };
  const [currentTotal, setCurrentTotal] = useState({ quantity: 0, weight: 0 });

  useEffect(() => {
    const data = services.getResolutionInventory.data;
    if (!data || !Array.isArray(data)) return;

    const total = data.reduce(
      (acc, ri) => ({
        quantity: acc.quantity + ri.quantity,
        weight: acc.weight + ri.weight,
      }),
      { quantity: 0, weight: 0 }
    );

    setCurrentTotal(total);
  }, [services.getResolutionInventory.data]);

  useEffect(() => {
    if (services.getResolutionInventory.data) {
      setCurrentInventory(services.getResolutionInventory.data);
    }
  }, [services.getResolutionInventory.data]);

  const handleTotalsChange = (totals: { quantity: number; weight: number }) => {
    setCurrentTotal(totals);
  };

  const handleClose = () => onClose();
  const handleSuccess = () => {
    onSuccess(data);
  };

  const handleSendOutput = () => {
    onSendOutput(data);
  };

  const inventoriesSuccess =
    services.getResolutionInventory.status === FetchStatus.SUCCESS;
  const inventories = services.getResolutionInventory.data || [];
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth>
      <AppBar sx={tsStyles.appBar} position="static">
        <ModalHeader onClose={onClose}>
          <Box sx={tsStyles.headerBox}>
            <IconList name="box" />
            <Typography variant="h6">
              {`${t('modalMassUpload.documentNumber')} ${resolutionId}`}
            </Typography>
          </Box>
        </ModalHeader>
      </AppBar>

      <DialogContent sx={tsStyles.dialogContent}>
        <Box sx={tsStyles.mainContainer}>
          <Box className={styles.leftPanel} sx={tsStyles.leftPanel}>
            <Box>
              <DisplayData
                label={t('modalMassUpload.totalWeight')}
                value={verboseGram(services.getResolution.data.totalWeight)}
              />
              <DisplayData
                label={t('modalMassUpload.salePrice')}
                value={formatCurrency(
                  services.getResolution.data.totalPurchase
                )}
              />
              <DisplayData
                label={t('modalMassUpload.averagePurchase')}
                value={formatCurrency(
                  services.getResolution.data.averagePurchase
                )}
              />
            </Box>
            <Divider />
            <Box>
              <DisplayData
                label={t('modalMassUpload.responsible')}
                value={services.getResolution.data.responsible}
              />
              <DisplayData
                label={t('modalMassUpload.expirationDate')}
                value={`${formatToDDMMYYYY(
                  services.getResolution.data.closeDate
                )}`}
              />
            </Box>
            <Divider />
            <Box>
              <DisplayData
                label={t('modalMassUpload.client')}
                value="[Dato no existe en resolución]"
              />
              <DisplayData
                label={t('modalMassUpload.rut')}
                value="[Dato no existe en resolución]"
              />
            </Box>
          </Box>
          <Box sx={tsStyles.rightPanel}>
            {inventoriesSuccess ? (
              <InventoryEditableTable
                data={data}
                setData={setData}
                total={expectedTotal}
                resolutionInventory={inventories}
                onChange={handleTotalsChange}
              />
            ) : (
              <LinearProgress />
            )}
          </Box>
        </Box>
      </DialogContent>
      <ActionsResolution
        onSendOutput={handleSendOutput}
        onClose={handleClose}
        onSuccess={handleSuccess}
        loading={loading}
        expected={expectedTotal}
        current={currentTotal}
      />
    </Dialog>
  );
};

export default ModalMassUpload;
