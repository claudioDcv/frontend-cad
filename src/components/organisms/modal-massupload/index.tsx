import { useState } from 'react';
import { Dialog, DialogContent, Box, Card, Divider } from '@mui/material';
import { DisplayData, EditableTable, IconList } from '@/components';
import { initialStateI18N, ModalMassUploadProps } from './index.types';
import ModalHeader from '@/components/molecules/modal-header';
import styles from './index.module.css';
import ButtonResolution from './components/button-resolution';

const ModalMassUpload: React.FC<ModalMassUploadProps> = ({
  open,
  onClose,
  i18n,
}) => {
  const lang = i18n ? { ...initialStateI18N, ...i18n } : initialStateI18N;
  const expectedTotal = { quantity: 100, weight: 1000 };
  const [currentTotal, setCurrentTotal] = useState({ quantity: 0, weight: 0 });

  const handleTotalsChange = (totals: { quantity: number; weight: number }) => {
    setCurrentTotal(totals);
  };

  const handleClose = () => {
    onClose();
  };

  const handleSuccess = () => {};

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth>
      <Card
        variant="outlined"
        sx={{ backgroundColor: '#f5f5f5', borderRadius: 0 }}
      >
        <ModalHeader onClose={onClose}>
          <IconList name="box" />
          Documento Número 1561651565
        </ModalHeader>
      </Card>

      <form onSubmit={handleSuccess}>
        <DialogContent>
          <Box display="flex" gap={2}>
            <Box className={styles.leftPanel}>
              <Box>
                <DisplayData label="Peso total" value="500 grs" />
                <DisplayData label="Compra venta" value="$234.000" />
                <DisplayData label="Promedio Compra" value="$12.550" />
              </Box>
              <Divider />
              <Box>
                <DisplayData label="Responsable" value="Alejandro Cisternas" />
                <DisplayData label="Vencimiento" value="12/05/2024" />
              </Box>
              <Divider />
              <Box>
                <DisplayData label="Cliente" value="Nestor Cantillana Perez" />
                <DisplayData label="RUT" value="10.548.548-5" />
              </Box>
            </Box>

            <Box flex={2}>
              <EditableTable
                total={expectedTotal}
                onTotalsChange={handleTotalsChange}
              />
            </Box>
          </Box>
        </DialogContent>
        <ButtonResolution
          onClose={handleClose}
          loading={false}
          onSuccess={handleSuccess}
          expected={expectedTotal}
          actual={currentTotal}
        />
      </form>
    </Dialog>
  );
};

export default ModalMassUpload;
