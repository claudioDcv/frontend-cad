import { Button } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { useLocation } from 'wouter';
import useRoutes from '@/conf/routes';

interface Props {
  id: string;
  label: string;
}

const ViewContractsButton = ({ id, label }: Props) => {
  const [, navigate] = useLocation();
  const routes = useRoutes();

  const handleClick = () => {
    navigate(routes.contracts.path(id));
  };

  return (
    <Button
      endIcon={<Visibility />}
      onClick={handleClick}
      size="small"
    >
      {label}
    </Button>
  );
};

export default ViewContractsButton;