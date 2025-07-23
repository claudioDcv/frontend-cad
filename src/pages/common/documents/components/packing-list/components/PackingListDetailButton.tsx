import { IconButton, Tooltip } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { Link } from 'wouter';
import routes from '@/conf/routes';
import useAccess from '@/components/atoms/access/useAccess';
import { validRoles } from '@/constants';
import { ButtonPackingListProps } from './types';

const PackingListDetailButton = ({
  id,
  label,
  disabled,
}: ButtonPackingListProps) => {
  const access = useAccess();
  const getLink = () => {
    if (access([validRoles.admin])) return '';
    else if (access([validRoles.cordinator]))
      return routes.cordinator.packinglistDetail.path(id);
    return routes.operator.packinglistDetail.path(id);
  };

  return (
    <Link to={getLink()}>
      <Tooltip title={label}>
        <IconButton disabled={disabled}>{<Visibility />}</IconButton>
      </Tooltip>
    </Link>
  );
};

export default PackingListDetailButton;
