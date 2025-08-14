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
    const style = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        color,
    };
    return (
        description ? (
            <Tooltip title={description} arrow placement="top">
                <span style={style}>{icons[name]({ color, size })}</span>
            </Tooltip>
        ) : <span style={style}>{icons[name]({ color, size })}</span>
    );
};

export default IconList;