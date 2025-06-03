import { useEffect } from 'react';
import { Box } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { STATUS_PACKING_LIST } from '../../../../utils';
import { Dropdown, Pagination, Table } from '../../../../components';
import { useGetAllPackingList, useGetAllStatus } from '../../../../clients';
import { PackingListFormModel } from '../../types';
import { defaultPackingListFormValues } from '../../index.config';

const PackingList = () => {
  const { control, watch } = useForm<PackingListFormModel>({
    defaultValues: defaultPackingListFormValues,
  });

  const { status } = watch();
  const { t } = useTranslation();

  const getAllStatus = useGetAllStatus();
  const getAllPackingList = useGetAllPackingList();

  useEffect(() => {
    getAllStatus.call({ tableId: STATUS_PACKING_LIST });
  }, [getAllStatus]);

  useEffect(() => {
    if (!status.value) return;

    getAllPackingList.call({ statusId: status.value, page: 1 });
  }, [status, getAllPackingList]);

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (!status?.value) return;

    getAllPackingList.call({ statusId: status.value, page: value });
  };

  return (
    <Box>
      <form action="">
        <Box
          mb={2}
          mt={2}
          flexWrap="nowrap"
          display="flex"
          alignItems="center"
          gap={2}
        >
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Dropdown
                {...field}
                options={getAllStatus.data}
                label={t('common.status')}
                disabled={!getAllStatus.data || getAllStatus.data.length === 0}
              />
            )}
          />
        </Box>
      </form>

      <Table
        columns={columnsPackinglist}
        rows={getAllPackingList.data?.packingList || []}
        messageVoidData={t('common.noData')}
      />

      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Pagination
          count={getAllPackingList.data?.meta?.count || 0}
          page={getAllPackingList.data?.meta?.page || 1}
          onChange={handleChangePage}
        />
      </Box>
    </Box>
  );
};

export default PackingList;

const columnsPackinglist = [
  { id: 'packinglistId', label: 'Paquete' },
  { id: 'barcode', label: 'Código de Barras' },
  { id: 'dispatchNumber', label: 'Guía de Despacho' },
  { id: 'investmentName', label: 'Nombre Inversión' },
  { id: 'originBranch', label: 'Sucursal Origen' },
  { id: 'destinyBranch', label: 'Sucursal Destino' },
  { id: 'creationDate', label: 'Fecha de Creación' },
  { id: 'totalQuantity', label: 'Cantidad Total' },
  { id: 'totalGrams', label: 'Gramos Totales' },
  { id: 'documentType', label: 'Tipo Documento' },
  { id: 'statusId', label: 'ID Estado' },
  { id: 'statusName', label: 'Estado' },
  { id: 'category', label: 'Categoría' },
];
