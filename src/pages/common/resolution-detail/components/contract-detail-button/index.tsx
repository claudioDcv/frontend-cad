import { IconButton, Tooltip } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { Contract } from '@/entities/Contract.entity';

type Props = {
  contract: Contract;
  open: (contract: Contract) => void;
  label: string;
};

const ContractDetailButton = ({ contract, open, label }: Props) => {
  const handleClick = () => {
    open(contract);
  };

  return (
    <Tooltip title={label}>
      <IconButton onClick={handleClick}>{<Visibility />}</IconButton>
    </Tooltip>
  );
};

export default ContractDetailButton;
