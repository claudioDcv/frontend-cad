import {
  Dialog,
  DialogContent,
  Box,
  Card,
  Divider,
  CardContent,
} from '@mui/material';
import ModalActions from '../../molecules/modal-actions';
import { initialStateI18N, ModalMassUploadProps } from './index.types';
import { DisplayData, IconList } from '@/components';
import ModalHeader from '@/components/molecules/modal-header';
import EditableTable from '../editable-table';

const ModalMassUpload: React.FC<ModalMassUploadProps> = ({
  open,
  onClose,
  i18n,
}) => {
  const lang = i18n ? { ...initialStateI18N, ...i18n } : initialStateI18N;

  const handleSuccess = () => {};

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
      <Card variant="outlined" sx={{ backgroundColor: '#f5f5f5' }}>
        <ModalHeader onClose={onClose}>
          <IconList name="box" />
          Documento Número 1561651565
        </ModalHeader>
        <Divider />
        <CardContent>
          <Box
            p={2}
            display="grid"
            gridTemplateColumns="repeat(3, 1fr)"
            gap={2}
          >
            <Box>
              <DisplayData label="Peso total" value="500 grs" />
              <DisplayData label="Compra venta" value="$234.000" />
              <DisplayData label="Promedio Compra" value="$12.550" />
            </Box>
            <Box>
              <DisplayData label="Responsable" value="Alejandro Cisternas" />
              <DisplayData label="Vencimiento" value="12/05/2024" />
            </Box>
            <Box>
              <DisplayData label="Cliente" value="Nestor Cantillana Perez" />
              <DisplayData label="RUT" value="10.548.548-5" />
            </Box>
          </Box>
        </CardContent>
      </Card>
      <form onSubmit={handleSuccess}>
        <DialogContent>
          <Box display="flex" gap={2}>
            <Box flex={2}>
              <EditableTable />
            </Box>
          </Box>
        </DialogContent>
        <ModalActions i18n={lang} onClose={onClose} loading={false} />
      </form>
    </Dialog>
  );
};

export default ModalMassUpload;
