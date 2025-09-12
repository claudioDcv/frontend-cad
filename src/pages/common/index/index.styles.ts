import { SxProps, Theme } from '@mui/material';

const mainBox: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  bgcolor: (theme) => theme.palette.background.default,
};

const paper: SxProps<Theme> = {
  p: 5,
  borderRadius: 3,
  minWidth: 300,
};

const stack: SxProps<Theme> = {
  mt: 3,
};

export default {
  mainBox,
  paper,
  stack,
};
