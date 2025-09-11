import CadIcon from '@/components/atoms/cad-icon';
import { statusToKeyMap } from '@/constants';
import { Chip, Tooltip } from '@mui/material';
import { ResolutionMetadata } from '@/entities/Resolution.entity';

interface I18N {
  sent: string;
}

const initialState18N: I18N = {
  sent: 'Enviado a CAD',
};

interface DocumentStatusProps {
  i18n?: Partial<I18N>;
  statusId: number;
  statusName?: string;
  metadata?: ResolutionMetadata | null;
}

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
