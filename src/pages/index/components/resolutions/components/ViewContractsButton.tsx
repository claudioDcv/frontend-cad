import { Button } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { Link } from 'wouter';
import routes from '@/conf/routes';

interface Props {
  id: string;
  label: string;
}

const ViewContractsButton = ({ id, label }: Props) => {
  return (
    <Link to={routes.resolutionDetail.path(id)}>
      <Button endIcon={<Visibility />} size="small">
        {label}
      </Button>
    </Link>
  );
};

export default ViewContractsButton;
