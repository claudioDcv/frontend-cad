import { useState } from 'react';
import { Dialog, DialogContent, Box, Card, Divider } from '@mui/material';
import ModalActions from '../../molecules/modal-actions';
import { DisplayData, EditableTable, IconList } from '@/components';
import { initialStateI18N, ModalMassUploadProps } from './index.types';
import ModalHeader from '@/components/molecules/modal-header';
import styles from './index.module.css'; // Asegúrate que esté apuntando bien

const ModalMassUpload: React.FC<ModalMassUploadProps> = ({
  open,
  onClose,
  i18n,
}) => {
  const lang = i18n ? { ...initialStateI18N, ...i18n } : initialStateI18N;
  const [isValid, setIsValid] = useState(false);

  const handleSuccess = () => {};

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
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
                total={{ quantity: 100, weight: 1000 }}
                onValid={setIsValid}
              />
            </Box>
          </Box>
        </DialogContent>

        <ModalActions
          i18n={lang}
          onClose={onClose}
          loading={false}
          disabled={!isValid}
        />
      </form>
    </Dialog>
  );
};

export default ModalMassUpload;
