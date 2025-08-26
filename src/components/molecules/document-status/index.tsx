import CadIcon from '@/components/atoms/cad-icon';
import { statusToKeyMap } from '@/constants';
import { Chip, Tooltip } from '@mui/material';
import { DocumentStatusProps, initialState18N } from './index.types';

const DocumentStatus: React.FC<DocumentStatusProps> = ({
  i18n,
  statusId,
  statusName,
  metadata,
}) => {
  const lang = i18n ? { ...initialState18N, ...i18n } : initialState18N;
  const { color } = statusToKeyMap[statusId] || {};
  const extraProps = {
    icon: metadata ? <CadIcon color={color} /> : undefined,
  };
  const text = metadata ? `${lang.sent}` : statusName;
  return (
    <Tooltip title={text} arrow placement="top">
      <Chip
        size="small"
        label={statusName}
        color={color}
        variant="outlined"
        {...extraProps}
      />
    </Tooltip>
  );
};

export default DocumentStatus;
