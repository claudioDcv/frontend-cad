import { Box, Typography } from '@mui/material';

interface DisplayDataProps {
  value: string | number | undefined | null | React.ReactNode;
  label: string;
  voidValue?: string;
}

const DisplayData: React.FC<DisplayDataProps> = ({ label, value, voidValue = 'N/A' }) => {
  return (
    <Box sx={{ flexDirection: 'row', display: 'flex', gap: 1 }}>
      <Typography variant="body2" component="span">
        {label}:
      </Typography>
      <Typography variant="body2" component="span" fontWeight="bold">
        {value ?? voidValue}
      </Typography>
    </Box>
  );
};

export default DisplayData;
