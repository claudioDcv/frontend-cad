import { Inventory } from "@/entities/Inventory.entity";
import { outputInventorySum, pluralize } from "@/utils";
import { EditableTableProps } from "../../index.types";
import styles from "./index.module.css";

interface FooterProps {
    data: Inventory[];
    props: EditableTableProps;
}

const Footer = ({ data, props }: FooterProps) => {
    const totals = outputInventorySum(data);
    return (
        <tfoot>
            <tr>
                <td>
                    <div className={styles.caption}>Totales</div>
                </td>
                <td
                    className={
                        totals.quantity === props.total.quantity ? styles.validCell : ''
                    }
                >
                    <div>
                        {pluralize(totals.quantity, 'und', 'unds')} /{' '}
                        {pluralize(props.total.quantity, 'und', 'unds')}
                    </div>
                </td>
                <td
                    className={
                        totals.weight === props.total.weight ? styles.validCell : ''
                    }
                >
                    <div>
                        {pluralize(totals.weight, 'gr', 'grs')} /{' '}
                        {pluralize(props.total.weight, 'gr', 'grs')}
                    </div>
                </td>
            </tr>
        </tfoot>
    );
};

export default Footer;
