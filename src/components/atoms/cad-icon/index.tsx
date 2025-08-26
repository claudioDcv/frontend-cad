import IconList from "@/components/molecules/icon";
import theme from "@/conf/theme";

interface CadIconProps {
    // success, warning, error, info
    color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

const getColor = (color: CadIconProps['color']) => {
    if (color && color !== 'default') {
        return theme.palette[color].main;
    }
    return theme.palette.secondary.main; // default color
};

const CadIcon: React.FC<CadIconProps> = ({ color }) => {
    const themeColor = getColor(color);
    return (
        <IconList name="sent" color={themeColor} />
    );
};

export default CadIcon;
