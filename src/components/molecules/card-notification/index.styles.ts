import theme from '@/conf/theme';
import { SxProps } from '@mui/material';

export const cardContainer: SxProps = {
  mx: 1,
  mt: 1,
  backgroundColor: theme.palette.grey[100],
};

export const headerBox: SxProps = {
  display: 'flex',
  flexDirection: 'row',
  alignContent: 'center',
  justifyContent: 'space-between',
  width: '100%',
};

export const footerBox: SxProps = {
  display: 'flex',
  flexDirection: 'row',
  alignContent: 'space-around',
  justifyContent: 'space-between',
  width: '100%',
};
