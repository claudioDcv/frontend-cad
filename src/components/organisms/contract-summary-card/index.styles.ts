import { SxProps, Theme } from '@mui/material';

const cardStyles: SxProps<Theme> = {
  backgroundColor: (theme) => theme.palette.background.paper,
};

const titleBoxStyles: SxProps<Theme> = {
  px: 2,
  pt: 1,
};

const gridBoxStyles = (hiddenClient: boolean): SxProps<Theme> => ({
  px: 2,
  pb: 2,
  display: 'grid',
  gridTemplateColumns: hiddenClient ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
  gap: 2,
});

export default {
  cardStyles,
  titleBoxStyles,
  gridBoxStyles,
};
