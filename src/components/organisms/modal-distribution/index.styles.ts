import { SxProps, Theme } from '@mui/material';

const dialogContent: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

const filterContainer: SxProps<Theme> = {
  mt: 2,
  flexWrap: 'nowrap',
  display: 'flex',
  alignItems: 'center',
  gap: 2,
};

const dispatchGuideInput: SxProps<Theme> = {
  width: 250,
};

export default {
  dialogContent,
  dispatchGuideInput,
  filterContainer,
};
