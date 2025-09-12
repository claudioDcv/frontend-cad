import { SxProps, Theme } from '@mui/material';

const card: SxProps<Theme> = {
  backgroundColor: '#f5f5f5',
};

const cardContentBox: SxProps<Theme> = {
  p: 2,
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 2,
};

const filterBox: SxProps<Theme> = {
  mb: 2,
  mt: 2,
  flexWrap: 'nowrap',
  display: 'flex',
  alignItems: 'center',
  gap: 2,
};

const input: SxProps<Theme> = {
  maxWidth: 250,
};

export default {
  card,
  cardContentBox,
  filterBox,
  input,
};
