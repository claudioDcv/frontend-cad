import { SxProps, Theme } from '@mui/material';

const dialogContentStyles: SxProps<Theme> = {
  gap: 2,
  display: 'flex',
  flexDirection: 'column',
};

const dialogActionsStyles: SxProps<Theme> = {
  px: 3,
  pb: 2,
};

export default {
  dialogContentStyles,
  dialogActionsStyles,
};
