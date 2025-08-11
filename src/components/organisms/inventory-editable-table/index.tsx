import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Inventory } from '@/entities/Inventory.entity';
import { allowedInventories } from '@/constants';
import { pluralize, preciseSum, sortCustom } from '@/utils';
import { useInitialData } from '@/contexts/initial-data/useInitialData';
import Token from '@/tokens';
import { EditableTableProps } from './index.types';
import EditableRow from './components/editable-row/EditableRow';
import styles from './index.module.css';

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
        sortedInventoryTypes.map((it) => ({
          inventoryType: it,
          quantity: 0,
          weight: 0,
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
          (ri) => ri.inventoryTypeId === Number(d.inventoryType.value)
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

  const totalQuantity = preciseSum(
    data.map((item) => Number(item.quantity) || 0)
  );
  const totalWeight = preciseSum(data.map((item) => Number(item.weight) || 0));

  const handleChange = (
    index: number,
    key: keyof Omit<Inventory, 'inventory'>,
    value: string
  ): void => {
    const newValue = Number(value);
    if (isNaN(newValue) || newValue < 0) return;

    const newData = [...data];
    (newData[index][key] as number) = newValue;
    setData(newData);

    const totalQuantity = preciseSum(newData.map((item) => item.quantity));
    const totalWeight = preciseSum(newData.map((item) => item.weight));

    if (props.onChange) {
      props.onChange({
        quantity: totalQuantity,
        weight: totalWeight,
        inventoryTypeId: Number(newData[index].inventoryType.value),
      });
    }
  };

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
            {data.map((row, index) => (
              <tr key={row.inventoryType.value}>
                <td>
                  <div>{t(`inventoryType.${row.inventoryType.label}`)}</div>
                </td>
                <td>
                  <EditableRow
                    value={String(row.quantity)}
                    onChange={(val) => handleChange(index, 'quantity', val)}
                  />
                </td>
                <td>
                  <EditableRow
                    value={String(row.weight)}
                    onChange={(val) => handleChange(index, 'weight', val)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <div style={{ fontWeight: 'bold' }}>Totales</div>
              </td>
              <td
                className={
                  totalQuantity === props.total.quantity ? styles.validCell : ''
                }
              >
                <div>
                  {totalQuantity} {pluralize(totalQuantity, 'und', 'unds')} /{' '}
                  {props.total.quantity}{' '}
                  {pluralize(props.total.quantity, 'und', 'unds')}
                </div>
              </td>
              <td
                className={
                  totalWeight === props.total.weight ? styles.validCell : ''
                }
              >
                <div>
                  {totalWeight} {pluralize(totalWeight, 'gr', 'grs')} /{' '}
                  {props.total.weight}{' '}
                  {pluralize(props.total.weight, 'gr', 'grs')}
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default InventoryEditableTable;
