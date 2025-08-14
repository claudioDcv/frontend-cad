// YesNo width icon check and X
// use Tooltip if needed
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { IconButton } from '@mui/material';

const ReviewStatus = ({ value, onView }: { value: boolean; onView?: () => void }) => {
    const base = value ? (
        <CheckCircleIcon color="success" />
    ) : (
        <InfoIcon color="info" />
    )
    if (onView) {
        return (
            <IconButton onClick={onView}>
                {base}
            </IconButton>
        );
    }
    return base;
};

export default ReviewStatus;
