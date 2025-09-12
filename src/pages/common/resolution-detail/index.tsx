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
  Tooltip,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  emptyOption,
  FetchStatus,
  SEARCH_DELAY,
  validRoles,
} from '@/constants';
import {
  debounce,
  formatCurrency,
  formatNumberWithGr,
  formatToDDMMYYYY,
  getIsEditable,
  getMaterial,
  getMaterialType,
  getStatusLabel,
  isOnlyNumbersOrEmpty,
} from '../../../utils';
import { Option } from '@/entities/Option.entity';
import { useParams } from 'wouter';
import { Contract } from '@/entities/Contract.entity';
import useServices from './hooks/useServices';
import ContractDetailButton from './components/contract-detail-button';
import getContractStatusIcons from './components/contract-status-icon';
import { Key as IconKey } from '@mui/icons-material';
import {
  DisplayData,
  DropdownController,
  IconList,
  Input,
  ModalConfirm,
  ModalContractDetail,
  Notification,
  Table,
  TripleToggleSwitch,
} from '@/components';
import { addOptionAll, isEmpty } from '../documents/utils';
import Access from '@/components/atoms/access';
import { useReceivablesContext } from '@/modules/receivables/context/useReceivablesContext';
import { useMassiveResolutionContext } from '@/modules/massive-resolution/context/useMassiveResolutionContext';
import useAccess from '@/components/atoms/access/useAccess';
import tsStyles from './index.styles';

const ResolutionDetail = () => {
  const { id: resolutionId } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const access = useAccess();

  const { control, setValue } = useForm<{
    contractNumber: string;
    status: Option;
  }>({
    defaultValues: {
      contractNumber: '',
      status: emptyOption,
    },
  });

  const receivablesContext = useReceivablesContext();
  const massiveResolutionContext = useMassiveResolutionContext();

  const [contract, setContract] = useState<Contract | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>(emptyOption.value);
  const [showOnlyNotReviewed, setShowOnlyNotReviewed] = useState<0 | 1 | 2>(0);

  const [successNoteNotification, setSuccessNoteNotification] = useState(false);
  const [successConfirmNotification, setSuccessConfirmNotification] =
    useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const services = useServices(resolutionId);

  const statusOptions = addOptionAll(services.getAllStatus.data);

  const isStatusDisabled = isEmpty(services.getAllStatus.data);

  const getFilteredContracts = () => {
    const model = services.getResolutionContracts.data;
    // Aplicar filtro de búsqueda
    const filtered = model.filter((contract) =>
      contract.contractNumber?.toString().includes(searchTerm)
    );
    // Aplicar filtro de estado
    const filteredByStatus = filtered.filter(
      (contract) =>
        statusFilter === emptyOption.value ||
        contract.statusId === Number(statusFilter)
    );
    // 0 all, 1 not reviewed, 2 reviewed
    return filteredByStatus.filter((contract) => {
      if (showOnlyNotReviewed === 0) return true; // All
      if (showOnlyNotReviewed === 1) return !contract.metadata?.reviewed; // Not reviewed
      if (showOnlyNotReviewed === 2) return contract.metadata?.reviewed; // Reviewed
      return true;
    });
  };

  const materialType = getMaterial(
    String(services.getResolution.data?.categoryId)
  );
  const isEditable = getIsEditable(services.getResolution.data, access);

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

  const isAllContractReviewed =
    services.getResolutionContracts.data.length > 0 &&
    services.getResolutionContracts.data.every((c) => c.metadata?.reviewed);

  const hasMetadata = services.getResolution.data.hasMetadata;
  const hasContracts = services.getResolutionContracts.data.length > 0;

  const filteredStatusOptions = statusOptions.filter(
    (option) => option.value === emptyOption.value
  );

  return (
    <div>
      <Card variant="outlined" sx={tsStyles.card}>
        <CardHeader
          title={getMaterialType(
            t('common.resolution', { id: resolutionId }),
            String(services.getResolution.data.categoryId)
          )}
          action={
            <ButtonGroup size="small">
              <Button startIcon={<IconKey />} disabled>
                {t('common.bag')}
              </Button>
              <Access roles={[validRoles.cordinator]}>
                <Tooltip
                  title={
                    !hasContracts
                      ? t('resolutionDetail.noContracts')
                      : !isAllContractReviewed
                      ? t('resolutionDetail.allContractsMustBeReviewed')
                      : hasMetadata
                      ? t('resolutionDetail.hasMetadataAlready')
                      : ''
                  }
                >
                  <span>
                    <Button
                      variant="contained"
                      disabled={
                        !hasContracts ||
                        !isAllContractReviewed ||
                        hasMetadata ||
                        services.patchResolutionResolve.status ===
                          FetchStatus.LOADING ||
                        services.patchResolutionResolve.status ===
                          FetchStatus.SUCCESS
                      }
                      onClick={handleOpenConfirm}
                    >
                      {t('common.sendCAD')}
                    </Button>
                  </span>
                </Tooltip>
              </Access>
              <Access roles={[validRoles.operator]}>
                <Tooltip title={t('common.massUpload')}>
                  <Button
                    startIcon={<IconList name="box" />}
                    onClick={() =>
                      massiveResolutionContext.setResolutionId(resolutionId)
                    }
                  >
                    {t('massUpload.open')}
                  </Button>
                </Tooltip>
              </Access>
              <Access roles={[validRoles.operator]}>
                <Tooltip title={t('accountsReceivable.tooltipOpen')}>
                  <Button
                    startIcon={<IconList name="receivables" />}
                    onClick={() =>
                      receivablesContext.setResolutionId(resolutionId)
                    }
                  >
                    {t('accountsReceivable.open')}
                  </Button>
                </Tooltip>
              </Access>
            </ButtonGroup>
          }
        />
        <Divider />
        <CardContent>
          <Box sx={tsStyles.cardContentBox}>
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
      <form>
        <Box sx={tsStyles.filterBox}>
          <Controller
            name="contractNumber"
            control={control}
            render={({ field }) => (
              <Input
                label={t('common.numDoc')}
                value={field.value}
                onChange={handleDocNumberChange}
                sx={tsStyles.input}
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
          <TripleToggleSwitch
            value={showOnlyNotReviewed}
            options={[
              { value: 0, label: t('common.all') },
              { value: 1, label: t('common.notReviewed') },
              { value: 2, label: t('common.reviewedPlural') },
            ]}
            onChange={(value) => setShowOnlyNotReviewed(value as 0 | 1 | 2)}
          />
          {/*
          <p>
            Contratos pendientes
            <meter
              min={0}
              max={services.getResolutionContracts.data.length}
              value={
                services.getResolutionContracts.data.filter((e) => e.metadata)
                  .length
              }
            >
              {
                services.getResolutionContracts.data.filter((e) => e.metadata)
                  .length
              }
            </meter>
          </p>
          */}
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
              field: formatCurrency,
            },
            {
              id: 'totalWeight',
              label: t('contract.totalWeight'),
              field: formatNumberWithGr,
            },
            {
              id: 'startDate',
              label: t('contract.startDate'),
              field: formatToDDMMYYYY,
            },
            {
              id: 'endDate',
              label: t('contract.endDate'),
              field: formatToDDMMYYYY,
            },
            {
              id: 'statusId',
              label: t('common.statusOlimpo'),
              field: (f) => getStatusLabel(f, filteredStatusOptions),
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
          rows={getFilteredContracts()}
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
          title: t('modalConfirm.confirmationTitle'),
          text: t('modalConfirm.resolveDescription', {
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
        }}
      />
    </div>
  );
};

export default ResolutionDetail;
