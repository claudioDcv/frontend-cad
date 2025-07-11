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

interface CardNotificationProps {
  data: Notification;
}

const CardNotification: React.FC<CardNotificationProps> = ({ data }) => {
  return (
    <Card variant="outlined" sx={{ mx: 1, mt: 1, backgroundColor: '#f5f5f5' }}>
      <CardActions>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'space-around',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Typography variant="caption">por: {data.userName}</Typography>
          <Typography variant="caption">tipo: {data.entity}</Typography>
        </Box>
      </CardActions>
    </Card>
  );
};

export default CardNotification;
