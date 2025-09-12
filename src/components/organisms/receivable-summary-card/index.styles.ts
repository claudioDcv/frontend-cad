import { SxProps, Theme } from '@mui/material';

const card: SxProps<Theme> = {
  backgroundColor: (theme) => theme.palette.background.paper,
};

const mainBox: SxProps<Theme> = {
  p: 2,
  gap: 2,
};

const title: SxProps<Theme> = {
  fontSize: (theme) => theme.typography.h6.fontSize,
  fontWeight: 'regular',
};

const gridContainer: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 2,
};

export default {
  card,
  mainBox,
  title,
  gridContainer,
};
