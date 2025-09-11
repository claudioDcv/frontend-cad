import { Inventory } from '@/entities/Inventory.entity';
import { useTranslation } from 'react-i18next';
import { outputInventorySum, verboseGram, verboseUnit } from '@/utils';
import { EditableTableProps } from '../../index.types';
import styles from './index.module.css';

interface FooterProps {
  data: Inventory[];
  props: EditableTableProps;
}

const Footer = ({ data, props }: FooterProps) => {
  const { t } = useTranslation();

  const totals = outputInventorySum(data);

  return (
    <tfoot>
      <tr>
        <td>
          <div className={styles.caption}>
            {t('inventoryEditableTable.footer.totals')}
          </div>
        </td>
        <td
          className={
            totals.quantity === props.total.quantity ? styles.validCell : ''
          }
        >
          <div>
            {verboseUnit(totals.quantity)} / {verboseUnit(totals.quantity)}
          </div>
        </td>
        <td
          className={
            totals.weight === props.total.weight ? styles.validCell : ''
          }
        >
          <div>
            {verboseGram(totals.weight)} / {verboseGram(props.total.weight)}
          </div>
        </td>
      </tr>
    </tfoot>
  );
};

export default Footer;
