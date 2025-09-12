import { useRef, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
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
  TripleToggleSwitch,
} from '@/components';
import { emptyOption, SEARCH_DELAY } from '@/constants';
import {
  debounce,
  formatCurrency,
  formatToDDMMYYYY,
  isOnlyNumbersOrEmpty,
} from '@/utils';
import { Option } from '@/entities/Option.entity';
import useServices from './hooks/useServices';
import { useParams } from 'wouter';
import { useTranslation } from 'react-i18next';
import tsStyles from './index.styles';

const mockPackingList = {
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

const mockStatusOptions = [
  { label: 'Todos', value: '' },
  { label: 'Pendiente', value: '1' },
  { label: 'Revisado', value: '2' },
];

const PackingListDetail = () => {
  const { id: packingListId } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const { control, setValue } = useForm({
    defaultValues: {
      itemCode: '',
      status: emptyOption,
    },
  });

  const services = useServices(packingListId);

  const [statusFilter, setStatusFilter] = useState(emptyOption.value);
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyNotReviewed, setShowOnlyNotReviewed] = useState<0 | 1 | 2>(0);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [successConfirmNotification, setSuccessConfirmNotification] =
    useState(false);

  const debouncedSearchRef = useRef(
    debounce((value: string) => setSearchTerm(value), SEARCH_DELAY)
  );

  const getFilteredContracts = () => {
    const model = services.getPackingListContracts.data;

    if (!model) {
      return [];
    }

    // Aplicar filtro de búsqueda usando `itemCode`
    const filtered = model.filter((contract) =>
      contract.itemCode?.toString().includes(searchTerm)
    );

    // Aplicar filtro de estado
    const filteredByStatus = filtered.filter(
      (contract) =>
        statusFilter === emptyOption.value ||
        contract.statusId === Number(statusFilter)
    );

    // La lógica de `metadata` sigue comentada como pediste
    return filteredByStatus;
  };

  const isAllContractReviewed =
    services.getPackingListContracts.data?.length > 0 &&
    // services.getPackingListContracts.data.every((c) => c.metadata?.reviewed);
    true; // Temporalmente en `true`

  const handleChangeStatus =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (field: { onChange: (value: any) => void }) => (option: Option) => {
      field.onChange(option);
      setStatusFilter(option.value);
    };

  const handleDocNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const rawValue = event.target.value;

    if (isOnlyNumbersOrEmpty(rawValue)) {
      setValue('itemCode', rawValue);
      debouncedSearchRef.current(rawValue);
    }
  };

  return (
    <div>
      <Card variant="outlined" sx={tsStyles.card}>
        <CardHeader
          title={`Packing List: ${mockPackingList.resolutionNumber}`}
          action={
            <ButtonGroup>
              <Button
                variant="contained"
                disabled={!isAllContractReviewed}
                onClick={() => setOpenConfirm(true)}
              >
                Enviar
              </Button>
            </ButtonGroup>
          }
        />
        <Divider />
        <CardContent>
          <Box sx={tsStyles.cardContentGrid}>
            <DisplayData
              label="Guía Despacho"
              value={mockPackingList.dispatchGuide}
            />
            <DisplayData
              label="N° Contratos"
              value={mockPackingList.contractCount}
            />
            <DisplayData label="Tipo" value={mockPackingList.categoryName} />
            <DisplayData label="Bolsa" value={mockPackingList.securityBag} />
            <DisplayData
              label="Sucursal"
              value={mockPackingList.locationName}
            />
            <DisplayData
              label="Dirección"
              value={mockPackingList.locationAddress}
            />
            <DisplayData
              label="Inversión"
              value={mockPackingList.investmentName}
            />
            <DisplayData label="RUT" value={mockPackingList.investmentRut} />
            <DisplayData
              label="Fecha Cierre"
              value={formatToDDMMYYYY(mockPackingList.closeDate)}
            />
          </Box>
        </CardContent>
      </Card>

      <form>
        <Box sx={tsStyles.formBox}>
          <Controller
            name="itemCode"
            control={control}
            render={({ field }) => (
              <Input
                // Etiqueta del buscador, ahora indica que se busca por Código de Ítem
                label="Código Ítem"
                value={field.value}
                onChange={handleDocNumberChange}
                sx={tsStyles.input}
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

          <TripleToggleSwitch
            value={showOnlyNotReviewed}
            options={[
              { value: 0, label: t('common.all') },
              { value: 1, label: t('common.notReviewed') },
              { value: 2, label: t('common.reviewedPlural') },
            ]}
            onChange={(value) => setShowOnlyNotReviewed(value as 0 | 1 | 2)}
          />
        </Box>

        <Table
          columns={[
            { id: 'itemCode', label: 'Código Ítem' },
            { id: 'shortDescription', label: 'Descripción' },
            { id: 'itemQuantity', label: 'Cantidad' },
            { id: 'itemTotalWeight', label: 'Peso Total' },
            {
              id: 'itemUnitCost',
              label: 'Costo Unitario',
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
          rows={getFilteredContracts()}
          messageVoidData={t('common.noData')}
          size="small"
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
