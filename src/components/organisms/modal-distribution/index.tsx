import { useState } from 'react';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { Box, Dialog, DialogContent, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ModalHeader from '@/components/molecules/modal-header';
import DropdownController from '../dropdown-controller';
import type { Option } from '@/entities/Option.entity';
import Input from '@/components/molecules/input';
import DistributionTable from './components/distribution-editable-table';
import ModalActions from '@/components/molecules/modal-actions';
import ModalConfirm from '../modal-confirm';
import { custodyDistribution, distributionRows, families } from './index.utils';
import tsStyles from './index.styles';

interface DistributionModalProps {
  open: boolean;
  onClose: () => void;
}

interface DistributionForm {
  custody: string;
  familyInventory: string;
}

const DistributionModal: React.FC<DistributionModalProps> = ({
  open,
  onClose,
}) => {
  const { t } = useTranslation();
  const { control, watch, reset, setValue } = useForm<DistributionForm>({
    defaultValues: { custody: '', familyInventory: '' },
  });

  const selectedCustody = watch('custody');
  const [dispatchGuide, setDispatchGuide] = useState('');
  const [rows, setRows] = useState(distributionRows);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleCustodyChange =
    (field: ControllerRenderProps<DistributionForm, 'custody'>) =>
    (option: Option) => {
      field.onChange(option.value);
      if (option.value !== 'cdp') setValue('familyInventory', '');
    };

  const handleFamilyInventoryChange =
    (field: ControllerRenderProps<DistributionForm, 'familyInventory'>) =>
    (option: Option) => {
      field.onChange(option.value);
    };

  const handleDispatchGuideChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDispatchGuide(e.target.value);
  };

  const handleTableChange = (id: number, value: string) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, value } : row))
    );
  };

  const handleOpenConfirm = () => setConfirmOpen(true);
  const handleCloseConfirm = () => setConfirmOpen(false);

  const handleClose = () => {
    reset({ custody: '', familyInventory: '' });
    setDispatchGuide('');
    setRows(distributionRows);
    onClose();
  };

  const handleConfirm = () => {
    console.log('Enviando al inventario:', {
      custody: watch('custody'),
      familyInventory: watch('familyInventory'),
      rows,
      dispatchGuide,
    });
    handleCloseConfirm();
    handleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <ModalHeader
          title={t('modalDistribution.table.title')}
          onClose={handleClose}
        />
        <DialogContent sx={tsStyles.dialogContent}>
          <Box sx={tsStyles.filterContainer}>
            <DropdownController
              control={control}
              name="custody"
              label={t('modalDistribution.input.custody')}
              options={custodyDistribution}
              disabled={false}
              onChange={handleCustodyChange}
            />
            {selectedCustody === 'cdp' && (
              <DropdownController
                control={control}
                name="familyInventory"
                label={t('modalDistribution.dropdownLabel')}
                options={families}
                disabled={false}
                onChange={handleFamilyInventoryChange}
              />
            )}
          </Box>
          <Divider />
          <DistributionTable rows={rows} onChange={handleTableChange} />
          <Divider />
          <Input
            label={t('modalDistribution.input.dispatchGuide')}
            value={dispatchGuide}
            onChange={handleDispatchGuideChange}
            sx={tsStyles.dispatchGuideInput}
          />
        </DialogContent>
        <ModalActions
          onClose={handleClose}
          loading={false}
          onSuccess={handleOpenConfirm}
        />
      </Dialog>

      <ModalConfirm
        open={confirmOpen}
        onClose={handleCloseConfirm}
        onSuccess={handleConfirm}
        i18n={{
          title: t('modalDistribution.confirm.title'),
          text: t('modalDistribution.confirm.text'),
          success: t('modalDistribution.confirm.success'),
          cancel: t('modalDistribution.confirm.cancel'),
        }}
      />
    </>
  );
};

export default DistributionModal;
