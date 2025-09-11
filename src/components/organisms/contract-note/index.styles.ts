import { BoxProps } from '@mui/material';

const containerStyles: BoxProps['sx'] = {
  p: 2,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  justifyContent: 'flex-end',
};

const actionsBoxStyles: BoxProps['sx'] = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: 1,
};

export default {
  containerStyles,
  actionsBoxStyles,
};
