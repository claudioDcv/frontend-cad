import SendIcon from './icons/SendIcon';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SaveIcon from '@mui/icons-material/Save';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import RefreshIcon from '@mui/icons-material/Refresh';
import ExpenditureIcon from './icons/ExpenditureIcon';
import IncomeIcon from './icons/IncomeIcon';
import NoteIcon from './icons/Note';
import MovementIcon from './icons/Movement';
import IncomeMovementIcon from './icons/IncomeMovement';
import BoxIcon from './icons/BoxIcon';
import CIcon from './icons/CIcon';
import InfoIcon from './icons/IIcon';
import { ElementType } from 'react';
import ExpenditureMovementIcon from './icons/ExpenditureMovement';
import Receivable from './icons/Receivable';

interface Props {
  color?: string;
  size?: string | number;
}

// Factory function for MUI icons
const createMuiIcon = (IconComponent: ElementType) => {
  return (props: Props) => (
    <IconComponent sx={{ color: props.color, fontSize: props.size }} />
  );
};

// Factory function for custom icons
const createCustomIcon = (IconComponent: ElementType) => {
  return (props: Props) => (
    <IconComponent
      color={props.color}
      width={props.size || 24}
      height={props.size || 24}
    />
  );
};

export const icons = {
  // Delete icon
  delete: createMuiIcon(DeleteIcon),

  // Send icons
  sent: createMuiIcon(SendIcon),

  // Truck document icons
  truckDoc: createMuiIcon(LocalShippingIcon),

  // Security bag icon
  securityBag: createMuiIcon(VpnKeyIcon),

  // Contract status icons
  contract: createMuiIcon(CheckCircleIcon),

  // Save status icons
  save: createMuiIcon(SaveIcon),

  // Action icons
  visualize: createMuiIcon(VisibilityIcon),
  download: createMuiIcon(DownloadIcon),
  edit: createMuiIcon(EditIcon),
  next: createMuiIcon(ArrowRightAltIcon),
  update: createMuiIcon(RefreshIcon),

  // Note icons
  note: createCustomIcon(NoteIcon),

  // Transaction icons
  expenditure: createCustomIcon(ExpenditureIcon),
  income: createCustomIcon(IncomeIcon),
  movement: createCustomIcon(MovementIcon),
  incomeMovement: createCustomIcon(IncomeMovementIcon),
  expenditureMovement: createCustomIcon(ExpenditureMovementIcon),

  // Aperture icons
  box: createCustomIcon(BoxIcon),

  // Payment status icons
  payment: createCustomIcon(CIcon),

  // Account receivable icons
  info: createCustomIcon(InfoIcon),

  // Receivables icons
  receivables: createCustomIcon(Receivable),
};
