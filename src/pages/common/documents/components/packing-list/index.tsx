import { useRef, useState } from 'react';
import { Controller, ControllerRenderProps, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box, Pagination } from '@mui/material';
import {
  emptyOption,
  FIRST_PAGE,
  LOCATION_ACTIVE,
  SEARCH_DELAY,
} from '@/constants';
import {
  Table,
  MonthRangePicker,
  ButtonClear,
  Input,
  Notification,
  DropdownController,
} from '@components/index';
import useServices from './hooks/useServices';
import { Option } from '@/entities/Option.entity';
import {
  debounce,
  defaultStartDate,
  formatToDDMMYYYY,
  getMaterialType,
  getStatusIcon,
  isOnlyNumbersOrEmpty,
  toDay,
} from '@/utils';
import { PackingListFormModel } from '../../types';
import {
  addOptionAll,
  defaultPackingListFormValues,
  isEmpty,
} from '../../utils';
import PackingListDetailButton from './components/PackingListDetailButton';

const PackingList = () => {
  const { t } = useTranslation();

  const { control, reset, getValues, setValue } = useForm<PackingListFormModel>(
    {
      defaultValues: defaultPackingListFormValues(),
    }
  );

  const services = useServices();

  const [range, setRange] = useState<[Date, Date]>([defaultStartDate, toDay()]);

  const statusOptions = addOptionAll(services.getAllStatus.data);
  const materialTypeOptions = addOptionAll(services.getAllMaterialType.data);
  const investmentOptions = addOptionAll(services.getAllInvestments.data);
  const locationOptions = addOptionAll(services.getAllLocations.data);

  const isStatusDisabled = isEmpty(services.getAllStatus.data);
  const isMaterialTypeDisabled = isEmpty(services.getAllMaterialType.data);
  const isInvestmentDisabled = isEmpty(services.getAllInvestments.data);
  const isLocationDisabled = isEmpty(services.getAllLocations.data);

  const { packingList } = services.getAllPackingList.data;
  const { count } = services.getAllPackingList.data.meta;

  const debouncedSearchRef = useRef(
    debounce((docNumber: string) => {
      const newFilters = {
        ...getValues(),
        packinglistId: docNumber,
        page: FIRST_PAGE,
      };
      services.getAllPackingList.call(newFilters);
    }, SEARCH_DELAY)
  );

  const handleClear = () => {
    reset(defaultPackingListFormValues);
    setRange([defaultStartDate, toDay()]);
    services.getAllPackingList.call({
      ...defaultPackingListFormValues(),
    });
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
          status: LOCATION_ACTIVE,
        });
      }
      const newFilters = {
        ...getValues(),
        investment: value,
        location: emptyOption,
        page: FIRST_PAGE,
      };
      services.getAllPackingList.call(newFilters);
    };

  const handleChangeRange = (newRange: [Date, Date]) => {
    setRange(newRange);
    const newFilters = {
      ...getValues(),
      range: newRange,
      page: FIRST_PAGE,
    };
    setValue('range', newRange);
    services.getAllPackingList.call(newFilters);
  };

  const handleDocNumberChange =
    (field: ControllerRenderProps<PackingListFormModel>) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = event.target.value;

        if (isOnlyNumbersOrEmpty(rawValue)) {
          field.onChange(rawValue);
          debouncedSearchRef.current(rawValue);
        }
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
                <Input
                  label={t('common.numDoc')}
                  value={field.value}
                  onChange={handleDocNumberChange(field)}
                />
              )}
            />
            <DropdownController
              onChange={handleChangeMaterialType}
              disabled={isMaterialTypeDisabled}
              options={materialTypeOptions}
              label="common.materialType"
              name="categoryId"
              control={control}
            />
            <DropdownController
              onChange={handleChangeStatus}
              disabled={isStatusDisabled}
              options={statusOptions}
              label="common.status"
              name="status"
              control={control}
            />
            <DropdownController
              onChange={handleChangeInvestment}
              disabled={isInvestmentDisabled}
              options={investmentOptions}
              label="common.investment"
              name="investment"
              control={control}
            />
            <DropdownController
              onChange={handleChangeLocation}
              disabled={isLocationDisabled}
              options={locationOptions}
              label="packinglist.originBranch"
              name="location"
              control={control}
            />
            <MonthRangePicker value={range} onChange={handleChangeRange} />
            <ButtonClear
              onClick={handleClear}
              label={t('common.clearFilters')}
            />
          </Box>
        </form>
        <Table
          columns={[
            {
              id: 'statusName',
              label: t('packinglist.statusName'),
              render: ({ statusId, statusName }) =>
                getStatusIcon(statusId, statusName),
            },
            { id: 'packinglistId', label: t('packinglist.packinglistId') },
            { id: 'barcode', label: t('packinglist.barcode') },
            { id: 'dispatchNumber', label: t('packinglist.dispatchNumber') },
            { id: 'investmentName', label: t('common.investment') },
            { id: 'originLocation', label: t('packinglist.originBranch') },
            {
              id: 'creationDate',
              label: t('packinglist.creationDate'),
              render: ({ creationDate }) => formatToDDMMYYYY(creationDate),
            },
            { id: 'totalQuantity', label: t('packinglist.totalQuantity') },
            {
              id: 'categoryName',
              label: t('common.category'),
              render: ({ categoryName, categoryId }) =>
                getMaterialType(categoryName, categoryId, 'tooltip'),
            },
            { id: 'documentType', label: t('packinglist.documentType') },
            {
              id: 'actions',
              label: t('common.actions'),
              render: ({ packinglistId }) => (
                <Box display="flex" gap={1}>
                  <PackingListDetailButton
                    id={String(packinglistId)}
                    label={t('common.view')}
                  />
                </Box>
              ),
            },
          ]}
          rows={packingList}
          messageVoidData={t('common.noData')}
          size="small"
        />
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Pagination
            count={count}
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
          text: t(services.getAllPackingList.error),
        }}
      />
    </div>
  );
};

export default PackingList;
