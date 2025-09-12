import { SxProps, Theme, Chip, styled } from '@mui/material';

const tableContainer: SxProps<Theme> = {
  mt: 2,
};

const paginationBox: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'flex-end',
  mt: 2,
};

const StyledStatusChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status: boolean | null }>(({ status, theme }) => ({
  color: theme.palette.getContrastText(
    status === true
      ? theme.palette.success.main
      : status === false
      ? theme.palette.error.main
      : theme.palette.grey[500]
  ),
  backgroundColor:
    status === true
      ? theme.palette.success.main
      : status === false
      ? theme.palette.error.main
      : theme.palette.grey[500],
}));

export { StyledStatusChip };
export default {
  tableContainer,
  paginationBox,
};
