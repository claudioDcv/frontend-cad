import { Button, Chip, Typography } from '@mui/material';
import styles from './index.module.css';
import { I18N, initialStateI18n } from './index.types';

export interface ButtonNotificationProps {
  i18n?: Partial<I18N>;
  count: number;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const ButtonNotification: React.FC<ButtonNotificationProps> = ({
  i18n,
  count,
  onClick,
}) => {
  const lang = i18n ? { ...initialStateI18n, ...i18n } : initialStateI18n;

  return (
    <Button
      variant="outlined"
      onClick={onClick}
      size="small"
      endIcon={
        count > 0 && (
          <Chip
            className={styles.numberChip}
            size="small"
            label={count.toString()}
            color="error"
          />
        )
      }
    >
      <Typography>{lang.label}</Typography>
    </Button>
  );
};

export default ButtonNotification;
