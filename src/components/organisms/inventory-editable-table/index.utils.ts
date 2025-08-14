import { Inventory } from "@/entities/Inventory.entity";
import { InventoryType } from "@/entities/InventoryType.entity";
import { outputInventorySum, sortCustom } from "@/utils";

export const initializeData = (
    data: Inventory[],
    inventoryTypes: InventoryType[],
    allowedInventories: string[]
): Inventory[] => {
    if (data.length === 0 && inventoryTypes.length) {
        const sortedInventoryTypes = sortCustom(
            inventoryTypes,
            allowedInventories,
            (item: InventoryType) => item.label
        );

        return sortedInventoryTypes.map((it) => ({
            inventoryType: it,
            quantity: 0,
            weight: 0,
        }));
    }
    return data;
};

export const updateResolutionInventory = (
    data: Inventory[],
    resolutionInventory: { inventoryTypeId: number; quantity: number; weight: number }[]
): Inventory[] => {
    return data.map((d) => {
        const resD = { ...d };
        const finded = resolutionInventory.find(
            (ri) => ri.inventoryTypeId === Number(d.inventoryType.value)
        );
        if (finded) {
            resD.quantity = finded.quantity;
            resD.weight = finded.weight;
        }
        return resD;
    });
};

export const handleInventoryChange = (
    data: Inventory[],
    inventoryType: InventoryType,
    key: keyof Inventory,
    value: string,
    onChange?: (output: { quantity: number; weight: number; inventoryTypeId: number }) => void
): Inventory[] => {
    const newValue = Number(value);
    if (isNaN(newValue) || newValue < 0) return data;

    const newData = data.map((item) => {
        if (item.inventoryType.value === inventoryType.value) {
            return { ...item, [key]: newValue };
        }
        return item;
    });

    const output = outputInventorySum(newData);

    if (onChange) {
        onChange({
            quantity: output.quantity,
            weight: output.weight,
            inventoryTypeId: Number(inventoryType.value),
        });
    }

    return newData;
};