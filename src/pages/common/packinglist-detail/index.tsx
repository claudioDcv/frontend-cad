import { useRef, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  Switch,
  ButtonGroup,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import {
  Input,
  DropdownController,
  Notification,
  Table,
  ModalConfirm,
  DisplayData,
} from '@/components';
import { emptyOption, SEARCH_DELAY } from '@/constants';
import {
  debounce,
  formatCurrency,
  formatToDDMMYYYY,
  isOnlyNumbersOrEmpty,
} from '@/utils';
import { Option } from '@/entities/Option.entity';

const mockResolution = {
  resolutionNumber: 'PK-001',
  dispatchGuide: 'G-123456',
  contractCount: 3,
  categoryName: 'Packing',
  securityBag: 'BG-98765',
  locationName: 'Sucursal Central',
  locationAddress: 'Calle Falsa 123',
  investmentName: 'Empresa XYZ',
  investmentRut: '12.345.678-9',
  closeDate: '2024-07-01',
};

const mockContracts = [
  {
    contractNumber: '0001',
    securityBagCode: 'BG01',
    jewelQuantity: 10,
    totalContractValue: 500000,
    statusId: 1,
    cadMetadata: { reviewed: false },
  },
  {
    contractNumber: '0002',
    securityBagCode: 'BG02',
    jewelQuantity: 5,
    totalContractValue: 250000,
    statusId: 2,
    cadMetadata: { reviewed: true },
  },
];

const mockStatusOptions = [
  { label: 'Todos', value: '' },
  { label: 'Pendiente', value: '1' },
  { label: 'Revisado', value: '2' },
];

const PackingListDetail = () => {
  const { control, setValue } = useForm({
    defaultValues: {
      contractNumber: '',
      status: emptyOption,
    },
  });

  const [statusFilter, setStatusFilter] = useState(emptyOption.value);
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyNotReviewed, setShowOnlyNotReviewed] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [successConfirmNotification, setSuccessConfirmNotification] =
    useState(false);

  const debouncedSearchRef = useRef(
    debounce((value: string) => setSearchTerm(value), SEARCH_DELAY)
  );

  const filteredContracts = mockContracts
    .filter((c) => c.contractNumber.includes(searchTerm))
    .filter((c) => statusFilter === '' || String(c.statusId) === statusFilter)
    .filter((c) => (showOnlyNotReviewed ? !c.cadMetadata.reviewed : true));

  const isAllReviewed = mockContracts.every((c) => c.cadMetadata.reviewed);

  const handleChangeStatus =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (field: { onChange: (value: any) => void }) => (option: Option) => {
      field.onChange(option);
      setStatusFilter(option.value);
    };

  return (
    <div>
      <Card variant="outlined" sx={{ backgroundColor: '#f5f5f5' }}>
        <CardHeader
          title={`Packing List: ${mockResolution.resolutionNumber}`}
          action={
            <ButtonGroup>
              <Button
                variant="contained"
                disabled={!isAllReviewed}
                onClick={() => setOpenConfirm(true)}
              >
                Enviar
              </Button>
            </ButtonGroup>
          }
        />
        <Divider />
        <CardContent>
          <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
            <DisplayData
              label="Guía Despacho"
              value={mockResolution.dispatchGuide}
            />
            <DisplayData
              label="N° Contratos"
              value={mockResolution.contractCount}
            />
            <DisplayData label="Tipo" value={mockResolution.categoryName} />
            <DisplayData label="Bolsa" value={mockResolution.securityBag} />
            <DisplayData label="Sucursal" value={mockResolution.locationName} />
            <DisplayData
              label="Dirección"
              value={mockResolution.locationAddress}
            />
            <DisplayData
              label="Inversión"
              value={mockResolution.investmentName}
            />
            <DisplayData label="RUT" value={mockResolution.investmentRut} />
            <DisplayData
              label="Fecha Cierre"
              value={formatToDDMMYYYY(mockResolution.closeDate)}
            />
          </Box>
        </CardContent>
      </Card>

      <form>
        <Box mt={2} mb={2} display="flex" gap={2} alignItems="center">
          <Controller
            name="contractNumber"
            control={control}
            render={({ field }) => (
              <Input
                label="N° Documento"
                value={field.value}
                onChange={(e) => {
                  const val = e.target.value;
                  if (isOnlyNumbersOrEmpty(val)) {
                    setValue('contractNumber', val);
                    debouncedSearchRef.current(val);
                  }
                }}
              />
            )}
          />

          <DropdownController
            label="Estado"
            name="status"
            control={control}
            options={mockStatusOptions}
            onChange={handleChangeStatus}
            disabled={false}
          />

          <FormControlLabel
            control={
              <Switch
                checked={showOnlyNotReviewed}
                onChange={(e) => setShowOnlyNotReviewed(e.target.checked)}
              />
            }
            label="Solo no revisados"
          />
        </Box>

        <Table
          rows={filteredContracts}
          columns={[
            { id: 'contractNumber', label: 'N° Contrato' },
            { id: 'securityBagCode', label: 'Código Bolsa' },
            { id: 'jewelQuantity', label: 'Joyas' },
            {
              id: 'totalContractValue',
              label: 'Valor Total',
              field: (f) => formatCurrency(f as number),
            },
            {
              id: 'statusId',
              label: 'Estado',
              field: (f) =>
                mockStatusOptions.find((opt) => opt.value === String(f))
                  ?.label || '-',
            },
          ]}
          messageVoidData="No hay contratos"
        />
      </form>

      <Notification
        open={successConfirmNotification}
        onClose={() => setSuccessConfirmNotification(false)}
        severity="success"
        i18n={{
          title: 'Éxito',
          text: 'Packing enviado correctamente.',
        }}
      />

      <ModalConfirm
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onSuccess={() => {
          console.log('Resolución enviada!');
          setOpenConfirm(false);
          setSuccessConfirmNotification(true);
        }}
        i18n={{
          title: '¿Enviar Packing?',
          text: 'Estás seguro de que quieres enviar esta resolución?',
          success: 'Enviar',
        }}
      />
    </div>
  );
};

export default PackingListDetail;
