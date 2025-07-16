import { IconButton, Tooltip } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { Link } from 'wouter';
import routes from '@/conf/routes';

interface Props {
  id: string;
  label: string;
  disabled?: boolean;
}

const ViewContractsButton = ({ id, label, disabled }: Props) => {
  return (
    <Link to={routes.cordinator.resolutionDetail.path(id)}>
      <Tooltip title={label}>
        <IconButton disabled={disabled}>{<Visibility />}</IconButton>
      </Tooltip>
    </Link>
  );
};

export default ViewContractsButton;
