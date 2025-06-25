import { Box, Typography } from '@mui/material';

interface DisplayDataProps {
  value: string | number | undefined;
  label: string;
}

const DisplayData: React.FC<DisplayDataProps> = ({ label, value }) => {
  return (
    <Box sx={{ flexDirection: 'row', display: 'flex', gap: 1 }}>
      <Typography variant="body2" component="span">
        {label}:
      </Typography>
      <Typography variant="body2" component="span" fontWeight="bold">
        {value}
      </Typography>
    </Box>
  );
};

export default DisplayData;
