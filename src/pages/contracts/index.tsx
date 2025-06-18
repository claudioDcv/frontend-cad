import { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { debounce } from 'lodash';
import { useTranslation } from 'react-i18next';

import { Breadcrumb, Pagination, Table } from '../../components';
import { MaterialType } from '../../components/molecules/material-type';
import { Material } from '../../components/molecules/material-type/types';

import useGetAllContracts from '../../clients/get-all-contracts';
import useGetResolution from '../../clients/get-resolution';

import routes from '../../conf/routes';
import { FIRST_PAGE } from '../../utils';
import { getMaterialFromLabel } from './utils';

const Contracts = ({ params }: { params: { id: string } }) => {
  const resolutionId = params.id;
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(FIRST_PAGE);

  const getAllContracts = useGetAllContracts();
  const getResolution = useGetResolution();
  const materialValue = getMaterialFromLabel(getResolution.data?.categoryName);

  const contractRows = getAllContracts.data?.contracts || [];
  const paginationCount = getAllContracts.data?.meta?.count || 0;

  const debouncedFetchContracts = useRef(
    debounce((page: number) => {
      getAllContracts.call({ resolutionId, page });
    }, 1000)
  );

  useEffect(() => {
    if (!resolutionId) return;
    if (getResolution.data) return;

    getResolution.call(resolutionId);
  }, [resolutionId, getResolution]);

  useEffect(() => {
    const debouncedFetch = debouncedFetchContracts.current;
    return () => {
      debouncedFetch.cancel();
    };
  }, []);

  useEffect(() => {
    debouncedFetchContracts.current(currentPage);
  }, [resolutionId, currentPage]);

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value - 1);
    debouncedFetchContracts.current(value - 1);
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
        <Box bgcolor="grey.100" p={2} gap={2} alignItems={'center'} display="flex">
          <MaterialType material={materialValue as Material} />
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
              {t('common.code')}: {getResolution.data?.resolutionNumber}
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
              {t('common.type')}: {getResolution.data?.categoryName}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" fontWeight="bold">
              {t('common.securityBag')}:
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" fontWeight="bold">
              {t('common.branch')}: {getResolution.data?.branchName}
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
              {t('common.closureDate')}: {getResolution.data?.closureDate}
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
          page={currentPage + 1}
          onChange={handleChangePage}
        />
      </Box>
    </div>
  );
};

export default Contracts;
