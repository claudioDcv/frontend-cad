import { useState } from 'react';
import EditableRow from './components/EditableRow';
import styles from './index.module.css';
import Token from '@/tokens';
import { pluralize, preciseSum } from '@/utils';
import { Data, EditableTableProps } from './index.types';
import { emptyTotal } from '@/constants';

// TODO:
// tambien preparar los 3 clientes para los endpoints
// ver un alert y dentro de ese salga un warning si es que falta cantidad/distribucion,
// Preguntar si tiene metadata, si es el caso, no permitir enviar
// decirle a Carolina que no permita enviar a cad si tiene metadata
// para el operador solo debe de mostrar las resoluciones que tienen metadata
// agregar un filtro hasMetadata (true/false) / Carolina tambien

const InventoryEditableTable = (props: EditableTableProps) => {
  const [data, setData] = useState<Data[]>([
    { inventory: 'Anillos (Refaccion)', ...emptyTotal },
    { inventory: 'Aros (Refaccion) ', ...emptyTotal },
    { inventory: 'Colgantes (Refaccion)', ...emptyTotal },
    { inventory: 'Cadenas (Refaccion)', ...emptyTotal },
    { inventory: 'Pulseras (Refaccion)', ...emptyTotal },
    { inventory: 'Joyas Especiales', ...emptyTotal },
    { inventory: 'Monedas', ...emptyTotal },
    { inventory: 'Lingotes', ...emptyTotal },
    { inventory: 'Reloj Neto', ...emptyTotal },
    { inventory: 'Scrap', ...emptyTotal },
  ]);

  const totalQuantity = preciseSum(data.map((item) => item.quantity));
  const totalWeight = preciseSum(data.map((item) => item.weight));

  const handleChange = (
    index: number,
    key: keyof Omit<Data, 'inventory'>,
    value: string
  ): void => {
    const newValue = Number(value);
    if (isNaN(newValue) || newValue < 0) return;

    if (data[index][key] === newValue) return;

    const newData = [...data];
    newData[index][key] = newValue;
    setData(newData);

    const totalQuantity = preciseSum(newData.map((item) => item.quantity));
    const totalWeight = preciseSum(newData.map((item) => item.weight));

    if (props.onTotalsChange) {
      props.onTotalsChange({ quantity: totalQuantity, weight: totalWeight });
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
              <tr key={row.inventory}>
                <td>
                  <div>{row.inventory}</div>
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
