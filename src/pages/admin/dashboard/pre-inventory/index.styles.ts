import { SxProps, Theme } from '@mui/material';

const monthPickerGrid: SxProps<Theme> = {
  mt: 2,
};
const paperContainer: SxProps<Theme> = {
  p: 2,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
};
const accordionSummaryBox: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  pr: 2,
};
const chartsGrid: SxProps<Theme> = {
  mt: 3,
};
const gramsPaper: SxProps<Theme> = {
  p: 2,
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  height: 360,
};
const salesPaper: SxProps<Theme> = {
  p: 2,
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  height: 360,
};
const divider: SxProps<Theme> = {
  my: 2,
};
const accordionMarginTop: SxProps<Theme> = {
  mt: 2,
};

// Propiedades de Grid
const gridFull = { size: { xs: 12 } };
const gridLarge = {
  size: { xs: 12, md: 8 },
};
const gridSmall = {
  size: {
    xs: 12,
    md: 4,
  },
};

const container: SxProps<Theme> = {
  mb: 4,
};

export default {
  monthPickerGrid,
  paperContainer,
  accordionSummaryBox,
  chartsGrid,
  gramsPaper,
  salesPaper,
  divider,
  accordionMarginTop,
  gridFull,
  gridLarge,
  gridSmall,
  container,
};
