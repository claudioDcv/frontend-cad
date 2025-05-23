import { useEffect, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
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
import { columnsResolutions, columnsPackinglist } from './index.config';
import { FormModel } from './types';
import { FetchStatus, toDay } from '../../utils';

const Index = () => {
  const { reset, control, watch } = useForm<FormModel>({
    defaultValues: {
      materialType: { value: '', label: '' },
      status: { value: '', label: '' },
      investment: { value: '', label: '' },
      branch: { value: '', label: '' },
      dateRange: [toDay, toDay],
    },
  });

  const investment = watch('investment');
  const { t } = useTranslation();
  const [tabIndex, setTabIndex] = useState(0);
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
  }, [getAllInvestments, getAllMaterialType, getAllStatus]);

  useEffect(() => {
    if (
      getAllResolutions.status === FetchStatus.IDLE &&
      (!getAllResolutions.data || !getAllResolutions.data.resolutions?.length)
    ) {
      getAllResolutions.call({ page: 1 });
    }
  }, [getAllResolutions.status, getAllResolutions.data]); 

  useEffect(() => {
    const filters = {
      page: 1,
      investmentId: investment?.value ? Number(investment.value) : undefined,
    };

    getAllResolutions.call(filters);
  }, [ investment]);

  const handleClear = () => {
    reset();
    setRange([toDay, toDay]);
    getAllLocations.clearData();
  };

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    getAllResolutions.call({
      page: value,
      investmentId: investment?.value ? Number(investment.value) : undefined,
    });
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleInvestmentChange =
    (onChange: (value: { value: string; label: string }) => void) =>
    (value: { value: string; label: string }) => {
      onChange(value);
      if (value.value) {
        getAllLocations.call({ investmentId: value.value, status: true });
      } else {
        getAllLocations.clearData();
      }
    };

  return (
    <Box>
      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label={t('common.resolutions')} />
        <Tab label={t('common.packingList')} />
      </Tabs>

      {tabIndex === 0 && (
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
                    disabled={
                      !getAllMaterialType.data ||
                      getAllMaterialType.data.length === 0
                    }
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
                    disabled={
                      !getAllStatus.data || getAllStatus.data.length === 0
                    }
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
                    onChange={handleInvestmentChange(field.onChange)}
                    disabled={
                      !getAllInvestments.data ||
                      getAllInvestments.data.length === 0
                    }
                  />
                )}
              />

              <Controller
                name="branch"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    {...field} // mejor mantener control uniforme
                    options={getAllLocations.data}
                    label={t('common.branch')}
                    disabled={
                      !getAllLocations.data || getAllLocations.data.length === 0
                    }
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
            columns={columnsResolutions}
            rows={getAllResolutions.data?.resolutions || []}
          />

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Pagination
              count={getAllResolutions.data?.meta?.count || 0}
              page={getAllResolutions.data?.meta?.page || 1}
              onChange={handleChangePage}
            />
          </Box>
        </Box>
      )}

      {tabIndex === 1 && (
        <Box>
          <Table columns={columnsPackinglist} rows={[]} />
        </Box>
      )}
    </Box>
  );
};

export default Index;
