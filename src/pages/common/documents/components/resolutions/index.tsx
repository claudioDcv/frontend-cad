import { useEffect, useRef, useState } from 'react';
import { Controller, ControllerRenderProps, useForm } from 'react-hook-form';
import { Box } from '@mui/material';
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
  isOnlyNumbersOrEmpty,
  toDay,
} from '@/utils';
import { Option } from '@/entities/Option.entity';
import {
  ButtonClear,
  DropdownController,
  MonthRangePicker,
  Pagination,
  Input,
} from '@components/index';
import useServices from './hooks/useServices';
import {
  addOptionAll,
  defaultResolutionsFormValues,
  isEmpty,
} from '../../utils';
import { Resolution } from '@/entities/Resolution.entity';
import { ResolutionFormModel } from '../../types';
import { useMassiveResolutionContext } from '@/modules/massive-resolution/context/useMassiveResolutionContext';
import useAccess from '@/components/atoms/access/useAccess';
import ResolutionSendTruckModal from './components/ResolutionSendTruckModal';
import ResolutionTable from './components/ResolutionTable';

const Resolutions = () => {
  const access = useAccess();
  const { t } = useTranslation();
  const massiveResolutionContext = useMassiveResolutionContext();
  const [hasMetadata, setHasMetadata] = useState(true);

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

  useEffect(() => {
    setHasMetadata(access([validRoles.operator]));
  }, [hasMetadata, access]);

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
    const initial = { ...defaultResolutionsFormValues(), hasMetadata };
    reset(initial);
    setRange([defaultStartDate, toDay()]);
    services.getAllResolutions.call(initial);
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

  const handleChangeStatus =
    (field: ControllerRenderProps<ResolutionFormModel>) => (value: Option) => {
      field.onChange(value);
      const newFilters = { ...getValues(), status: value, page: FIRST_PAGE };
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
        <ResolutionTable
          resolutions={resolutions}
          onMassiveResolution={handleMassiveResolution}
          onSendTruckId={handleSendTruckId}
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
