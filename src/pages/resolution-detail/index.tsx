import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Box, Card, CardContent, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { materialMap, SEARCH_DELAY } from '@/constants';
import useServices from './hooks/useServices';
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
  getMaterialType,
  isOnlyNumbersOrEmpty,
} from '../../utils';
import { defaultContractsFormValues } from '../index/utils';
import { ContractFormModel } from '../index/types';
import { ResolutionDetailProps } from './types';
import ModalContractDetail from '../../components/organisms/modal-contract-detail';
import useContractDetail from './hooks/useContractDetail';
import ContractDetailButton from './components/ContractDetailButton';

const ResolutionDetail = ({ params }: ResolutionDetailProps) => {
  const { control, setValue } = useForm<ContractFormModel>({
    defaultValues: defaultContractsFormValues,
  });

  const [selectedContractId, setSelectedContractId] = useState<number | null>(
    null
  );
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const resolutionId = params.id;
  const services = useServices(resolutionId);
  const serviceContract = useContractDetail(selectedContractId);
  const { t } = useTranslation();

  const allContracts = services.getAllContracts.contracts || [];

  const filteredContracts = allContracts.filter((contract) =>
    contract.contractNumber?.toString().includes(searchTerm)
  );

  const detailData = serviceContract.getDetailContract.data;

  const categoryId = services.getResolution.data?.categoryId;
  const materialType = materialMap[categoryId] || 'defaultMaterial';

  const contractData = allContracts.find(
    (contract) => contract.contractId === selectedContractId
  );

  const handleOpenModal = (contractId: number) => {
    serviceContract.getDetailContract.call({ contractId });
    setSelectedContractId(contractId);
    setOpenModal(true);
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

  return (
    <div>
      <Breadcrumb items={[routes.index, routes.resolutionDetail]} />
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
                  contractId={row.contractId}
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
        open={!!services.getAllContracts.error}
        onClose={services.getAllContracts.onResetError}
        severity="error"
        i18n={{
          title: t('common.error'),
          text: t(services.getAllContracts.error || 'common.unknownError'),
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
      <ModalContractDetail
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={() => console.log({ selectedContractId })}
        material={materialType}
        data={{
          contractId: selectedContractId,
          jewels: detailData,
        }}
        contractData={{
          weight: contractData?.totalWeight || 0,
          averagePurchaseValue: contractData?.averagePurchaseValue || 0,
          totalContractValue: contractData?.totalContractValue || 0,
          responsibleName: contractData?.responsibleName || '',
          endDate: formatToDDMMYYYY(contractData?.endDate),
          clientName: contractData?.clientName || '',
          clientRut: contractData?.clientRut || '',
        }}
        i18n={{
          label: `${t('common.contractDetail')} ${selectedContractId}`,
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
