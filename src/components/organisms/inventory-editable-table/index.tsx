import { useEffect, useState } from 'react';
import { Inventory, InventoryValue } from '@/entities/Inventory.entity';
import { allowedInventories, inventoryCategories } from '@/constants';
import { filterByInventory, outputInventorySum, pluralize } from '@/utils';
import { useInitialData } from '@/contexts/initial-data/useInitialData';
import { EditableTableProps } from './index.types';
import TableBody from './components/table-body';
import { handleInventoryChange, initializeData, updateResolutionInventory } from './index.utils';
import Footer from './components/footer';
import styles from './index.module.css';
import theme from '@/conf/theme';

const InventoryEditableTable = (props: EditableTableProps) => {
  const [initialized, setInitialized] = useState(false);

  const initialDataCtx = useInitialData();

  useEffect(() => {
    const initializedData = initializeData(props.data, initialDataCtx.inventoryTypes, allowedInventories);
    props.setData(initializedData);
  }, [props.data, initialDataCtx.inventoryTypes, props]);

  useEffect(() => {
    if (
      props.resolutionInventory.length > 0 &&
      props.data.length > 0 &&
      !initialized
    ) {
      setInitialized(true);
      const res = updateResolutionInventory(props.data, props.resolutionInventory);

      props.setData(res);
    }
  }, [props.resolutionInventory, props.data, initialized, props]);

  const handleChange = (
    inventoryType: Inventory['inventoryType'],
    key: InventoryValue,
    value: string
  ): void => {
    const newData = handleInventoryChange(props.data, inventoryType, key, value, props.onChange);
    props.setData(newData);
  };

  const outputRefaction = outputInventorySum(filterByInventory(props.data, inventoryCategories.refaction));

  const thStyle = {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  };

  return (
    <>
      <div className={styles.caption}>
        <span>Inventario editable</span>
        <span className={styles.captionMessage}>
          Para editar un número haz click sobre él
        </span>
      </div>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th style={thStyle}>
                <div>Inventario</div>
              </th>
              <th style={thStyle}>
                <div>Cantidad</div>
              </th>
              <th style={thStyle}>
                <div>Peso Neto (gr)</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.categoryRow}>
              <td>
                <div>Refacción</div>
              </td>
              <td>
                <div className={styles.headerValue}>{pluralize(outputRefaction.quantity, 'und', 'unds')}</div>
              </td>
              <td>
                <div className={styles.headerValue}>{pluralize(outputRefaction.weight, 'gr', 'grs')}</div>
              </td>
            </tr>
          </tbody>
          <TableBody
            data={filterByInventory(props.data, inventoryCategories.refaction)}
            onChange={handleChange}
          />
          <TableBody
            data={filterByInventory(props.data, inventoryCategories.common)}
            onChange={handleChange}
          />
          <TableBody
            data={filterByInventory(props.data, inventoryCategories.bad)}
            onChange={handleChange}
          />
          <Footer data={props.data} props={props} />
        </table>
      </div>
    </>
  );
};

export default InventoryEditableTable;
