import { useRef, useState } from 'react';

import { Box, Button } from '@mui/material';
import { Controller, ControllerRenderProps, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';

import {
  ButtonClear,
  InputController,
  MonthRangePicker,
  Pagination,
  Table,
  Notification,
  Input,
} from '../../../../components';

import {
  debounce,
  defaultStartDate,
  emptyOption,
  FIRST_PAGE,
  formatToDDMMYYYY,
  getMaterialType,
  getStatusIcon,
  LOCATION_ACTIVE,
  toDay,
} from '../../../../utils';

import {
  addOptionAll,
  defaultResolutionsFormValues,
  isEmpty,
} from '../../utils';

import { Visibility } from '@mui/icons-material';
import { ResolutionFormModel } from '../../types';
import useServices from './hooks/useServices';
import useRoutes from '../../../../conf/routes';

import { Option } from '../../../../types';

import { Resolution } from '../../../../clients/get-all-resolutions/types';

const Resolutions = () => {
  const { control, reset, getValues, setValue } = useForm<ResolutionFormModel>({
    defaultValues: defaultResolutionsFormValues,
  });

  const services = useServices();
  const routes = useRoutes();

  const materialTypeOptions = addOptionAll(services.getAllMaterialType.data);
  const statusOptions = addOptionAll(services.getAllStatus.data);
  const investmentOptions = addOptionAll(services.getAllInvestments.data);
  const locationOptions = addOptionAll(services.getAllLocations.data);

  const isMaterialTypeDisabled = isEmpty(services.getAllMaterialType.data);
  const isStatusDisabled = isEmpty(services.getAllStatus.data);
  const isInvestmentDisabled = isEmpty(services.getAllInvestments.data);
  const isLocationDisabled = isEmpty(services.getAllLocations.data);

  const { t } = useTranslation();
  const [, navigate] = useLocation();
  const [range, setRange] = useState<[Date, Date]>([defaultStartDate, toDay]);

  const resolutionRows = services.getAllResolutions.data?.resolutions || [];
  const paginationCount = services.getAllResolutions.data?.meta?.count || 0;

  const debouncedSearchRef = useRef(
    debounce((resolutionNumber: string) => {
      const newFilters = {
        ...getValues(),
        resolutionNumber: resolutionNumber,
        page: FIRST_PAGE,
      };
      services.getAllResolutions.call(newFilters);
    }, 2000)
  );

  const renderContracts = (row: Resolution) => (
    <Button
      endIcon={<Visibility />}
      onClick={() =>
        navigate(routes.contracts.path(row.resolutionId.toString()))
      }
    >
      {t('common.viewContracts')}
    </Button>
  );

  const handleClear = () => {
    reset(defaultResolutionsFormValues);
    setRange([defaultStartDate, new Date()]);
    services.getAllLocations.clearData();
    services.getAllInvestments.clearData();

    services.getAllResolutions.call({
      ...defaultResolutionsFormValues,
    });
  };

  const handleChangeStatus =
    (field: ControllerRenderProps<ResolutionFormModel>) => (value: Option) => {
      field.onChange(value);
      const newFilters = { ...getValues(), status: value, page: FIRST_PAGE };
      services.getAllResolutions.call(newFilters);
    };

  const handleChangeMaterialType =
    (field: ControllerRenderProps<ResolutionFormModel>) => (value: Option) => {
      field.onChange(value);
      const newFilters = {
        ...getValues(),
        categoryId: value,
        page: FIRST_PAGE,
      };
      services.getAllResolutions.call(newFilters);
    };

  const handleChangeInvestment =
    (field: ControllerRenderProps<ResolutionFormModel>) => (value: Option) => {
      field.onChange(value);
      setValue('location', emptyOption);
      if (value?.value) {
        services.getAllLocations.call({
          investmentId: value.value,
          status: LOCATION_ACTIVE,
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
      services.getAllResolutions.call(newFilters);
    };

  const handleChangeLocation =
    (field: ControllerRenderProps<ResolutionFormModel>) => (value: Option) => {
      field.onChange(value);
      const newFilters = {
        ...getValues(),
        location: value,
        page: FIRST_PAGE,
      };
      services.getAllResolutions.call(newFilters);
    };

  const handleChangeRange = (newRange: [Date, Date]) => {
    setRange(newRange);
    const newFilters = {
      ...getValues(),
      range: newRange,
      page: FIRST_PAGE,
    };
    setValue('range', newRange);
    services.getAllResolutions.call(newFilters);
  };

  const handleDocNumberChange =
    (field: ControllerRenderProps<ResolutionFormModel>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      field.onChange(value);
      debouncedSearchRef.current(value);
    };

  const handleChangePage = (_p: unknown, page: number) => {
    const newFilters = { ...getValues(), page };
    setValue('page', page);
    services.getAllResolutions.call(newFilters);
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
              name="resolutionNumber"
              control={control}
              render={({ field }) => (
                <Input
                  label={t('common.numDoc')}
                  value={field.value}
                  onChange={handleDocNumberChange(field)}
                />
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
              label="common.location"
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
              label: t('resolution.status'),
              render: ({ statusId, statusName }) =>
                getStatusIcon(statusId, statusName),
            },
            { id: 'resolutionNumber', label: t('resolution.resolutionNumber') },
            { id: 'barcode', label: t('resolution.barcode') },
            { id: 'dispatchGuide', label: t('resolution.dispatchGuide') },
            { id: 'investmentName', label: t('common.investment') },
            { id: 'locationName', label: t('resolution.location') },
            {
              id: 'closeDate',
              label: t('resolution.closeDate'),
              render: ({ closeDate }) => formatToDDMMYYYY(closeDate),
            },
            { id: 'contractCount', label: t('resolution.contractCount') },
            { id: 'categoryName', label: t('common.category'), render: ({ categoryName, categoryId }) => getMaterialType(categoryName, categoryId) },
            {
              id: 'actions',
              label: t('common.actions'),
              render: renderContracts,
            },
          ]}
          rows={resolutionRows}
          messageVoidData={t('common.noData')}
          size="small"
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
        open={!!services.getAllResolutions.error}
        onClose={services.getAllResolutions.onResetError}
        severity="error"
        i18n={{
          title: t('common.error'),
          text: services.getAllResolutions.error || t('common.unknownError'),
        }}
      />
    </div>
  );
};
export default Resolutions;
