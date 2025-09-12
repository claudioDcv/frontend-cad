import { SxProps, Theme } from '@mui/material';

const dialogActionsContainer: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'end',
  width: '100%',
};

const buttonGroup: SxProps<Theme> = {
  display: 'flex',
  gap: 1,
};

export default {
  dialogActionsContainer,
  buttonGroup,
};
