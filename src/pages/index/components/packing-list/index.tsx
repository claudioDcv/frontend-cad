import { useState } from 'react';
import { Controller, ControllerRenderProps, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box, Pagination } from '@mui/material';

import {
  Table,
  MonthRangePicker,
  ButtonClear,
  Input,
  Notification,
  InputController,
} from '../../../../components';

import { Option } from '../../../../types';
import { PackingListFormModel } from '../../types';

import {
  FIRST_PAGE,
  defaultStartDate,
  emptyOption,
  toDay,
} from '../../../../utils';
import {
  addOptionAll,
  defaultPackingListFormValues,
  isEmpty,
} from '../../utils';
import useServices from './hooks/useServices';

const PackingList = () => {
  const { control, reset, getValues, setValue } = useForm<PackingListFormModel>(
    {
      defaultValues: defaultPackingListFormValues,
    }
  );

  const services = useServices();

  const { t } = useTranslation();
  const [range, setRange] = useState<[Date, Date]>([defaultStartDate, toDay]);

  const statusOptions = addOptionAll(services.getAllStatus.data);
  const materialTypeOptions = addOptionAll(services.getAllMaterialType.data);
  const investmentOptions = addOptionAll(services.getAllInvestments.data);
  const locationOptions = addOptionAll(services.getAllLocations.data);

  const isStatusDisabled = isEmpty(services.getAllStatus.data);
  const isMaterialTypeDisabled = isEmpty(services.getAllMaterialType.data);
  const isInvestmentDisabled = isEmpty(services.getAllInvestments.data);
  const isLocationDisabled = isEmpty(services.getAllLocations.data);

  const packingListRows = services.getAllPackingList.data?.packingList || [];
  const paginationCount = services.getAllPackingList.data?.meta?.count || 0;

  const handleClear = () => {
    reset(defaultPackingListFormValues);
    setRange([defaultStartDate, new Date()]);
    services.getAllLocations.clearData();
    services.getAllInvestments.clearData();
  };

  const handleChangeStatus =
    (field: ControllerRenderProps<PackingListFormModel>) => (value: Option) => {
      field.onChange(value);
      const newFilters = { ...getValues(), status: value, page: FIRST_PAGE };
      services.getAllPackingList.call(newFilters);
    };

  const handleChangeMaterialType =
    (field: ControllerRenderProps<PackingListFormModel>) => (value: Option) => {
      field.onChange(value);
      const newFilters = {
        ...getValues(),
        categoryId: value,
        page: FIRST_PAGE,
      };
      services.getAllPackingList.call(newFilters);
    };

  const handleChangeLocation =
    (field: ControllerRenderProps<PackingListFormModel>) => (value: Option) => {
      field.onChange(value);
      const newFilters = {
        ...getValues(),
        location: value,
        page: FIRST_PAGE,
      };
      services.getAllPackingList.call(newFilters);
    };

  const handleChangeInvestment =
    (field: ControllerRenderProps<PackingListFormModel>) => (value: Option) => {
      field.onChange(value);
      setValue('location', emptyOption);
      if (value?.value) {
        services.getAllLocations.call({
          investmentId: value.value,
          status: true,
        });
      } else {
        services.getAllLocations.clearData();
      }
      const newFilters = {
        ...getValues(),
        investment: value,
        location: emptyOption,
        page: FIRST_PAGE,
      };
      services.getAllPackingList.call(newFilters);
    };

  const handleChangePage = (_p: unknown, page: number) => {
    const newFilters = { ...getValues(), page };
    setValue('page', page);
    services.getAllPackingList.call(newFilters);
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
            <InputController
              onChange={handleChangeMaterialType}
              disabled={isMaterialTypeDisabled}
              options={materialTypeOptions}
              label="common.materialType"
              name="categoryId"
              control={control}
            />
            <InputController
              onChange={handleChangeStatus}
              disabled={isStatusDisabled}
              options={statusOptions}
              label="common.status"
              name="status"
              control={control}
            />
            <InputController
              onChange={handleChangeInvestment}
              disabled={isInvestmentDisabled}
              options={investmentOptions}
              label="common.investment"
              name="investment"
              control={control}
            />
            <InputController
              onChange={handleChangeLocation}
              disabled={isLocationDisabled}
              options={locationOptions}
              label="common.originBranch"
              name="location"
              control={control}
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
            page={getValues().page}
            onChange={handleChangePage}
          />
        </Box>
      </Box>
      <Notification
        open={!!services.getAllPackingList.error}
        onClose={services.getAllPackingList.onResetError}
        severity="error"
        i18n={{
          title: t('common.error'),
          text: services.getAllPackingList.error || t('common.unknownError'),
        }}
      />
    </div>
  );
};

export default PackingList;
