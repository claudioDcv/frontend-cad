import { useRef, useState } from 'react';
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

import { ContractFormModel } from '../index/types';
import { Controller, ControllerRenderProps, useForm } from 'react-hook-form';
import { defaultContractsFormValues } from '../index/utils';
import {
  debounce,
  FIRST_PAGE_MANUAL,
  formatCurrency,
  formatNumberWithGr,
  formatToDDMMYYYY,
  getMaterialType,
  isOnlyNumbersOrEmpty,
  ITEMS_PER_PAGE,
  materialMap,
  SEARCH_DELAY,
} from '../../utils';
import { ContractsProps } from './types';
import ModalContractDetail from '../../components/organisms/modal-contract-detail';
import useContractDetail from './hooks/useContractDetail';
import ContractDetailButton from './components/ContractDetailButton';

const Contracts = ({ params }: ContractsProps) => {
  const { control } = useForm<ContractFormModel>({
    defaultValues: defaultContractsFormValues,
  });

  const [selectedContractId, setSelectedContractId] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(FIRST_PAGE_MANUAL);
  const [searchTerm, setSearchTerm] = useState('');

  const resolutionId = params.id;
  const services = useServices(resolutionId);
  const getDetailContract = useContractDetail(selectedContractId);
  const { t } = useTranslation();
  
  const allContracts = services.getAllContracts.contracts || [];

  const filteredContracts = allContracts.filter((contract) =>
    contract.contractNumber?.toString().includes(searchTerm)
  );

  const paginatedContracts = filteredContracts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredContracts.length / ITEMS_PER_PAGE);

  const detailData = getDetailContract.getDetailContract.data || [];

  const categoryId = services.getResolution.data?.categoryId || '';
  const materialType = materialMap[categoryId] || 'defaultMaterial';

  const handleOpenModal = (contractId: number) => {
    getDetailContract.getDetailContract.call({ contractId });
    setSelectedContractId(contractId);
    setOpenModal(true);
  };

  const debouncedSearchRef = useRef(
    debounce((contractNumber: string) => {
      setSearchTerm(contractNumber);
      setCurrentPage(FIRST_PAGE_MANUAL);
    }, SEARCH_DELAY)
  );

  const handleContractNumberChange =
    (field: ControllerRenderProps<ContractFormModel>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = event.target.value;
      if (isOnlyNumbersOrEmpty(rawValue)) {
        field.onChange(rawValue);
        debouncedSearchRef.current(rawValue);
      }
    };

  const handleChangePage = (_: unknown, page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Breadcrumb items={[routes().index, routes().contracts]} />
      <Card>
        <CardContent>
          {getMaterialType(
            `${t('common.resolution')} ${resolutionId}`,
            services.getResolution.data?.categoryId || ''
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
                value={field.value ?? ''}
                onChange={handleContractNumberChange(field)}
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
              render: ({ totalContractValue }) => formatCurrency(totalContractValue),
            },
            {
              id: 'averagePurchaseValue',
              label: t('contract.averagePurchaseValue'),
              render: ({ averagePurchaseValue }) => formatCurrency(averagePurchaseValue),
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
            {
              id: 'actions',
              label: t('common.actions'),
              render: (row) => (
                <ContractDetailButton
                  contractId={row.contractId}
                  open={handleOpenModal}
                  label={t('common.viewContracts')}
                />
              ),
            },
          ]}
          rows={paginatedContracts}
          messageVoidData={t('common.noData')}
          size="small"
        />
      </form>
      {totalPages > 1 && (
        <Box>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChangePage}
          />
        </Box>
      )}

      <Notification
        open={!!services.getAllContracts.error}
        onClose={services.getAllContracts.onResetError}
        severity="error"
        i18n={{
          title: t('common.error'),
          text: services.getAllContracts.error || t('common.unknownError'),
        }}
      />
      <ModalContractDetail
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={() => console.log({ selectedContractId })}
        material={materialType}
        data={{
          id: selectedContractId?.toString() || 'default-id',
          jewels: detailData,
        }}
        i18n={{
          label: `${t('common.contractDetail')} ${selectedContractId}`,
        }}
      />
    </div>
  );
};

export default Contracts;
