import { useState } from 'react';

import { Box, Button } from '@mui/material';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  ButtonClear,
  IconList,
  InputController,
  MonthRangePicker,
  Pagination,
  Table,
} from '../../components';
import { defaultStartDate, FIRST_PAGE, toDay } from '../../utils';
import {
  addOptionAll,
  defaultResolutionsFormValues,
  isEmpty,
} from '../index/utils';
import { ResolutionFormModel } from '../index/types';
import useServices from './hooks/useServices';
import { Option } from '../../types';

const Test = () => {
  const { control, reset, getValues, setValue } = useForm<ResolutionFormModel>({
    defaultValues: defaultResolutionsFormValues,
  });

  const services = useServices();

  const materialTypeOptions = addOptionAll(services.getAllMaterialType.data);
  const statusOptions = addOptionAll(services.getAllStatus.data);

  const isMaterialTypeDisabled = isEmpty(services.getAllMaterialType.data);
  const isStatusDisabled = isEmpty(services.getAllStatus.data);

  const { t } = useTranslation();
  const [range, setRange] = useState<[Date, Date]>([defaultStartDate, toDay]);

  const resolutionRows = services.getAllResolutions.data?.resolutions || [];
  const paginationCount = services.getAllResolutions.data?.meta?.count || 0;

  const handleClear = () => {
    reset(defaultResolutionsFormValues);
    setRange([defaultStartDate, new Date()]);
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
              render: () => (
                <Button>
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
            page={getValues().page}
            onChange={handleChangePage}
          />
        </Box>
      </Box>
    </div>
  );
};
export default Test;
