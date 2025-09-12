import { SxProps, Theme } from '@mui/material';

const boxStyles: SxProps<Theme> = {
  mt: 1,
};

const childrenBoxStyles: SxProps<Theme> = {
  display: 'flex',
  gap: 2,
  mt: 2,
  mb: 2,
};

export default {
  boxStyles,
  childrenBoxStyles,
};
