import { Button } from '@mui/material';
import { Visibility } from '@mui/icons-material';

type Props = {
  contractId: number;
  open: (contractId: number) => void;
  label: string;
};

const ContractDetailButton = ({ contractId, open, label }: Props) => {
  const handleClick = () => {
    open(contractId);
  };

  return (
    <Button endIcon={<Visibility />} onClick={handleClick} size="small">
      {label}
    </Button>
  );
};

export default ContractDetailButton;
