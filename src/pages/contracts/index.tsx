import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import useServices from './hooks/useServices';

import {
  Breadcrumb,
  Pagination,
  Table,
  Notification,
  Input,
} from '../../components';
import { MaterialType } from '../../components/molecules/material-type';
import { Material } from '../../components/molecules/material-type/types';

import routes from '../../conf/routes';

import { ContractFormModel } from '../index/types';
import { Controller, ControllerRenderProps, useForm } from 'react-hook-form';
import { defaultContractsFormValues } from '../index/utils';
import { useRef } from 'react';
import {
  debounce,
  FIRST_PAGE,
  formatCurrency,
  formatNumberWithGr,
  formatToDDMMYYYY,
} from '../../utils';

const Contracts = ({ params }: { params: { id: string } }) => {
  const { control, getValues, setValue } = useForm<ContractFormModel>({
    defaultValues: defaultContractsFormValues,
  });

  const resolutionId = params.id;

  const services = useServices(resolutionId);

  const { t } = useTranslation();

  const contractRows = services.getAllContracts.data?.contracts || [];
  const paginationCount = services.getAllContracts.data?.meta?.count || 0;

  const debouncedSearchRef = useRef(
    debounce((contractNumber: string) => {
      const newFilters = {
        ...getValues(),
        contractNumber: contractNumber,
        resolutionId,
        page: FIRST_PAGE,
      };
      services.getAllContracts.call(newFilters);
    }, 2000)
  );

  const handleContractNumberChange =
    (field: ControllerRenderProps<ContractFormModel>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      field.onChange(value);
      debouncedSearchRef.current(value);
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
          <MaterialType
            material={services.materialValue as Material}
            label={`${t('common.resolution')} ${resolutionId}`}
          />
        </CardContent>
        <Box p={2} display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
          <Box>
            <Typography variant="body2" fontWeight="bold">
              {t('common.code')}:{' '}
              {services.getResolution.data?.resolutionNumber}
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {t('common.dispatchGuide')}:{' '}
              {services.getResolution.data?.dispatchGuide}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" fontWeight="bold">
              {t('common.contractNumberLabel')}:{' '}
              {services.getResolution.data?.contractCount}
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {t('common.type')}: {services.getResolution.data?.categoryName}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" fontWeight="bold">
              {t('common.securityBag')}:{' '}
              {services.getResolution.data?.securityBag}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" fontWeight="bold">
              {t('common.branch')}: {services.getResolution.data?.locationName}
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {t('common.address')}:{' '}
              {services.getResolution.data?.locationAddress}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" fontWeight="bold">
              {t('common.investment')}:{' '}
              {services.getResolution.data?.investmentName}
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {t('common.rut')}: {services.getResolution.data?.investmentRut}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" fontWeight="bold">
              {t('common.closureDate')}:{' '}
              {formatToDDMMYYYY(services.getResolution.data?.closeDate)}
            </Typography>
          </Box>
        </Box>
      </Card>
      <form>
        <Box
          mb={2}
          mt={2}
          flexWrap="nowrap"
          display="flex"
          alignItems="center"
          gap={2}
        ></Box>
        <Box>
          <Controller
            name="contractNumber"
            control={control}
            render={({ field }) => (
              <Input
                label={t('contract.contractNumber')}
                value={field.value ?? ''}
                onChange={handleContractNumberChange(field)}
              />
            )}
          />
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Table
          columns={[
            { id: 'contractNumber', label: t('contract.contractNumber') },
            { id: 'securityBagCode', label: t('contract.securityBagCode') },
            { id: 'jewelQuantity', label: t('contract.jewelQuantity') },
            {
              id: 'totalContractValue',
              label: t('contract.totalContractValue'),
              render: ({ totalContractValue }) =>
                formatCurrency(totalContractValue),
            },
            {
              id: 'averagePurchaseValue',
              label: t('contract.averagePurchaseValue'),
              render: ({ averagePurchaseValue }) =>
                formatCurrency(averagePurchaseValue),
            },
            {
              id: 'totalWeight',
              label: t('contract.totalWeight'),
              render: ({ totalWeight }) => formatNumberWithGr(totalWeight),
            },
            {
              id: 'startDate',
              label: t('contract.startDate'),
              render: ({ startDate }) => formatToDDMMYYYY(startDate),
            },
            {
              id: 'endDate',
              label: t('contract.endDate'),
              render: ({ endDate }) => formatToDDMMYYYY(endDate),
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
          text: services.getAllContracts.error || t('common.unknownError'),
        }}
      />
    </div>
  );
};

export default Contracts;
