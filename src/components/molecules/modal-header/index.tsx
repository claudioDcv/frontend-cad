import { DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from './index.module.css';

interface ModalHeaderProps {
    onClose: () => void;
    children?: React.ReactNode;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
    onClose,
    children,
}) => {
    return (
        <DialogTitle>
            <div className={styles.header}>
                <div className={styles.content}>
                    {children}
                </div>
                <IconButton onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </div>
        </DialogTitle>
    );
};

export default ModalHeader;
