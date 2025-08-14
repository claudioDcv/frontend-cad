import React from 'react';
import { useTranslation } from 'react-i18next';
import { Inventory, InventoryValue } from '@/entities/Inventory.entity';
import EditableRow from '../editable-row';

interface TableBodyProps {
  data: Inventory[];
  onChange: (
    inventoryType: Inventory['inventoryType'],
    key: InventoryValue,
    value: string
  ) => void;
}

const TableBody: React.FC<TableBodyProps> = ({ data, onChange }) => {
  const { t } = useTranslation();

  return (
    <tbody>
      {data.map((row) => (
        <tr key={row.inventoryType.value}>
          <td>
            <div>{t(`inventoryType.${row.inventoryType.label}`)}</div>
          </td>
          <td>
            <EditableRow
              value={String(row.quantity)}
              onChange={(val) => onChange(row.inventoryType, InventoryValue.Quantity, val)}
            />
          </td>
          <td>
            <EditableRow
              value={String(row.weight)}
              onChange={(val) => onChange(row.inventoryType, InventoryValue.Weight, val)}
            />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
