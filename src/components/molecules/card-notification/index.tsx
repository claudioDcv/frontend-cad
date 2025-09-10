import { Notification } from '@/entities/Notification.entity';
import { formatDateHour } from '@/utils';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Typography,
} from '@mui/material';
import { cardContainer, headerBox, footerBox } from './index.styles';

// TODO: i18n agregar

interface CardNotificationProps {
  data: Notification;
}

const CardNotification: React.FC<CardNotificationProps> = ({ data }) => {
  return (
    <Card variant="outlined" sx={cardContainer}>
      <CardActions>
        <Box sx={headerBox}>
          <Typography variant="button">{data.type}</Typography>
          <Chip label={formatDateHour(data.timestamp)} size="small" />
        </Box>
      </CardActions>
      <Divider />
      <CardContent>
        <Typography component="span" variant="body2">
          {data.message}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Box sx={footerBox}>
          <Typography variant="caption">por: {data.userName}</Typography>
          <Typography variant="caption">tipo: {data.entity}</Typography>
        </Box>
      </CardActions>
    </Card>
  );
};

export default CardNotification;
