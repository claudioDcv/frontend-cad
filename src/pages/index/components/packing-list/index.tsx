import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box, Pagination } from '@mui/material';

import {
  Dropdown,
  Table,
  MonthRangePicker,
  ButtonClear,
  Input,
  Notification,
} from '../../../../components';

import {
  useGetAllInvestments,
  useGetAllLocations,
  useGetAllMaterialTypes,
  useGetAllPackingList,
  useGetAllStatus,
} from '../../../../clients';

import { Option } from '../../../../types';
import { PackingListFormModel } from '../../types';

import {
  FIRST_PAGE,
  STATUS_PACKING_LIST,
  debounce,
  defaultStartDate,
  emptyOption,
  toDay,
} from '../../../../utils';
import {
  addOptionAll,
  defaultPackingListFormValues,
  isEmpty,
} from '../../utils';
import { packingListParams } from './utils';

const PackingList = () => {
  const { control, reset, watch } = useForm<PackingListFormModel>({
    defaultValues: defaultPackingListFormValues,
  });

  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(FIRST_PAGE);
  const [range, setRange] = useState<[Date, Date]>([defaultStartDate, toDay]);

  const { status, materialType, investment, location, docNumber } = watch();

  const getAllPackingList = useGetAllPackingList();
  const getAllStatus = useGetAllStatus();
  const getAllLocations = useGetAllLocations();
  const getAllMaterialType = useGetAllMaterialTypes();
  const getAllInvestments = useGetAllInvestments();

  const statusOptions = addOptionAll(getAllStatus.data);
  const materialTypeOptions = addOptionAll(getAllMaterialType.data);
  const investmentOptions = addOptionAll(getAllInvestments.data);
  const locationOptions = addOptionAll(getAllLocations.data);

  const isStatusDisabled = isEmpty(getAllStatus.data);
  const isMaterialTypeDisabled = isEmpty(getAllMaterialType.data);
  const isInvestmentDisabled = isEmpty(getAllInvestments.data);
  const isLocationDisabled = isEmpty(getAllLocations.data);

  const packingListRows = getAllPackingList.data?.packingList || [];
  const paginationCount = getAllPackingList.data?.meta?.count || 0;

  const debouncedFetchPackingList = useRef(
    debounce((page: number, filters: PackingListFormModel) => {
      const params = packingListParams(page, filters);
      getAllPackingList.call(params);
    }, 1000)
  );
  
  const handleClear = () => {
    reset(defaultPackingListFormValues);
    setRange([defaultStartDate, new Date()]);
    getAllLocations.clearData();
    getAllInvestments.clearData();
  };

  useEffect(() => {
    const timers = [
      setTimeout(() => getAllMaterialType.call(), 0),
      setTimeout(
        () => getAllStatus.call({ tableId: STATUS_PACKING_LIST }),
        200
      ),
      setTimeout(() => getAllInvestments.call(), 400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [getAllInvestments, getAllMaterialType, getAllStatus]);

  useEffect(() => {
    setCurrentPage(FIRST_PAGE);
    debouncedFetchPackingList.current(FIRST_PAGE, {
      status,
      materialType,
      investment,
      location,
      range,
      docNumber,
    });
  }, [status, range, materialType, investment, location, docNumber]);

  const handleInvestmentChange =
    (onChange: (value: Option) => void) => (value: Option) => {
      onChange(value);
      reset((prev) => ({
        ...prev,
        location: emptyOption,
      }));

      if (value.value) {
        getAllLocations.call({ investmentId: value.value, status: true });
      } else {
        getAllLocations.clearData();
      }
    };

  useEffect(() => {
    const debouncedFetch = debouncedFetchPackingList.current;
    return () => {
      debouncedFetch.cancel();
    };
  }, []);

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value - 1);
    debouncedFetchPackingList.current(value - 1, {
      materialType,
      status,
      investment,
      location,
      range,
      docNumber,
    });
  };

  return (
    <div>
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
              name="docNumber"
              control={control}
              render={({ field }) => (
                <Input label={t('common.numDoc')} {...field} />
              )}
            />
            <Controller
              name="materialType"
              control={control}
              render={({ field }) => (
                <Dropdown
                  {...field}
                  options={materialTypeOptions}
                  label={t('common.materialType')}
                  disabled={isMaterialTypeDisabled}
                />
              )}
            />
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Dropdown
                  {...field}
                  options={statusOptions}
                  label={t('common.status')}
                  disabled={isStatusDisabled}
                />
              )}
            />
            <Controller
              name="investment"
              control={control}
              render={({ field }) => (
                <Dropdown
                  {...field}
                  options={investmentOptions}
                  label={t('common.investment')}
                  onChange={handleInvestmentChange(field.onChange)}
                  disabled={isInvestmentDisabled}
                />
              )}
            />
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <Dropdown
                  {...field}
                  options={locationOptions}
                  label={t('packinglist.originBranch')}
                  disabled={isLocationDisabled}
                />
              )}
            />
            <MonthRangePicker value={range} onChange={setRange} />
            <ButtonClear
              onClick={handleClear}
              label={t('common.clearFilters')}
            />
          </Box>
        </form>
        <Table
          columns={[
            { id: 'statusName', label: t('packinglist.statusName') },
            { id: 'packinglistId', label: t('packinglist.packinglistId') },
            { id: 'barcode', label: t('packinglist.barcode') },
            { id: 'dispatchNumber', label: t('packinglist.dispatchNumber') },
            { id: 'originLocation', label: t('packinglist.originBranch') },
            { id: 'destinyLocation', label: t('packinglist.destinyBranch') },
            { id: 'investmentName', label: t('common.investment') },
            { id: 'creationDate', label: t('packinglist.creationDate') },
            { id: 'statusId', label: t('packinglist.statusId') },
            { id: 'categoryName', label: t('packinglist.category') },
            { id: 'totalGrams', label: t('packinglist.totalGrams') },
            { id: 'totalQuantity', label: t('packinglist.totalQuantity') },
            { id: 'documentType', label: t('packinglist.documentType') },
          ]}
          rows={packingListRows}
          messageVoidData={t('common.noData')}
        />
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Pagination
            count={paginationCount}
            page={currentPage + 1}
            onChange={handleChangePage}
          />
        </Box>
      </Box>
      <Notification
        open={!!getAllPackingList.error}
        onClose={getAllPackingList.onResetError}
        severity="error"
        i18n={{
          title: t('common.error'),
          text: getAllPackingList.error || t('common.unknownError'),
        }}
      />
    </div>
  );
};

export default PackingList;
