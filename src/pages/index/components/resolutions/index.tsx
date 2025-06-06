import { useCallback, useEffect, useState } from 'react';
import { Box, Button, Pagination } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';

import { ResolutionFormModel } from '../../types';
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
import {
  addOptionAll,
  defaultResolutionsFormValues,
  resolutionParams,
} from '../../utils';
import { defaultStartDate, STATUS_RESOLUTION, toDay } from '../../../../utils';
import IconList from '../../../../components/molecules/icon';
import Notification from '../../../../components/molecules/notification';
import { Resolution } from '../../../../clients/get-all-resolutions/types';

const Resolutions = () => {
  const { control, reset, watch } = useForm<ResolutionFormModel>({
    defaultValues: defaultResolutionsFormValues,
  });

  const { t } = useTranslation();
  const [range, setRange] = useState<[Date, Date]>([defaultStartDate, toDay]);
  const { investment, location, materialType, status } = watch();
  const [currentPage, setCurrentPage] = useState(0);
  const [filters, setFilters] = useState({
    investment,
    location,
    materialType,
    status,
    range,
  });

  const getAllResolutions = useGetAllResolutions();
  const getAllStatus = useGetAllStatus();
  const getAllLocations = useGetAllLocations();
  const getAllMaterialType = useGetAllMaterialTypes();
  const getAllInvestments = useGetAllInvestments();

  const [, navigate] = useLocation();

  const fetchResolutions = useCallback(
    (page: number = 0) => {
      const params = resolutionParams(page, filters);
      getAllResolutions.call(params);
    },
    [filters, getAllResolutions]
  );

  const handleInvestmentChange =
    (onChange: (value: { value: string; label: string }) => void) =>
    (value: { value: string; label: string }) => {
      onChange(value);

      reset((prev) => ({
        ...prev,
        location: { value: 'all', label: 'TODOS' },
      }));

      if (value.value) {
        getAllLocations.call({ investmentId: value.value, status: true });
      } else {
        getAllLocations.clearData();
      }
    };

  const handleClear = () => {
    reset(defaultResolutionsFormValues);
    setRange([defaultStartDate, new Date()]);
    getAllLocations.clearData();
    getAllInvestments.clearData();
  };

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value - 1);
  };

  const handleViewContracts = (resolutionId: string) => {
    navigate(`/contracts/${resolutionId}`);
  }

  useEffect(() => {
    getAllMaterialType.call();
    getAllInvestments.call();
    getAllStatus.call({ tableId: STATUS_RESOLUTION });
  }, [getAllInvestments, getAllMaterialType, getAllStatus]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilters({
        investment,
        location,
        materialType,
        status,
        range,
      });
      setCurrentPage(0);
    }, 200);
    return () => clearTimeout(timeout);
  }, [investment, location, materialType, status, range]);

  useEffect(() => {
    fetchResolutions(currentPage);
  }, [filters, currentPage, fetchResolutions]);

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
                  options={addOptionAll(getAllMaterialType.data)}
                  label={t('common.materialType')}
                  disabled={getAllMaterialType.data.length === 0}
                />
              )}
            />

            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Dropdown
                  {...field}
                  options={addOptionAll(getAllStatus.data)}
                  label={t('common.status')}
                  disabled={getAllStatus.data.length === 0}
                />
              )}
            />
            <Controller
              name="investment"
              control={control}
              render={({ field }) => (
                <Dropdown
                  {...field}
                  options={addOptionAll(getAllInvestments.data)}
                  label={t('common.investment')}
                  onChange={handleInvestmentChange(field.onChange)}
                  disabled={getAllInvestments.data.length === 0}
                />
              )}
            />
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <Dropdown
                  {...field}
                  options={addOptionAll(getAllLocations.data)}
                  label={t('common.location')}
                  disabled={getAllLocations.data.length === 0}
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
            { id: 'investmentName', label: t('resolution.investment') },
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
                <Button onClick={handleViewContracts.bind(null, row.resolutionId.toString())}>
                  {t('common.viewContracts')}
                  <IconList name="visualize" />
                </Button>
              ),
            },
          ]}
          rows={getAllResolutions.data?.resolutions || []}
          messageVoidData={t('common.noData')}
        />
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Pagination
            count={getAllResolutions.data?.meta?.count || 0}
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
