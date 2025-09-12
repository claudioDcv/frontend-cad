import { SxProps, Theme } from '@mui/material';

const filterContainer: SxProps<Theme> = {
  mb: 2,
  mt: 2,
  flexWrap: 'nowrap',
  display: 'flex',
  alignItems: 'center',
  gap: 2,
};

const paginationBox: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'flex-end',
  mt: 2,
};

const dropdownStatus: SxProps<Theme> = {
  width: '70%',
};

export default {
  filterContainer,
  paginationBox,
  dropdownStatus,
};
