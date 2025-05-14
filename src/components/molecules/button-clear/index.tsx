import { Button } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import styles from './index.module.css';

interface ButtonClearProps {
    onClick: () => void;
    label: string;
    disabled?: boolean;
}

const ButtonClear: React.FC<ButtonClearProps> = ({ onClick, label, disabled }) => {
    return <Button
        variant="contained"
        color="primary"
        startIcon={<ClearIcon />}
        onClick={onClick}
        disabled={disabled}
        className={styles.button}
    >{label}</Button>;
}

export default ButtonClear;