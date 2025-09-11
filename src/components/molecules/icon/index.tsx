import { Tooltip } from '@mui/material';
import { icons } from './icons';
import styles from './index.module.css';

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
  const dynamicStyle = {
    width: size,
    height: size,
    color,
  };

  return description ? (
    <Tooltip title={description} arrow placement="top">
      <span className={styles.iconContainer} style={dynamicStyle}>
        {icons[name]({ color, size })}
      </span>
    </Tooltip>
  ) : (
    <span className={styles.iconContainer} style={dynamicStyle}>
      {icons[name]({ color, size })}
    </span>
  );
};

export default IconList;
