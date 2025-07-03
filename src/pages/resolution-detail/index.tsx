import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Box, Card, CardContent, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FetchStatus, SEARCH_DELAY } from '@/constants';
import routes from '../../conf/routes';
import {
  Breadcrumb,
  Table,
  Notification,
  Input,
  DisplayData,
} from '../../components';
import {
  debounce,
  formatCurrency,
  formatNumberWithGr,
  formatToDDMMYYYY,
  getMaterial,
  getMaterialType,
  isOnlyNumbersOrEmpty,
} from '../../utils';
import ModalContractDetail from '../../components/organisms/modal-contract-detail';
import ContractDetailButton from './components/ContractDetailButton';
import useGetResolution from '@/clients/get-resolution';
import useGetResolutionContracts from '@/clients/get-resolution-contracts';
import { useParams } from 'wouter';
import { Contract } from '@/entities/Contract.entity';

const ResolutionDetail = () => {
  const { id: resolutionId } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const { control, setValue } = useForm<{
    contractNumber: string;
  }>({
    defaultValues: {
      contractNumber: '',
    },
  });

  const [contract, setContract] = useState<Contract | null>(null);

  const [searchTerm, setSearchTerm] = useState('');

  const getResolution = useGetResolution();
  const getResolutionContracts = useGetResolutionContracts();

  useEffect(() => {
    if (
      resolutionId &&
      getResolution.status === FetchStatus.IDLE &&
      getResolutionContracts.status === FetchStatus.IDLE
    ) {
      getResolution.call(resolutionId);
      getResolutionContracts.call(resolutionId);
    }
  }, [resolutionId, getResolution, getResolutionContracts]);

  const filteredContracts = getResolutionContracts.data.filter((contract) =>
    contract.contractNumber?.toString().includes(searchTerm)
  );

  const materialType = getMaterial(getResolution.data?.categoryId);

  const handleOpenModal = (contract: Contract) => {
    setContract(contract);
  };

  const debouncedSearchRef = useRef(
    debounce((contractNumber: string) => {
      setSearchTerm(contractNumber);
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

  const handleSuccess = () => {};

  const handleClose = () => {
    setContract(null);
  };

  return (
    <div>
      <Breadcrumb items={[routes.index, routes.resolutionDetail]} />
      <Card>
        <CardContent>
          {getMaterialType(
            t('common.resolution', { id: resolutionId }),
            getResolution.data.categoryId
          )}
        </CardContent>
        <Box p={2} display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
          <Box>
            <DisplayData
              label={t('common.code')}
              value={getResolution.data?.resolutionNumber}
            />
            <DisplayData
              label={t('common.dispatchGuide')}
              value={getResolution.data?.dispatchGuide}
            />
          </Box>
          <Box>
            <DisplayData
              label={t('common.contractNumberLabel')}
              value={getResolution.data?.contractCount}
            />
            <DisplayData
              label={t('common.type')}
              value={getResolution.data?.resolutionNumber}
            />
          </Box>
          <Box>
            <DisplayData
              label={t('common.securityBag')}
              value={getResolution.data?.securityBag}
            />
          </Box>
          <Box>
            <DisplayData
              label={t('common.branch')}
              value={getResolution.data?.locationName}
            />
            <DisplayData
              label={t('common.address')}
              value={getResolution.data?.locationAddress}
            />
          </Box>
          <Box>
            <DisplayData
              label={t('common.investment')}
              value={getResolution.data?.investmentName}
            />
            <DisplayData
              label={t('common.rut')}
              value={getResolution.data?.investmentRut}
            />
          </Box>
          <Box>
            <DisplayData
              label={t('common.closureDate')}
              value={formatToDDMMYYYY(getResolution.data?.closeDate)}
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
              field: (f) => formatNumberWithGr(f as number),
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
            {
              id: 'actions',
              label: t('common.actions'),
              render: (row) => (
                <ContractDetailButton
                  contract={row}
                  open={handleOpenModal}
                  label={t('common.viewContracts')}
                />
              ),
            },
          ]}
          rows={filteredContracts}
          messageVoidData={t('common.noData')}
          size="small"
        />
      </form>
      <Notification
        open={!!getResolutionContracts.error}
        onClose={getResolutionContracts.onResetError}
        severity="error"
        i18n={{
          title: t('common.error'),
          text: t(getResolutionContracts.error || 'common.unknownError'),
        }}
      />
      <Notification
        open={!!getResolution.error}
        onClose={getResolution.onResetError}
        severity="error"
        i18n={{
          title: t('common.error'),
          text: t(getResolution.error),
        }}
      />
      <ModalContractDetail
        onClose={handleClose}
        onSuccess={handleSuccess}
        material={materialType}
        contract={contract}
        i18n={{
          label: `${t('common.contractDetail')} ${contract?.contractNumber}`,
          success: t('common.save'),
          cancel: t('common.cancel'),
          checkboxLabel: t('common.markAsReviewed'),
          weight: t('common.contractWeight'),
          totalContractValue: t('common.totalContractValue'),
          averagePurchaseValue: t('common.averagePurchaseValue'),
          responsible: t('common.responsible'),
          expiration: t('common.expiration'),
          client: t('common.client'),
          clientRut: t('common.rut'),
        }}
      />
    </div>
  );
};

export default ResolutionDetail;
