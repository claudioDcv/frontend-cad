import { SxProps, Theme } from '@mui/material';

const getDropdownStyles = (externalSx?: SxProps<Theme>): SxProps<Theme> => ({
  maxWidth: 250,
  ...externalSx,
});

export default {
  getDropdownStyles,
};
