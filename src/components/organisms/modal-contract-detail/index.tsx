import { Dialog, DialogContent } from '@mui/material';
import { MaterialType } from '../../molecules/material-type';
import Table from '../../organisms/table';
import { initialStateI18n, ModalContractDetailProps } from './index.type';
import { columns } from './index.utils';
import ModalHeader from '../../molecules/modal-header';
import { Jewel } from '../../../types';
import ModalActions from '../../molecules/modal-actions';

const ModalContractDetail: React.FC<ModalContractDetailProps> = ({
  open,
  onClose,
  onSuccess,
  material,
  data,
  checked,
  i18n,
}) => {
  const lang = i18n ? { ...initialStateI18n, ...i18n } : initialStateI18n;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <ModalHeader onClose={onClose}>
        <MaterialType size="medium" material={material} label={lang.label} />
      </ModalHeader>
      <DialogContent>
        <Table<Jewel> columns={columns} rows={data.jewels} />
      </DialogContent>
      <ModalActions
        i18n={lang}
        onClose={onClose}
        onSuccess={onSuccess}
        showCheckbox
        checked={checked}
      />
    </Dialog>
  );
};

export default ModalContractDetail;
