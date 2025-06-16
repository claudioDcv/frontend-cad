import { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { debounce } from 'lodash';

import { useTranslation } from 'react-i18next';
import { Breadcrumb, Pagination, Table } from '../../components';
import routes from '../../conf/routes';
import useGetAllContracts from '../../clients/get-all-contracts';
import { FIRST_PAGE } from '../../utils';

const Contracts = ({ params }: { params: { id: string } }) => {
  const resolutionId = params.id;
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(FIRST_PAGE);

  const getAllContracts = useGetAllContracts();

  const contractRows = getAllContracts.data?.contracts || [];
  const paginationCount = getAllContracts.data?.meta?.count || 0;

  const debouncedFetchContracts = useRef(
    debounce((page: number) => {
      getAllContracts.call({ resolutionId, page });
    }, 1000)
  );

  useEffect(() => {
    const debouncedFetch = debouncedFetchContracts.current;
    return () => {
      debouncedFetch.cancel();
    };
  });

  useEffect(() => {
    debouncedFetchContracts.current(currentPage);
  }, [resolutionId, currentPage]);

  const handleChangePage = () => {
    console.log('handleChangePage', setCurrentPage);
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
        <Box bgcolor="grey.100" p={2}>
          <Typography variant="h6" fontWeight="bold">
            Resolución {resolutionId} - Oro
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
              Dato 1
            </Typography>
            <Typography variant="body2">1</Typography>
          </Box>
          <Box>
            <Typography variant="body2" fontWeight="bold">
              Dato 2
            </Typography>
            <Typography variant="body2">2</Typography>
          </Box>
          <Box>
            <Typography variant="body2" fontWeight="bold">
              Dato 3
            </Typography>
            <Typography variant="body2">3</Typography>
          </Box>
          <Box>
            <Typography variant="body2" fontWeight="bold">
              Dato 4
            </Typography>
            <Typography variant="body2">4</Typography>
          </Box>
          <Box>
            <Typography variant="body2" fontWeight="bold">
              Dato 5
            </Typography>
            <Typography variant="body2">5</Typography>
          </Box>
          <Box>
            <Typography variant="body2" fontWeight="bold">
              Dato 6
            </Typography>
            <Typography variant="body2">6</Typography>
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
