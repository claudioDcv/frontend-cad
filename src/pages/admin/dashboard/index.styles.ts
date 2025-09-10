import { SxProps, Theme } from '@mui/material';

const header: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  mb: 4,
};

const buttonTabStyle = (active: boolean = false): SxProps<Theme> => ({
  textTransform: 'none',
  borderRadius: 0,
  borderBottom: active ? 3 : 0,
  borderColor: 'primary.main',
  '&:hover': {
    backgroundColor: 'action.hover',
  },
});

export default {
  header,
  buttonTabStyle,
};
