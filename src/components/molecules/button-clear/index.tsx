import { IconButton, Tooltip } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

interface ButtonClearProps {
  onClick: () => void;
  label?: string;
  disabled?: boolean;
}

const ButtonClear: React.FC<ButtonClearProps> = ({
  onClick,
  label,
  disabled,
}) => {
  return (
    <Tooltip title={label}>
      <IconButton onClick={onClick} disabled={disabled}>
        {<ClearIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ButtonClear;
