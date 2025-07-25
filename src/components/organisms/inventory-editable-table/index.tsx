import { useEffect, useState } from 'react';
import EditableRow from './components/EditableRow';
import styles from './index.module.css';
import Token from '@/tokens';
import { preciseSum } from '@/utils';

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
  onValid?: (isValid: boolean) => void;
}

// TODO: que diga grs pero si es 1 es gr, si es 0 es und , sino unds, blanco de la izquierda al plomo
// y que los colores sean individuales, tambien preparar los 3 clientes para los endpoints
// solo pongo color si es exacto, el guardar guarda, sacar la restriccion
// agregar boton resolucionar, que hara: al presionar levanta modal y que pida confirmacion, dentro
// ver un alert y dentro de ese salga un warning si es que falta cantidad/distribucion,
// mostrar las diferencia si es el caso "faltan 14grs por asignar"
// Preguntar si tiene metadata, si es el caso, no permitir enviar
// decirle a Carolina que no permita enviar a cad si tiene metadata
// para el operador solo debe de mostrar las resoluciones que tienen metadata
// agregar un filtro hasMetadata (true/false) / Carolina tambien

const InventoryEditableTable = (props: EditableTableProps) => {
  const [data, setData] = useState<Data[]>([
    { inventory: 'Anillos (Refaccion)', quantity: 0, weight: 0 },
    { inventory: 'Aros (Refaccion) ', quantity: 0, weight: 0 },
    { inventory: 'Colgantes (Refaccion)', quantity: 0, weight: 0 },
    { inventory: 'Cadenas (Refaccion)', quantity: 0, weight: 0 },
    { inventory: 'Pulseras (Refaccion)', quantity: 0, weight: 0 },
    { inventory: 'Joyas Especiales', quantity: 0, weight: 0 },
    { inventory: 'Monedas', quantity: 0, weight: 0 },
    { inventory: 'Lingotes', quantity: 0, weight: 0 },
    { inventory: 'Reloj Neto', quantity: 0, weight: 0 },
    { inventory: 'Scrap', quantity: 0, weight: 0 },
  ]);

  const totalQuantity = preciseSum(data.map((item) => item.quantity));
  const totalWeight = preciseSum(data.map((item) => item.weight));

  const handleChange = (
    index: number,
    key: keyof Omit<Data, 'inventory'>,
    value: string
  ): boolean => {
    const newValue = Number(value);
    if (isNaN(newValue) || newValue < 0) return false;

    const newData = [...data];
    newData[index][key] = newValue;

    const newTotalQuantity = preciseSum(newData.map((item) => item.quantity));
    const newTotalWeight = preciseSum(newData.map((item) => item.weight));

    const isValid =
      newTotalQuantity <= props.total.quantity &&
      newTotalWeight <= props.total.weight;

    if (isValid) {
      setData(newData);
      return true;
    }

    return false;
  };

  const thStyle = {
    backgroundColor: Token.Color.PrimaryMain,
    color: Token.Color.Dark,
  };

  useEffect(() => {
    const isValid =
      totalQuantity === props.total.quantity &&
      totalWeight === props.total.weight;
    props.onValid?.(isValid);
  }, [props, totalQuantity, totalWeight]);

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
            <tr
              className={
                totalQuantity === props.total.quantity &&
                totalWeight === props.total.weight
                  ? styles.validRow
                  : styles.invalidRow
              }
            >
              <td>
                <div style={{ fontWeight: 'bold' }}>Totales</div>
              </td>
              <td>
                <div>
                  {totalQuantity} / {props.total.quantity}
                </div>
              </td>
              <td>
                <div>
                  {totalWeight} gr / {props.total.weight} gr
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
