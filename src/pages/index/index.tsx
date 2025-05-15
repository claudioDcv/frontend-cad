import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  useGetAllBranches,
  useGetAllStatus,
  useGetAllResolutions,
  useGetAllMaterialTypes,
  useGetAllInvestments,
} from '../../clients';
import {
  ButtonClear,
  Dropdown,
  MonthRangePicker,
  Table,
} from '../../components';
import { columns } from './index.config';
import { FormModel, ResolutionModel } from './types';
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
  const [data, setData] = useState<ResolutionModel[]>([]);
  const [range, setRange] = useState<[Date, Date]>([toDay, toDay]);

  const getAllStatus = useGetAllStatus();
  const getAllBranches = useGetAllBranches();
  const getAllResolutions = useGetAllResolutions();
  const getAllMaterialType = useGetAllMaterialTypes();
  const getAllInvestments = useGetAllInvestments();

  useEffect(() => {
    getAllMaterialType.call();
    getAllStatus.call();
    getAllResolutions.call();
    getAllInvestments.call();
  }, [getAllStatus, getAllBranches, getAllResolutions, getAllMaterialType, getAllInvestments]);

  useEffect(() => {
    if (getAllResolutions.status === 'success') {
      setData(getAllResolutions.data);
    }
  }, [getAllResolutions.data, getAllResolutions.status]);

  const handleClear = () => {
    reset({
      dateRange: [toDay, toDay],
    });
    setRange([toDay, toDay]);
  };
  
  const handleInvestmentChange = (onChange: (value: { value: string; label: string }) => void) => (value: { value: string; label: string }) => {
    onChange(value);
    if (value.value) {
      getAllBranches.call({ investmentId: value.value, status: true });
    }
  }

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
              />
            )}
          />

          <Controller
            name="branch"
            control={control}
            render={({ field }) => (
              <Dropdown
                {...field}
                options={getAllBranches.data}
                label={t('common.branch')}
                value={field.value}
              />
            )}
          />

          <MonthRangePicker value={range} onChange={setRange} />

          <ButtonClear onClick={handleClear} label={t('common.clearFilters')} />
        </Box>
      </form>

      <Table columns={columns} rows={data} />
    </Box>
  );
};

export default Index;
