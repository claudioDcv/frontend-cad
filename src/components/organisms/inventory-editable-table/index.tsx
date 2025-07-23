import { useState } from 'react';
import EditableRow from './components/EditableRow';
import styles from './index.module.css';
import Token from '@/tokens';

interface Data {
  inventory: string;
  quantity: number;
  weight: number;
}

interface Total {
  quantity: number;
  weight: number;
}

interface EditableTableProps {
  total: Total;
}

const InventoryEditableTable = (props: EditableTableProps) => {
  const [data, setData] = useState<Data[]>([
    // TODO
    //se parte en 0, no se puede distribuir y otorgar mas peso que el del total,
    //boton que solo se activa si es valido
    // si quantity o weight se pasan, quedan en color rojo
    // y cuando esta todo distribuido queda en verde
    { inventory: 'INV001', quantity: 0, weight: 0 },
    { inventory: 'INV002', quantity: 0, weight: 0 },
    { inventory: 'INV003', quantity: 0, weight: 0 },
    { inventory: 'INV004', quantity: 0, weight: 0 },
  ]);

  const handleChange = (
    index: number,
    key: keyof Omit<Data, 'inventory'>,
    value: string
  ) => {
    const newData = [...data];
    newData[index][key] = Number(value);
    setData(newData);
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
        </table>
      </div>
    </>
  );
};

export default InventoryEditableTable;
