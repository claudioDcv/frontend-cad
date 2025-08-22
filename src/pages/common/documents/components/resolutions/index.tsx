import { useRef, useState } from 'react';
import { Controller, ControllerRenderProps, useForm } from 'react-hook-form';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  emptyOption,
  FIRST_PAGE,
  LOCATION_ACTIVE,
  SEARCH_DELAY,
  validRoles,
} from '@/constants';
import {
  debounce,
  defaultStartDate,
  formatToDDMMYYYY,
  getMaterialType,
  getStatusIcon,
  isOnlyNumbersOrEmpty,
  toDay,
} from '@/utils';
import { Option } from '@/entities/Option.entity';
import {
  ButtonClear,
  DropdownController,
  MonthRangePicker,
  Pagination,
  Table,
  Input,
  Access,
  IconList,
  ResolutionDetailButton,
} from '@components/index';
import useServices from './hooks/useServices';
import {
  addOptionAll,
  defaultResolutionsFormValues,
  isEmpty,
} from '../../utils';
import { Resolution } from '@/entities/Resolution.entity';
import { ResolutionFormModel } from '../../types';
import {
  ResolutionSendTruckModal,
} from './components';
import { useReceivablesContext } from '@/modules/receivables/context/useReceivablesContext';
import { useMassiveResolutionContext } from '@/modules/massive-resolution/context/useMassiveResolutionContext';

const Resolutions = () => {
  const { t } = useTranslation();
  const massiveResolutionContext = useMassiveResolutionContext();
  const receivablesContext = useReceivablesContext();

  const { control, reset, getValues, setValue } = useForm<ResolutionFormModel>({
    defaultValues: defaultResolutionsFormValues(),
  });
  const [truckId, setTruckId] = useState<number | null>(null);

  const services = useServices();

  const materialTypeOptions = addOptionAll(services.getAllMaterialType.data);
  const statusOptions = addOptionAll(services.getAllStatus.data);
  const investmentOptions = addOptionAll(services.getAllInvestments.data);
  const locationOptions = addOptionAll(services.getAllLocations.data);

  const isMaterialTypeDisabled = isEmpty(services.getAllMaterialType.data);
  const isStatusDisabled = isEmpty(services.getAllStatus.data);
  const isInvestmentDisabled = isEmpty(services.getAllInvestments.data);
  const isLocationDisabled = isEmpty(services.getAllLocations.data);

  const [range, setRange] = useState<[Date, Date]>([defaultStartDate, toDay()]);

  const { content: resolutions, meta } = services.getAllResolutions.data;

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
    setRange([defaultStartDate, toDay()]);
    services.getAllResolutions.call(
      (defaultResolutionsFormValues())
    );
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

  const handleMassiveResolution = (resolution: Resolution) => () => {
    massiveResolutionContext.setResolutionId(resolution.resolutionId);
  };

  const handleSendTruckId = (id: number) => () => {
    setTruckId(id);
  };

  const handleCloseTruckId = () => {
    setTruckId(null);
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
              sx={{ width: '70%' }}
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
              render: ({ statusId, stateName }) =>
                getStatusIcon(statusId, stateName),
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
                getMaterialType(categoryName, String(categoryId), 'tooltip'),
            },
            {
              id: 'actions',
              label: t('common.actions'),
              render: (resolution) => (
                <Box display="flex" gap={1}>
                  <ResolutionDetailButton
                    id={String(resolution.resolutionId)}
                    label={t('common.view')}
                  />
                  <Access roles={[validRoles.operator]}>
                    <Tooltip title={t('common.massUpload')}>
                      <IconButton onClick={handleMassiveResolution(resolution)}>
                        <IconList name="box" />
                      </IconButton>
                    </Tooltip>
                  </Access>
                  <Tooltip title={t('common.sendTruck')}>
                    <IconButton
                      onClick={handleSendTruckId(resolution.resolutionId)}
                    >
                      <IconList name="truckDoc" />
                    </IconButton>
                  </Tooltip>
                  <Access roles={[validRoles.operator]}>
                    <Tooltip title={t('accountsReceivable.tooltipOpen')}>
                      <IconButton
                        onClick={() => receivablesContext.setResolutionId(resolution.resolutionId)}
                      >
                        <IconList name="receivables" />
                      </IconButton>
                    </Tooltip>
                  </Access>
                </Box>
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
      <ResolutionSendTruckModal id={truckId} onClose={handleCloseTruckId} />
    </div>
  );
};
export default Resolutions;
