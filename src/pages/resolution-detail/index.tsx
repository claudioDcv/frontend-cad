import { Box, Card, CardContent, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

import useServices from './hooks/useServices';

import {
  Breadcrumb,
  Pagination,
  Table,
  Notification,
  Input,
  DisplayData,
} from '../../components';

import routes from '../../conf/routes';

import { Controller, useForm } from 'react-hook-form';
import { defaultContractsFormValues } from '../index/utils';
import { useRef } from 'react';
import {
  debounce,
  FIRST_PAGE,
  formatCurrency,
  formatNumberWithGr,
  formatToDDMMYYYY,
  getMaterialType,
  isOnlyNumbersOrEmpty,
  SEARCH_DELAY,
} from '../../utils';
import { ResolutionDetailProps } from './types';
import { ContractFormModel } from '../index/types';

const ResolutionDetail = ({ params }: ResolutionDetailProps) => {
  const { control, getValues, setValue } = useForm<ContractFormModel>({
    defaultValues: defaultContractsFormValues,
  });

  const { id: resolutionId } = params;

  const services = useServices(resolutionId);

  const { t } = useTranslation();

  const contractRows = services.getAllContracts.data.contracts;
  const paginationCount = services.getAllContracts.data.meta.count;

  const debouncedSearchRef = useRef(
    debounce((contractNumber: string) => {
      const newFilters = {
        ...getValues(),
        contractNumber: contractNumber,
        resolutionId,
        page: FIRST_PAGE,
      };
      services.getAllContracts.call(newFilters);
    }, SEARCH_DELAY)
  );

  const handleDocNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const rawValue = event.target.value;

    if (isOnlyNumbersOrEmpty(rawValue)) {
      setValue('contractNumber', rawValue);
      debouncedSearchRef.current(rawValue);
    }
  };

  const handleChangePage = (_p: unknown, page: number) => {
    const newFilters = { ...getValues(), page, resolutionId };
    setValue('page', page);
    services.getAllContracts.call(newFilters);
  };

  return (
    <div>
      <Breadcrumb items={[routes().index, routes().contracts]} />
      <Card>
        <CardContent>
          {getMaterialType(
            t('common.resolution', { id: resolutionId }),
            services.getResolution.data.categoryId
          )}
        </CardContent>
        <Box p={2} display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
          <Box>
            <DisplayData
              label={t('common.code')}
              value={services.getResolution.data?.resolutionNumber}
            />
            <DisplayData
              label={t('common.dispatchGuide')}
              value={services.getResolution.data?.dispatchGuide}
            />
          </Box>
          <Box>
            <DisplayData
              label={t('common.contractNumberLabel')}
              value={services.getResolution.data?.contractCount}
            />
            <DisplayData
              label={t('common.type')}
              value={services.getResolution.data?.resolutionNumber}
            />
          </Box>
          <Box>
            <DisplayData
              label={t('common.securityBag')}
              value={services.getResolution.data?.securityBag}
            />
          </Box>
          <Box>
            <DisplayData
              label={t('common.branch')}
              value={services.getResolution.data?.locationName}
            />
            <DisplayData
              label={t('common.address')}
              value={services.getResolution.data?.locationAddress}
            />
          </Box>
          <Box>
            <DisplayData
              label={t('common.investment')}
              value={services.getResolution.data?.investmentName}
            />
            <DisplayData
              label={t('common.rut')}
              value={services.getResolution.data?.investmentRut}
            />
          </Box>
          <Box>
            <DisplayData
              label={t('common.closureDate')}
              value={formatToDDMMYYYY(services.getResolution.data?.closeDate)}
            />
          </Box>
        </Box>
      </Card>
      <Divider sx={{ mb: 2 }} />
      <form>
        <Box>
          <Controller
            name="contractNumber"
            control={control}
            render={({ field }) => (
              <Input
                label={t('common.numDoc')}
                value={field.value}
                onChange={handleDocNumberChange}
              />
            )}
          />
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Table
          columns={[
            { id: 'contractNumber', label: t('common.numDoc') },
            { id: 'securityBagCode', label: t('contract.securityBagCode') },
            { id: 'jewelQuantity', label: t('contract.jewelQuantity') },
            {
              id: 'totalContractValue',
              label: t('contract.totalContractValue'),
              field: (f) => formatCurrency(f as number),
            },
            {
              id: 'averagePurchaseValue',
              label: t('contract.averagePurchaseValue'),
              field: (f) => formatCurrency(f as number),
            },
            {
              id: 'totalWeight',
              label: t('contract.totalWeight'),
              field: (f) => formatNumberWithGr(f),
            },
            {
              id: 'startDate',
              label: t('contract.startDate'),
              field: (f) => formatToDDMMYYYY(f as string),
            },
            {
              id: 'endDate',
              label: t('contract.endDate'),
              field: (f) => formatToDDMMYYYY(f as string),
            },
          ]}
          rows={contractRows}
          messageVoidData={t('common.noData')}
          size="small"
        />
      </form>
      <Box>
        <Pagination
          count={paginationCount}
          page={getValues().page}
          onChange={handleChangePage}
        />
      </Box>
      <Notification
        open={!!services.getAllContracts.error}
        onClose={services.getAllContracts.onResetError}
        severity="error"
        i18n={{
          title: t('common.error'),
          text: t(services.getAllContracts.error),
        }}
      />
      <Notification
        open={!!services.getResolution.error}
        onClose={services.getResolution.onResetError}
        severity="error"
        i18n={{
          title: t('common.error'),
          text: t(services.getResolution.error),
        }}
      />
    </div>
  );
};

export default ResolutionDetail;
