import { useEffect, useRef, useState } from 'react';

import { Box, Button, Pagination } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { debounce } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';

import useRoutes from '../../../../conf/routes';

import {
  useGetAllInvestments,
  useGetAllLocations,
  useGetAllMaterialTypes,
  useGetAllResolutions,
  useGetAllStatus,
} from '../../../../clients';
import {
  Dropdown,
  MonthRangePicker,
  ButtonClear,
  Table,
} from '../../../../components';
import Notification from '../../../../components/molecules/notification';
import IconList from '../../../../components/molecules/icon';

import { ResolutionFormModel } from '../../types';
import { Resolution } from '../../../../clients/get-all-resolutions/types';
import { addOptionAll, isEmpty } from '../../utils';
import {
  defaultStartDate,
  emptyOption,
  FIRST_PAGE,
  STATUS_RESOLUTION,
  toDay,
} from '../../../../utils';
import { Option } from '../../../../types';
import { defaultResolutionsFormValues, resolutionParams } from './utils';


const Resolutions = () => {
  const { control, reset, watch } = useForm<ResolutionFormModel>({
    defaultValues: defaultResolutionsFormValues,
  });

  const [, navigate] = useLocation();
  const routes = useRoutes();

  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(FIRST_PAGE);
  const [range, setRange] = useState<[Date, Date]>([defaultStartDate, toDay]);

  const { investment, location, materialType, status } = watch();

  const getAllResolutions = useGetAllResolutions();
  const getAllStatus = useGetAllStatus();
  const getAllLocations = useGetAllLocations();
  const getAllMaterialType = useGetAllMaterialTypes();
  const getAllInvestments = useGetAllInvestments();

  const materialTypeOptions = addOptionAll(getAllMaterialType.data);
  const statusOptions = addOptionAll(getAllStatus.data);
  const investmentOptions = addOptionAll(getAllInvestments.data);
  const locationOptions = addOptionAll(getAllLocations.data);

  const isMaterialTypeDisabled = isEmpty(getAllMaterialType.data);
  const isStatusDisabled = isEmpty(getAllStatus.data);
  const isInvestmentDisabled = isEmpty(getAllInvestments.data);
  const isLocationDisabled = isEmpty(getAllLocations.data);

  const resolutionRows = getAllResolutions.data?.resolutions || [];
  const paginationCount = getAllResolutions.data?.meta?.count || 0;

  const debouncedFetchResolutions = useRef(
    debounce((page: number, filters: ResolutionFormModel) => {
      const params = resolutionParams(page, filters);
      getAllResolutions.call(params);
    }, 1000)
  );

  const handleClear = () => {
    reset(defaultResolutionsFormValues);
    setRange([defaultStartDate, new Date()]);
    getAllLocations.clearData();
    getAllInvestments.clearData();
  };

  useEffect(() => {
    const timers = [
      setTimeout(() => getAllMaterialType.call(), 0),
      setTimeout(() => getAllStatus.call({ tableId: STATUS_RESOLUTION }), 200),
      setTimeout(() => getAllInvestments.call(), 400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [getAllInvestments, getAllMaterialType, getAllStatus]);
  
  useEffect(() => {
    setCurrentPage(FIRST_PAGE);
    debouncedFetchResolutions.current(FIRST_PAGE, {
      investment,
      location,
      materialType,
      status,
      range,
    });
  }, [investment, location, materialType, status, range]);

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
    const debouncedFetch = debouncedFetchResolutions.current;
    return () => {
      debouncedFetch.cancel();
    };
  }, []);

  const handleViewContracts = (resolutionId: string) => {
    navigate(routes.contracts.path(resolutionId));
  };

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value - 1);
    debouncedFetchResolutions.current(value - 1, {
      investment,
      location,
      materialType,
      status,
      range,
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
                  label={t('common.location')}
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
            { id: 'resolutionNumber', label: t('resolution.resolutionNumber') },
            { id: 'barcode', label: t('resolution.barcode') },
            { id: 'dispatchGuide', label: t('resolution.dispatchGuide') },
            { id: 'investmentName', label: t('common.investment') },
            { id: 'locationName', label: t('resolution.location') },
            { id: 'closeDate', label: t('resolution.closeDate') },
            { id: 'contractCount', label: t('resolution.contractCount') },
            { id: 'totalJewels', label: t('resolution.totalJewels') },
            { id: 'categoryName', label: t('resolution.category') },
            { id: 'stateName', label: t('resolution.status') },
            {
              id: 'actions',
              label: t('common.actions'),
              render: (row: Resolution) => (
                <Button
                  onClick={handleViewContracts.bind(
                    null,
                    row.resolutionId.toString()
                  )}
                >
                  <IconList name="visualize" />
                  {t('common.viewContracts')}
                </Button>
              ),
            },
          ]}
          rows={resolutionRows}
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
        open={!!getAllResolutions.error}
        onClose={getAllResolutions.onResetError}
        severity="error"
        i18n={{
          title: t('common.error'),
          text: getAllResolutions.error || t('common.unknownError'),
        }}
      />
    </div>
  );
};

export default Resolutions;
