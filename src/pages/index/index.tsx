import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  useGetAllLocations,
  useGetAllStatus,
  useGetAllResolutions,
  useGetAllMaterialTypes,
  useGetAllInvestments,
} from '../../clients';
import {
  ButtonClear,
  Dropdown,
  MonthRangePicker,
  Pagination,
  Table,
} from '../../components';
import { columns } from './index.config';
import { FormModel } from './types';
import { toDay } from '../../utils';

const Index = () => {
  const { reset, control } = useForm<FormModel>({
    defaultValues: {
      materialType: { value: '', label: '' },
      status: { value: '', label: '' },
      investment: { value: '', label: '' },
      branch: { value: '', label: '' },
      dateRange: [toDay, toDay],
    },
  });

  const { t } = useTranslation();
  const [range, setRange] = useState<[Date, Date]>([toDay, toDay]);
  const getAllStatus = useGetAllStatus();
  const getAllLocations = useGetAllLocations();
  const getAllResolutions = useGetAllResolutions();
  const getAllMaterialType = useGetAllMaterialTypes();
  const getAllInvestments = useGetAllInvestments();

  useEffect(() => {
    getAllMaterialType.call();
    getAllStatus.call();
    getAllInvestments.call();
  }, [getAllStatus, getAllMaterialType, getAllInvestments]);

  useEffect(() => {
    if (!getAllResolutions.data.resolutions.length) {
      getAllResolutions.call({ page: 1 });
    }
  }, [getAllResolutions, getAllResolutions.data, getAllResolutions.status]);

  const handleClear = () => {
    reset();
    setRange([toDay, toDay]);
    getAllLocations.clearData();
  };

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    getAllResolutions.call({ page: value });
  };

  const handleInvestmentChange =
    (onChange: (value: { value: string; label: string }) => void) =>
    (value: { value: string; label: string }) => {
      onChange(value);
      if (value.value) {
        getAllLocations.call({ investmentId: value.value, status: true });
      }
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
            name="materialType"
            control={control}
            render={({ field }) => (
              <Dropdown
                {...field}
                options={getAllMaterialType.data}
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
                options={getAllStatus.data}
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
                options={getAllInvestments.data}
                label={t('common.investment')}
                value={field.value}
                onChange={handleInvestmentChange(field.onChange)}
                disabled={getAllInvestments.data.length === 0}
              />
            )}
          />

          <Controller
            name="branch"
            control={control}
            render={({ field }) => (
              <Dropdown
                {...field}
                options={getAllLocations.data}
                label={t('common.branch')}
                value={field.value}
                disabled={getAllLocations.data.length === 0}
              />
            )}
          />

          <MonthRangePicker value={range} onChange={setRange} />

          <ButtonClear onClick={handleClear} label={t('common.clearFilters')} />
        </Box>
      </form>

      <Table columns={columns} rows={getAllResolutions.data.resolutions} />

      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Pagination
          count={getAllResolutions.data.meta.count}
          page={getAllResolutions.data.meta.page}
          onChange={handleChangePage}
        />
      </Box>
    </Box>
  );
};

export default Index;
