import { useEffect, useState } from 'react';
import { Dialog, DialogContent, Box, Card, Divider } from '@mui/material';
import { DisplayData, EditableTable, IconList } from '@/components';
import { ModalMassUploadProps, SuccessData } from './index.types';
import ModalHeader from '@/components/molecules/modal-header';
import styles from './index.module.css';
import ActionsResolution from './components/actions-resolution';
import { useTranslation } from 'react-i18next';
import useServices from './hooks/useServices';

const ModalMassUpload: React.FC<ModalMassUploadProps> = ({
  open,
  resolution,
  onClose,
  onSuccess,
}) => {
  const { t } = useTranslation();

  const { resolutionId } = resolution ?? {};

  const services = useServices(String(resolution.resolutionId));

  // TODO:
  //  Resolucionar , debe de aparecer cuando al menos haya un guardado, cuando se resolucione
  // el boton guardar se dshabilite

  // consumir el servicio para llenar los valores iniciales
  // falta servicio que retorna el total esperado a asignar

  const expectedTotal = { quantity: 100, weight: 1000 };
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

  const handleTotalsChange = (totals: { quantity: number; weight: number }) => {
    setCurrentTotal(totals);
  };

  const handleClose = () => onClose();

  const handleSuccess = () => {
    const data: SuccessData = {
      units: currentTotal.quantity,
      grams: currentTotal.weight,
    };

    onSuccess(data);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth>
      <Card
        variant="outlined"
        sx={{ backgroundColor: '#f5f5f5', borderRadius: 0 }}
      >
        <ModalHeader onClose={onClose}>
          <IconList name="box" />
          {`${t('modalMassUpload.documentNumber')} ${resolutionId}`}
        </ModalHeader>
      </Card>

      <form onSubmit={handleSuccess}>
        <DialogContent>
          <Box display="flex" gap={2}>
            <Box className={styles.leftPanel}>
              <Box>
                <DisplayData
                  label={t('modalMassUpload.totalWeight')}
                  value="500 grs"
                />
                <DisplayData
                  label={t('modalMassUpload.salePrice')}
                  value="$234.000"
                />
                <DisplayData
                  label={t('modalMassUpload.averagePurchase')}
                  value="$12.550"
                />
              </Box>
              <Divider />
              <Box>
                <DisplayData
                  label={t('modalMassUpload.responsible')}
                  value="Alejandro Cisternas"
                />
                <DisplayData
                  label={t('modalMassUpload.expirationDate')}
                  value="12/05/2024"
                />
              </Box>
              <Divider />
              <Box>
                <DisplayData
                  label={t('modalMassUpload.client')}
                  value="Nestor Cantillana Perez"
                />
                <DisplayData
                  label={t('modalMassUpload.rut')}
                  value="10.548.548-5"
                />
              </Box>
            </Box>
            <Box flex={2}>
              <Box sx={{ height: 'calc(100vh - 20rem)' }}>
                <EditableTable
                  total={expectedTotal}
                  resolutionInventory={services.getResolutionInventory.data}
                  onChange={handleTotalsChange}
                />
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <ActionsResolution
          onClose={handleClose}
          loading={false}
          onSuccess={handleSuccess}
          expected={expectedTotal}
          current={currentTotal}
        />
      </form>
    </Dialog>
  );
};

export default ModalMassUpload;
