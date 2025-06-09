import { Box } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Dropdown, Pagination, Table } from '../../../../components';
import { useGetAllPackingList, useGetAllStatus } from '../../../../clients';
import { PackingListFormModel } from '../../types';
import { defaultPackingListFormValues } from '../../utils';

const PackingList = () => {
  const { control, watch } = useForm<PackingListFormModel>({
    defaultValues: defaultPackingListFormValues,
  });

  const { status } = watch();
  const { t } = useTranslation();

  const getAllStatus = useGetAllStatus();
  const getAllPackingList = useGetAllPackingList();

  const isStatusDisabled = !getAllStatus.data || getAllStatus.data.length === 0;
  const packingListRows = getAllPackingList.data?.packingList || [];
  const paginationCount = getAllPackingList.data?.meta?.count || 0;
  const paginationPage = getAllPackingList.data?.meta?.page || 1;

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (!status?.value) return;

    getAllPackingList.call({ statusId: status.value, page: value });
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
                options={getAllStatus.data}
                label={t('common.status')}
                disabled={isStatusDisabled}
              />
            )}
          />
        </Box>
      </form>

      <Table
        columns={[
          { id: 'packinglistId', label: t('packinglist.packinglistId') },
          { id: 'barcode', label: t('packinglist.barcode') },
          { id: 'dispatchNumber', label: t('packinglist.dispatchNumber') },
          { id: 'investmentName', label: t('packinglist.investmentName') },
          { id: 'originBranch', label: t('packinglist.originBranch') },
          { id: 'destinyBranch', label: t('packinglist.destinyBranch') },
          { id: 'creationDate', label: t('packinglist.creationDate') },
          { id: 'totalQuantity', label: t('packinglist.totalQuantity') },
          { id: 'totalGrams', label: t('packinglist.totalGrams') },
          { id: 'documentType', label: t('packinglist.documentType') },
          { id: 'statusId', label: t('packinglist.statusId') },
          { id: 'statusName', label: t('packinglist.statusName') },
          { id: 'category', label: t('packinglist.category') },
        ]}
        rows={packingListRows}
        messageVoidData={t('common.noData')}
      />

      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Pagination
          count={paginationCount}
          page={paginationPage}
          onChange={handleChangePage}
        />
      </Box>
    </Box>
  );
};

export default PackingList;
