import { getAbbr, getColorBackground, getColorText } from './index.utils';
import { Material, Size } from './types';
import styles from './index.module.css';
import { Tooltip } from '@mui/material';

interface MaterialTypeProps {
  size?: Size;
  material: Material;
  label?: string;
  tooltip?: boolean;
}

export const MaterialType: React.FC<MaterialTypeProps> = ({
  size,
  material,
  label,
  tooltip,
}) => {
  const base = (
    <div data-size={size} className={styles.materialType}>
      <i
        className={styles.icon}
        style={{
          backgroundColor: getColorBackground(material),
          color: getColorText(material),
        }}
      >
        {getAbbr(material)}
      </i>
      {label && !tooltip && (
        <span className={styles.label} role="span">
          {label}
        </span>
      )}
    </div>
  );
  if (tooltip) {
    return <Tooltip title={label}>{base}</Tooltip>;
  }
  return base;
};
