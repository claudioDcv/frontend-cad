import { Box, DialogTitle, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from './index.module.css';
interface ModalHeaderProps {
    onClose: () => void;
    children?: React.ReactNode;
    title?: string;
    icon?: React.ReactNode;
    actions?: React.ReactNode;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
    onClose,
    children,
    title,
    icon,
    actions,
}) => {
    return (
        <DialogTitle component={Box}>
            <div className={styles.header}>
                <div className={styles.content}>
                    {icon && icon}
                    {title && <Typography variant="h6">{title}</Typography>}
                    {children}
                </div>
                <div className={styles.actions}>
                    {actions}
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </div>
            </div>
        </DialogTitle>
    );
};

export default ModalHeader;
