import { SxProps, Theme } from '@mui/material';

const filterBox: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  mb: 2,
};

const paginationBox: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'flex-end',
  mt: 2,
};

export default {
  filterBox,
  paginationBox,
};
