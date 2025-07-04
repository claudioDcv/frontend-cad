import { Breadcrumbs, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styles from './index.module.css';
import { Link } from 'wouter';

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
  const { t } = useTranslation(); 

  return (
    <div className={styles.container}>
      <Breadcrumbs>
        {items.map((item, index) =>
          item.link && (lastItemLink || index < items.length - 1) ? (
            <Link key={index} href={item.link}>
              {t(item.label)}
            </Link>
          ) : (
            <Typography key={index}>{t(item.label)}</Typography>
          )
        )}
      </Breadcrumbs>
      {action && <div>{action}</div>}
    </div>
  );
};

export default Breadcrumb;
