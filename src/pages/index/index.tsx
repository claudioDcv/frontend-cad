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
import {
  columnsResolutions,
  columnsPackinglist,
  defaultFormValues,
} from './index.config';
import { FormModel } from './types';
import { FetchStatus, toDay } from '../../utils';
import { PropsResolution } from '../../types';

const Index = () => {
  const { reset, control, watch } = useForm<FormModel>({
    defaultValues: defaultFormValues,
  });

  const { investment, location, materialType, status } = watch();

  const { t } = useTranslation();
  const [tabIndex, setTabIndex] = useState(0);
  const [range, setRange] = useState<[Date, Date]>([toDay, toDay]);

  const getAllStatus = useGetAllStatus();
  const getAllLocations = useGetAllLocations();
  const getAllResolutions = useGetAllResolutions();
  const getAllMaterialType = useGetAllMaterialTypes();
  const getAllInvestments = useGetAllInvestments();

  const fetchResolutions = (page: number) => {
    const params: PropsResolution = {
      page,
      investmentId: investment?.value ? Number(investment.value) : undefined,
      locationId: location?.value ? Number(location.value) : undefined,
      categoryId: materialType?.value ? Number(materialType.value) : undefined,
      stateId: status?.value ? Number(status.value) : undefined,
      endDate: range[1].toISOString().split('.')[0],
    };

    if (range[0].toDateString() !== range[1].toDateString()) {
      params.startDate = range[0].toISOString().split('.')[0];
    }

    getAllResolutions.call(params);
  };

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
    if (tabIndex === 0) {
      fetchResolutions(1);
    }
  }, [location, investment, materialType, status, range, tabIndex]);

  const handleClear = () => {
    reset(defaultFormValues);

    setRange([toDay, toDay]);
    getAllLocations.clearData();
    getAllInvestments.clearData();
  };

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    fetchResolutions(value);
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    console.log(newValue);
  };

  const handleInvestmentChange =
    (onChange: (value: { value: string; label: string }) => void) =>
    (value: { value: string; label: string }) => {
      onChange(value);

      reset((prev) => ({
        ...prev,
        location: { value: '', label: '' },
      }));

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
                name="location"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    {...field}
                    options={getAllLocations.data}
                    label={t('common.location')}
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

          {getAllResolutions.data?.resolutions?.length ? (
            <Table
              columns={columnsResolutions}
              rows={getAllResolutions.data?.resolutions || []}
            />
          ) : (
            <Box textAlign="center" mt={4}>
              {t('common.noData')}
            </Box>
          )}

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
