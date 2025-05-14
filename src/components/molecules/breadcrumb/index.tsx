import { Breadcrumbs, Link, Typography } from '@mui/material';
import styles from './index.module.css';

interface Item {
  label: string;
  link?: string;
}

interface BreadcrumbProps {
  items: Item[];
  action?: React.ReactNode;
  lastItemLink?: boolean;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  action,
  lastItemLink,
}) => {
  return (
    <div className={styles.container}>
      <Breadcrumbs>
        {items.map((item, index) =>
          item.link && (lastItemLink || index < items.length - 1) ? (
            <Link key={index} href={item.link}>
              {item.label}
            </Link>
          ) : (
            <Typography key={index}>{item.label}</Typography>
          )
        )}
      </Breadcrumbs>
      {action && <div>{action}</div>}
    </div>
  );
};

export default Breadcrumb;
