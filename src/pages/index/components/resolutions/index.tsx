import { useState } from 'react';

import { Box, Button } from '@mui/material';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';

import {
  ButtonClear,
  IconList,
  InputController,
  MonthRangePicker,
  Pagination,
  Table,
  Notification,
} from '../../../../components';

import {
  defaultStartDate,
  emptyOption,
  FIRST_PAGE,
  toDay,
} from '../../../../utils';

import {
  addOptionAll,
  defaultResolutionsFormValues,
  isEmpty,
} from '../../utils';

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

  const renderContracts = (row: Resolution) => (
    <Button onClick={() => navigate(routes.contracts.path(row.resolutionId.toString()))}>
      <IconList name="visualize" />
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
            { id: 'resolutionNumber', label: t('resolution.resolutionNumber') },
            { id: 'barcode', label: t('resolution.barcode') },
            { id: 'dispatchGuide', label: t('resolution.dispatchGuide') },
            { id: 'investmentName', label: t('common.investment') },
            { id: 'investmentRut', label: t('resolution.investmentRut') },
            { id: 'locationName', label: t('resolution.location') },
            { id: 'locationAddress', label: t('resolution.locationAddress') }, 
            { id: 'closeDate', label: t('resolution.closeDate') },
            { id: 'contractCount', label: t('resolution.contractCount') },
            { id: 'totalJewels', label: t('resolution.totalJewels') },
            { id: 'categoryName', label: t('resolution.category') },
            { id: 'stateName', label: t('resolution.status') },
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
