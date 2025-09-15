import React from 'react';
import styles from './index.module.css';
import { useTranslation } from 'react-i18next';
import theme from '@/conf/theme';
import EditableRow from '@/components/organisms/inventory-editable-table/components/editable-row';

interface DistributionRow {
  id: number;
  label: string;
  value: string;
}

interface DistributionTableProps {
  rows: DistributionRow[];
  onChange: (id: number, value: string) => void;
}

const DistributionTable: React.FC<DistributionTableProps> = ({
  rows,
  onChange,
}) => {
  const { t } = useTranslation();

  const thStyle = {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  };

  return (
    <>
      <div className={styles.caption}>
        <span>{t('inventoryEditableTable.caption')}</span>
        <span className={styles.captionMessage}>
          {t('modalDistribution.table.title')}
        </span>
      </div>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th style={thStyle}>
                <div>{t('modalDistribution.table.headers.field')}</div>
              </th>
              <th style={thStyle}>
                <div>{t('modalDistribution.table.headers.value')}</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>
                  <div>
                    {t(`modalDistribution.table.rows.${row.label}`, row.label)}
                  </div>
                </td>
                <td>
                  <EditableRow
                    value={row.value}
                    onChange={(value: string) => onChange(row.id, value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DistributionTable;
