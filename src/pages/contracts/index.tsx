import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import useServices from './hooks/useServices';

import { Breadcrumb, Pagination, Table } from '../../components';
import { MaterialType } from '../../components/molecules/material-type';
import { Material } from '../../components/molecules/material-type/types';

import routes from '../../conf/routes';

import { ContractFormModel } from '../index/types';
import { useForm } from 'react-hook-form';
import { defaultContractsFormValues } from '../index/utils';

const Contracts = ({ params }: { params: { id: string } }) => {
  const { getValues, setValue } = useForm<ContractFormModel>({
    defaultValues: defaultContractsFormValues,
  });
  const resolutionId = params.id;

  const services = useServices(resolutionId);

  const { t } = useTranslation();

  const contractRows = services.getAllContracts.data?.contracts || [];
  const paginationCount = services.getAllContracts.data?.meta?.count || 0;

  const handleChangePage = (_p: unknown, page: number) => {
    const newFilters = { ...getValues(), page };
    setValue('page', page);
    services.getAllContracts.call(newFilters);
  };

  return (
    <div>
      <Breadcrumb items={[routes().index, routes().contracts]} />
      <Box
        mb={3}
        border={1}
        borderColor="#000"
        borderRadius={1}
        overflow="hidden"
      >
        <Box
          bgcolor="grey.100"
          p={2}
          gap={2}
          alignItems={'center'}
          display="flex"
        >
          <MaterialType material={services.materialValue as Material} />
          <Typography variant="h6" fontWeight="bold">
            {t('common.resolution')} {resolutionId}
          </Typography>
        </Box>
        <Box
          bgcolor="white"
          p={2}
          display="grid"
          gridTemplateColumns="repeat(3, 1fr)"
          gap={2}
        >
          <Box>
            <Typography variant="body2" fontWeight="bold">
              {t('common.code')}:{' '}
              {services.getResolution.data?.resolutionNumber}
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {t('common.dispatchGuide')}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" fontWeight="bold">
              {t('common.contractNumberLabel')}:
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {t('common.type')}: {services.getResolution.data?.categoryName}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" fontWeight="bold">
              {t('common.securityBag')}:
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" fontWeight="bold">
              {t('common.branch')}: {services.getResolution.data?.branchName}
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {t('common.address')}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" fontWeight="bold">
              {t('common.investment')}
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {t('common.rut')}:
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" fontWeight="bold">
              {t('common.closureDate')}:{' '}
              {services.getResolution.data?.closureDate}
            </Typography>
          </Box>
        </Box>
      </Box>
      <form>
        <Box
          mb={2}
          mt={2}
          flexWrap="nowrap"
          display="flex"
          alignItems="center"
          gap={2}
        ></Box>
        <Box sx={{ mb: 2, mt: 2, display: 'flex', alignItems: 'center' }}>
          <Typography>{t('common.contracts')}</Typography>
        </Box>
        <Table
          columns={[
            { id: 'contractNumber', label: t('contract.contractNumber') },
            { id: 'securityBagCode', label: t('contract.securityBagCode') },
            { id: 'jewelQuantity', label: t('contract.jewelQuantity') },
            {
              id: 'totalContractValue',
              label: t('contract.totalContractValue'),
            },
            {
              id: 'averagePurchaseValue',
              label: t('contract.averagePurchaseValue'),
            },
            { id: 'totalWeight', label: t('contract.totalWeight') },
            { id: 'startDate', label: t('contract.startDate') },
            { id: 'endDate', label: t('contract.endDate') },
            { id: 'responsibleName', label: t('contract.responsibleName') },
            { id: 'clientName', label: t('contract.clientName') },
            { id: 'clientRut', label: t('contract.clientRut') },
          ]}
          rows={contractRows}
          messageVoidData={t('common.noData')}
        />
      </form>
      <Box>
        <Pagination
          count={paginationCount}
          page={getValues().page}
          onChange={handleChangePage}
        />
      </Box>
    </div>
  );
};

export default Contracts;
