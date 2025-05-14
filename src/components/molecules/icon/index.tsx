import { Tooltip } from '@mui/material';
import { icons } from './icons';

interface IconListProps {
    name: keyof typeof icons;
    description?: string;
    color?: string;
    size?: string | number;
}

const IconList: React.FC<IconListProps> = ({
    name,
    description,
    color,
    size,
}) => {
    return (
        description ? (
            <Tooltip title={description} arrow placement="top">
                <span>{icons[name]({ color, size })}</span>
            </Tooltip>
        ) : <span>{icons[name]({ color, size })}</span>
    );
};

export default IconList;