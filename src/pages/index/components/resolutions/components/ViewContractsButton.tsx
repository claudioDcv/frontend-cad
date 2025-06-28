import { Button } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { Link } from 'wouter';
import useRoutes from '@/conf/routes';

interface Props {
  id: string;
  label: string;
}

const ViewContractsButton = ({ id, label }: Props) => {
  const routes = useRoutes();

  return (
    <Link to={routes.contracts.path(id)}>
      <Button endIcon={<Visibility />} size="small">
        {label}
      </Button>
    </Link>
  );
};

export default ViewContractsButton;
