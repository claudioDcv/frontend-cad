import { useEffect, useRef, useState } from 'react';
import { Box, Pagination } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';
import { Dropdown, Table } from '../../../../components';
import { useGetAllPackingList, useGetAllStatus } from '../../../../clients';
import { PackingListFormModel } from '../../types';
import { defaultPackingListFormValues } from '../../utils';
import { STATUS_PACKING_LIST } from '../../../../utils';

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

const FIRST_PAGE = 1;

const PackingList = () => {
  const { control, watch } = useForm<PackingListFormModel>({
    defaultValues: defaultPackingListFormValues,
  });

  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(FIRST_PAGE);

  const status = watch('status');

  const getAllStatus = useGetAllStatus();
  const getAllPackingList = useGetAllPackingList();

  const isStatusDisabled = !getAllStatus.data || getAllStatus.data.length === 0;
  const packingListRows = getAllPackingList.data?.packingList || [];
  const paginationCount = getAllPackingList.data?.meta?.count || 0;

  const debouncedFetchPackingList = useRef(
    debounce((page: number, filters: PackingListFormModel) => {
      if (!filters.status?.value) return;

      getAllPackingList.call({
        statusId: filters.status.value,
        page,
      });
    }, 1000)
  );

  useEffect(() => {
    const timers = [
      setTimeout(() => {
        getAllStatus.call({ tableId: STATUS_PACKING_LIST });
      }, 400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [getAllStatus]);

  useEffect(() => {
    setCurrentPage(FIRST_PAGE);
    debouncedFetchPackingList.current(FIRST_PAGE, { status });
  }, [status]);

  useEffect(() => {
    const debouncedFetch = debouncedFetchPackingList.current;
    return () => {
      debouncedFetch.cancel();
    };
  }, []);

  // Cuando cambias página con paginador
  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
    debouncedFetchPackingList.current(value, { status });
  };

  return (
    <Box>
      <form>
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
                options={getAllStatus.data || []}
                label={t('common.status')}
                disabled={isStatusDisabled}
              />
            )}
          />
        </Box>
      </form>

      <Table
        columns={columnsPackinglist}
        rows={packingListRows}
        messageVoidData={t('common.noData')}
      />

      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Pagination
          count={paginationCount}
          page={currentPage}
          onChange={handleChangePage}
        />
      </Box>
    </Box>
  );
};

export default PackingList;
