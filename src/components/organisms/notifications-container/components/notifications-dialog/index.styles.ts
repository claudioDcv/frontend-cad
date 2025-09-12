import { SxProps, Theme } from '@mui/material';

const container: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: 360,
};

const headerBox: SxProps<Theme> = {
  px: 2,
  py: 1,
};

const contentBox: SxProps<Theme> = {
  flex: 1,
  overflow: 'auto',
};

const footerBox: SxProps<Theme> = {
  p: 2,
};

export default {
  container,
  headerBox,
  contentBox,
  footerBox,
};
