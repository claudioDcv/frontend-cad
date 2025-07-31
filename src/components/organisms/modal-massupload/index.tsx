import { useEffect, useState } from 'react';
import { Dialog, DialogContent, Box, Card, Divider } from '@mui/material';
import { DisplayData, EditableTable, IconList } from '@/components';
import { ModalMassUploadProps } from './index.types';
import ModalHeader from '@/components/molecules/modal-header';
import styles from './index.module.css';
import ButtonResolution from './components/button-resolution';
import { useTranslation } from 'react-i18next';
import useServices from './hooks/useServices';

const ModalMassUpload: React.FC<ModalMassUploadProps> = ({
  open,
  onClose,
  documentId,
}) => {
  const { t } = useTranslation();

  const services = useServices(documentId);

  // TODO:
  //  Resolucionar , debe de aparecer cuando al menos haya un guardado, cuando se resolucione
  // el boton guardar se dshabilite

  // consumir el servicio para llenar los valores iniciales
  // falta servicio que retorna el total esperado a asignar

  const expectedTotal = { quantity: 100, weight: 1000 };
  const [currentTotal, setCurrentTotal] = useState({ quantity: 0, weight: 0 });

  useEffect(() => {
    if (!currentTotal.quantity && !currentTotal.weight) {
      const total = { quantity: 0, weight: 0 };
      services.getResolutionInventory.data.forEach((ri) => {
        total.quantity += ri.quantity;
        total.weight += ri.weight;
      });

      setCurrentTotal(total);
    }
  }, [currentTotal, services.getResolutionInventory]);

  const handleTotalsChange = (totals: { quantity: number; weight: number }) => {
    setCurrentTotal(totals);
  };

  const handleClose = () => onClose();

  const handleSuccess = () => {};

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth>
      <Card
        variant="outlined"
        sx={{ backgroundColor: '#f5f5f5', borderRadius: 0 }}
      >
        <ModalHeader onClose={onClose}>
          <IconList name="box" />
          {`${t('modalMassUpload.documentNumber')} ${documentId}`}
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
                  onTotalsChange={handleTotalsChange}
                />
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <ButtonResolution
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
