import { useRef, useState } from 'react';
import { Controller, ControllerRenderProps, useForm } from 'react-hook-form';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  emptyOption,
  FIRST_PAGE,
  LOCATION_ACTIVE,
  SEARCH_DELAY,
} from '@/constants';
import {
  debounce,
  defaultStartDate,
  formatToDDMMYYYY,
  getMaterialType,
  getStatusIcon,
  isOnlyNumbersOrEmpty,
  toDay,
  Option,
} from '@/utils';
import {
  ButtonClear,
  DropdownController,
  MonthRangePicker,
  Pagination,
  Table,
  Notification,
  Input,
} from '@components/index';
import useServices from './hooks/useServices';
import {
  addOptionAll,
  defaultResolutionsFormValues,
  isEmpty,
} from '../../utils';
import { ResolutionFormModel } from '../../types';
import ViewContractsButton from './components/ViewContractsButton';

const Resolutions = () => {
  const { t } = useTranslation();

  const { control, reset, getValues, setValue } = useForm<ResolutionFormModel>({
    defaultValues: defaultResolutionsFormValues,
  });

  const services = useServices();

  const materialTypeOptions = addOptionAll(services.getAllMaterialType.data);
  const statusOptions = addOptionAll(services.getAllStatus.data);
  const investmentOptions = addOptionAll(services.getAllInvestments.data);
  const locationOptions = addOptionAll(services.getAllLocations.data);

  const isMaterialTypeDisabled = isEmpty(services.getAllMaterialType.data);
  const isStatusDisabled = isEmpty(services.getAllStatus.data);
  const isInvestmentDisabled = isEmpty(services.getAllInvestments.data);
  const isLocationDisabled = isEmpty(services.getAllLocations.data);

  const [range, setRange] = useState<[Date, Date]>([defaultStartDate, toDay]);

  const { resolutions, meta } = services.getAllResolutions.data;

  const debouncedSearchRef = useRef(
    debounce((resolutionNumber: string) => {
      const newFilters = {
        ...getValues(),
        resolutionNumber: resolutionNumber,
        page: FIRST_PAGE,
      };
      services.getAllResolutions.call(newFilters);
    }, SEARCH_DELAY)
  );

  const handleClear = () => {
    reset(defaultResolutionsFormValues);
    setRange([defaultStartDate, toDay]);
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

  const handleDocNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const rawValue = event.target.value;

    if (isOnlyNumbersOrEmpty(rawValue)) {
      setValue('resolutionNumber', rawValue);
      debouncedSearchRef.current(rawValue);
    }
  };

  const handleChangePage = (_p: unknown, page: number) => {
    const newFilters = { ...getValues(), page: page };
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
                  onChange={handleDocNumberChange}
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
            {
              id: 'categoryName',
              label: t('common.category'),
              render: ({ categoryName, categoryId }) =>
                getMaterialType(categoryName, categoryId, 'tooltip'),
            },
            {
              id: 'actions',
              label: t('common.actions'),
              render: ({ resolutionId }) => (
                <ViewContractsButton
                  id={resolutionId}
                  label={t('common.viewContracts')}
                />
              ),
            },
          ]}
          rows={resolutions}
          messageVoidData={t('common.noData')}
          size="small"
        />
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Pagination
            count={meta.count}
            page={meta.page}
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
          text: t(services.getAllResolutions.error),
        }}
      />
    </div>
  );
};
export default Resolutions;
