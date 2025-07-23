import { useState } from 'react';
import EditableRow from './components/EditableRow';
import styles from './index.module.css';
import Token from '@/tokens';

interface Data {
  inventory: string;
  quantity: number;
  weight: number;
}

const EditableTable = () => {
  const [data, setData] = useState<Data[]>([
    { inventory: 'INV001', quantity: 10, weight: 50 },
    { inventory: 'INV002', quantity: 5, weight: 30 },
    { inventory: 'INV003', quantity: 8, weight: 45 },
    { inventory: 'INV004', quantity: 2, weight: 20 },
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
              <th style={thStyle}>Inventario</th>
              <th style={thStyle}>Cantidad</th>
              <th style={thStyle}>Peso Neto (gr)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={row.inventory}>
                <td>{row.inventory}</td>
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

export default EditableTable;
