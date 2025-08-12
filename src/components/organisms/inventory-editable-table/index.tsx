import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Inventory, InventoryValue } from '@/entities/Inventory.entity';
import { allowedInventories, inventoryCategories } from '@/constants';
import { filterByInventory, outputInventorySum, pluralize, sortCustom } from '@/utils';
import { useInitialData } from '@/contexts/initial-data/useInitialData';
import Token from '@/tokens';
import { EditableTableProps } from './index.types';
import EditableRow from './components/editable-row';
import styles from './index.module.css';
import Footer from './components/footer';

// TODO:
// Vista coordinador solo debe ver los documentos pre resolucionados (con y sin metadata)
// Operador: pre resoluciones (con metadata), resoluciones, aceptadas y cerradas.

const InventoryEditableTable = (props: EditableTableProps) => {
  const { t } = useTranslation();
  const [initialized, setInitialized] = useState(false);
  const [data, setData] = useState<Inventory[]>([]);

  const initialDataCtx = useInitialData();

  useEffect(() => {
    if (data.length === 0 && initialDataCtx.inventoryTypes.length) {
      const sortedInventoryTypes = sortCustom(
        initialDataCtx.inventoryTypes,
        allowedInventories,
        (item) => item.label
      );

      setData(
        sortedInventoryTypes.map((it, i: number) => ({
          inventoryType: it,
          quantity: 0,
          weight: 0,
          internalId: i,
        }))
      );
    }
  }, [data, initialDataCtx.inventoryTypes]);

  useEffect(() => {
    if (
      props.resolutionInventory.length > 0 &&
      data.length > 0 &&
      !initialized
    ) {
      setInitialized(true);
      const res = data.map((d) => {
        const resD = { ...d };
        const finded = props.resolutionInventory.find(
          (ri) => ri.inventoryTypeId === d.inventoryType.value
        );
        if (finded) {
          resD.quantity = finded.quantity;
          resD.weight = finded.weight;
        }
        return resD;
      });
      setData(res);
    }
  }, [props.resolutionInventory, data, initialized]);

  const handleChange = (
    inventoryType: Inventory['inventoryType'],
    key: InventoryValue,
    value: string
  ): void => {
    const newValue = Number(value);
    if (isNaN(newValue) || newValue < 0) return;

    const newData = data.map((item) => {
      if (item.inventoryType.value === inventoryType.value) {
        return { ...item, [key]: newValue };
      }
      return item;
    });
    setData(newData);

    const output = outputInventorySum(newData);

    if (props.onChange) {
      props.onChange({
        quantity: output.quantity,
        weight: output.weight,
        // TODO: Revisar, pues esto no deberia ir.
        inventoryTypeId: 0,
      });
    }
  };

  const outputRefaction = outputInventorySum(filterByInventory(data, inventoryCategories.refaction));

  const thStyle = {
    backgroundColor: Token.Color.PrimaryMain,
    color: Token.Color.Dark,
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
            {filterByInventory(data, inventoryCategories.refaction).map((row) => (
              <tr key={row.inventoryType.value}>
                <td>
                  <div>{t(`inventoryType.${row.inventoryType.label}`)}</div>
                </td>
                <td>
                  <EditableRow
                    value={String(row.quantity)}
                    onChange={(val) => handleChange(row.inventoryType, InventoryValue.Quantity, val)}
                  />
                </td>
                <td>
                  <EditableRow
                    value={String(row.weight)}
                    onChange={(val) => handleChange(row.inventoryType, InventoryValue.Weight, val)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
          <tbody>
            {filterByInventory(data, inventoryCategories.common).map((row) => (
              <tr key={row.inventoryType.value}>
                <td>
                  <div>{t(`inventoryType.${row.inventoryType.label}`)}</div>
                </td>
                <td>
                  <EditableRow
                    value={String(row.quantity)}
                    onChange={(val) => handleChange(row.inventoryType, InventoryValue.Quantity, val)}
                  />
                </td>
                <td>
                  <EditableRow
                    value={String(row.weight)}
                    onChange={(val) => handleChange(row.inventoryType, InventoryValue.Weight, val)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
          <tbody>
            {filterByInventory(data, inventoryCategories.bad).map((row) => (
              <tr key={row.inventoryType.value}>
                <td>
                  <div>{t(`inventoryType.${row.inventoryType.label}`)}</div>
                </td>
                <td>
                  <EditableRow
                    value={String(row.quantity)}
                    onChange={(val) => handleChange(row.inventoryType, InventoryValue.Quantity, val)}
                  />
                </td>
                <td>
                  <EditableRow
                    value={String(row.weight)}
                    onChange={(val) => handleChange(row.inventoryType, InventoryValue.Weight, val)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
          <Footer data={data} props={props} />
        </table>
      </div>
    </>
  );
};

export default InventoryEditableTable;
