import { SxProps, Theme } from '@mui/material';

const card: SxProps<Theme> = {
  backgroundColor: '#f5f5f5',
};

const cardContentGrid: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 2,
};

const formBox: SxProps<Theme> = {
  mt: 2,
  mb: 2,
  display: 'flex',
  gap: 2,
  alignItems: 'center',
};

const input: SxProps<Theme> = {
  maxWidth: 250,
};

export default {
  card,
  cardContentGrid,
  formBox,
  input,
};
