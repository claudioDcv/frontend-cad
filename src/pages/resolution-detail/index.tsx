import { useRef, useState } from 'react';
import { Controller, ControllerRenderProps, useForm } from 'react-hook-form';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Key as IconKey } from '@mui/icons-material';
import { emptyOption, SEARCH_DELAY, STATUS_PRE_RESOLUTION } from '@/constants';
import routes from '../../conf/routes';
import {
  Breadcrumb,
  Table,
  Notification,
  Input,
  DisplayData,
  DropdownController,
  NotificationDrawer,
} from '../../components';
import {
  debounce,
  formatCurrency,
  formatNumberWithGr,
  formatToDDMMYYYY,
  getMaterial,
  getMaterialType,
  getStatusLabel,
  isOnlyNumbersOrEmpty,
} from '../../utils';
import { Option } from '@/entities/Option.entity';
import ModalContractDetail from '../../components/organisms/modal-contract-detail';
import ContractDetailButton from './components/ContractDetailButton';
import { useParams } from 'wouter';
import { Contract } from '@/entities/Contract.entity';
import ModalConfirm from '@/components/organisms/modal-confirm';
import { addOptionAll, isEmpty } from '../index/utils';
import useServices from './hooks/useServices';
import getContractStatusIcons from './components/ContracStatustIcon';

const ResolutionDetail = () => {
  const { id: resolutionId } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const { control, setValue } = useForm<{
    contractNumber: string;
    status: Option;
  }>({
    defaultValues: {
      contractNumber: '',
      status: emptyOption,
    },
  });

  const [contract, setContract] = useState<Contract | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>(emptyOption.value);
  const [showOnlyNotReviewed, setShowOnlyNotReviewed] = useState(false);

  const [successNoteNotification, setSuccessNoteNotification] = useState(false);
  const [successConfirmNotification, setSuccessConfirmNotification] =
    useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const services = useServices(resolutionId);

  const statusOptions = addOptionAll(services.getAllStatus.data);

  const isStatusDisabled = isEmpty(services.getAllStatus.data);

  const filteredContracts = services.getResolutionContracts.data
    .filter((contract) =>
      contract.contractNumber?.toString().includes(searchTerm)
    )
    .filter(
      (contract) =>
        statusFilter === emptyOption.value ||
        contract.statusId === Number(statusFilter)
    )
    .filter((contract) =>
      showOnlyNotReviewed ? !contract.cadMetadata?.reviewed : true
    );

  const materialType = getMaterial(services.getResolution.data?.categoryId);
  const isEditable = contract?.statusId === STATUS_PRE_RESOLUTION;

  const debouncedSearchRef = useRef(
    debounce((contractNumber: string) => {
      setSearchTerm(contractNumber);
    }, SEARCH_DELAY)
  );

  const handleCloseNoteNotification = () => {
    setSuccessNoteNotification(false);
  };
  const handleCloseConfirmNotification = () => {
    setSuccessConfirmNotification(false);
  };

  const handleOpenModal = (contract: Contract) => {
    setContract(contract);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleSuccessConfirm = () => {
    services.patchResolutionResolve.call(services.getResolution.data);
    setOpenConfirm(false);
    setSuccessConfirmNotification(true);
  };

  const handleDocNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const rawValue = event.target.value;

    if (isOnlyNumbersOrEmpty(rawValue)) {
      setValue('contractNumber', rawValue);
      debouncedSearchRef.current(rawValue);
    }
  };

  const handleChangeStatus =
    (
      field: ControllerRenderProps<{ contractNumber: string; status: Option }>
    ) =>
    (selectedOption: Option) => {
      field.onChange(selectedOption);
      setStatusFilter(selectedOption.value);
    };

  const handleShowOnlyNotReviewedChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShowOnlyNotReviewed(event.target.checked);
  };

  const handleSuccess = (contract: Contract) => {
    if (!contract) {
      return;
    }
    services.getResolutionContracts.replaceContract(contract);
    setContract(null);
    setSuccessNoteNotification(true);
  };

  const handleClose = () => {
    setContract(null);
  };

  const isAllContractReviewed = filteredContracts.every(
    (c) => c.cadMetadata?.reviewed
  );

  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Breadcrumb items={[routes.index, routes.resolutionDetail]} />
        <NotificationDrawer />
      </Box>

      <Card>
        <CardHeader
          title={getMaterialType(
            t('common.resolution', { id: resolutionId }),
            services.getResolution.data.categoryId
          )}
          action={
            <>
              <ButtonGroup size="small">
                <Button startIcon={<IconKey />} disabled>
                  {t('common.bag')}
                </Button>
                <Button
                  variant="contained"
                  disabled={!isAllContractReviewed}
                  onClick={handleOpenConfirm}
                >
                  {t('common.sendCAD')}
                </Button>
              </ButtonGroup>
            </>
          }
        />
        <CardContent>
          <Box
            p={2}
            display="grid"
            gridTemplateColumns="repeat(3, 1fr)"
            gap={2}
          >
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
                value={services.getResolution.data?.categoryName}
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
        </CardContent>
      </Card>
      <Divider sx={{ mb: 2 }} />
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
            name="contractNumber"
            control={control}
            render={({ field }) => (
              <Input
                label={t('common.numDoc')}
                value={field.value}
                onChange={handleDocNumberChange}
                sx={{ maxWidth: 250 }}
              />
            )}
          />
          <DropdownController
            onChange={handleChangeStatus}
            disabled={isStatusDisabled}
            options={statusOptions}
            label="common.statusOlimpo"
            name="status"
            control={control}
          />
          <FormControlLabel
            control={
              <Switch
                checked={showOnlyNotReviewed}
                onChange={handleShowOnlyNotReviewedChange}
              />
            }
            label={t('common.onlyNotReviewed')}
          />
        </Box>
        <Table
          columns={[
            {
              id: 'statusIcons',
              label: t('common.status'),
              render: getContractStatusIcons,
            },
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
              id: 'statusId',
              label: t('common.statusOlimpo'),
              field: (f) => getStatusLabel(f as number, statusOptions),
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
        open={!!services.getResolutionContracts.error}
        onClose={services.getResolutionContracts.onResetError}
        severity="error"
        i18n={{
          title: t('common.error'),
          text: t(
            services.getResolutionContracts.error || 'common.unknownError'
          ),
        }}
      />
      <Notification
        open={!!services.getResolution.error}
        onClose={services.getResolution.onResetError}
        severity="error"
        i18n={{
          title: t('notification.error'),
          text: t(services.getResolution.error),
        }}
      />
      <Notification
        open={successNoteNotification}
        onClose={handleCloseNoteNotification}
        severity="success"
        i18n={{
          title: t('notification.success'),
          text: t('notification.updateNote'),
        }}
      />
      <Notification
        open={successConfirmNotification}
        onClose={handleCloseConfirmNotification}
        severity="success"
        i18n={{
          title: t('notification.success'),
          text: t('notification.updateResolve', {
            id: services.getResolution.data.resolutionId,
          }),
        }}
      />
      <ModalConfirm
        open={openConfirm}
        onClose={handleCloseConfirm}
        onSuccess={handleSuccessConfirm}
        i18n={{
          title: t('modalConfirm.ResolveTitle'),
          text: t('modalConfirm.ResolveDescription', {
            id: services.getResolution.data.resolutionId,
          }),
          success: t('common.send'),
        }}
      />
      <ModalContractDetail
        onClose={handleClose}
        onSuccess={handleSuccess}
        material={materialType}
        contract={contract}
        editable={isEditable}
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
