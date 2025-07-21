import {
  Dialog,
  DialogContent,
  Box,
  Card,
  Divider,
  CardContent,
} from '@mui/material';
import ModalActions from '../../molecules/modal-actions';
import Table from '../table';
import { initialStateI18N, ModalMassUploadProps } from './index.types';
import { DisplayData, IconList } from '@/components';
import ModalHeader from '@/components/molecules/modal-header';

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
          <Box display="flex" alignItems="center" gap={1}>
            <IconList name="box" />
            Documento Número 1561651565
          </Box>
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
              <Table
                columns={[
                  { id: 'number', label: 'Número' },
                  { id: 'inventory', label: 'Inventario' },
                  { id: 'amount', label: 'Cantidad' },
                  { id: 'weight', label: 'Peso Neto (gr)' },
                ]}
                rows={[
                  { inventory: 'INV001', number: 4, amount: 3, weight: 60 },
                  { inventory: 'INV002', number: 6, amount: 7, weight: 90 },
                  { inventory: 'INV003', number: 2, amount: 2, weight: 40 },
                ]}
                size="small"
              />
            </Box>
            <Box flex={1}>
              <Table
                columns={[
                  { id: 'inventory', label: 'Inventario' },
                  { id: 'number', label: 'Cantidad' },
                  { id: 'weight', label: 'Peso Neto (gr)' },
                ]}
                rows={[
                  { inventory: 'INV001', number: 4, weight: 60 },
                  { inventory: 'INV002', number: 6, weight: 90 },
                  { inventory: 'INV003', number: 2, weight: 40 },
                  { inventory: 'INV004', number: 5, weight: 75 },
                  { inventory: 'INV005', number: 8, weight: 110 },
                  { inventory: 'INV006', number: 3, weight: 55 },
                  { inventory: 'INV007', number: 7, weight: 95 },
                  { inventory: 'INV008', number: 9, weight: 130 },
                  { inventory: 'INV009', number: 1, weight: 25 },
                  { inventory: 'INV010', number: 4, weight: 70 },
                ]}
                size="small"
              />
            </Box>
          </Box>
        </DialogContent>
        <ModalActions i18n={lang} onClose={onClose} loading={false} />
      </form>
    </Dialog>
  );
};

export default ModalMassUpload;
