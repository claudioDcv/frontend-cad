import { SxProps, Theme } from '@mui/material';

const appBar: SxProps<Theme> = {
  backgroundColor: 'background.paper',
  boxShadow: 'none',
};

const dialogContent: SxProps<Theme> = {
  overflowY: 'auto',
};

const mainContainer: SxProps<Theme> = {
  display: 'flex',
  gap: 2,
};

const leftPanel: SxProps<Theme> = {
  position: 'sticky',
  top: 0,
};

const rightPanel: SxProps<Theme> = {
  flex: 2,
};

const headerBox: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  my: 1.2,
};

export default {
  appBar,
  dialogContent,
  mainContainer,
  leftPanel,
  rightPanel,
  headerBox,
};
