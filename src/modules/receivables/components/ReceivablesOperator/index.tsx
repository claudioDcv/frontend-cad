import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Visibility } from '@mui/icons-material';
import { Receivable } from "@/entities/Receivable.entity";
import { Table } from "@/components";
import ReceivableDetails from "../ReceivableDetails";
import NewReceivableFormDialog from "../NewReceivableFormDialog";
import useServices from "../../hooks/useServices";
import { inventoryCategories } from "@/constants";
import { filterInventoryType } from "@/utils";
import { CreateReceivable } from "@/entities/CreateReceivable.entity";

interface ReceivablesOperatorProps {
    resolutionId: number;
    openNewReceivableForm: boolean;
    setOpenNewReceivableForm: (open: boolean) => void;
}
const ReceivablesOperator = ({ resolutionId, openNewReceivableForm, setOpenNewReceivableForm }: ReceivablesOperatorProps) => {
    const { t } = useTranslation();
    const [selectedReceivable, setSelectedReceivable] = useState<Receivable | null>(null);
    const { contracts, receivables, loading, inventoryTypes, createReceivable, receivablesResend } = useServices(resolutionId);
    const badInventoryTypes = filterInventoryType(inventoryTypes, inventoryCategories.bad).map(type => ({
        value: type.value,
        label: t(`inventoryType.${type.label}`),
    }));
    const handleReceivableSubmit = async (receivable: CreateReceivable) => {
        try {
            const res = (await createReceivable(receivable)) as { id: number };
            if (res.id) {
                receivablesResend(resolutionId);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setOpenNewReceivableForm(false);
        }
    };
    return (
        <div>
            <NewReceivableFormDialog
                open={openNewReceivableForm}
                onClose={() => setOpenNewReceivableForm(false)}
                contracts={contracts}
                inventoryTypes={badInventoryTypes}
                onSubmit={handleReceivableSubmit}
            />
            <Box mt={2}>
                <Table
                    messageVoidData="No hay cuentas por cobrar"
                    rows={receivables}
                    columns={[
                        { id: 'contractId', label: 'Contrato' },
                        { id: 'quantity', label: 'Cantidad' },
                        { id: 'weight', label: 'Peso' },
                        { id: 'createdByName', label: 'Creado por' },
                        { id: 'reviewedByName', label: 'Revisado por' },
                        { id: 'typeName', label: 'Tipo', render: (row) => t(`inventoryType.${row.typeName}`) },
                        { id: 'id', label: 'Ver', render: (row) => <IconButton onClick={() => setSelectedReceivable(row)}><Visibility /></IconButton> },
                    ]}
                    loading={loading}
                />
            </Box>
            <Dialog open={Boolean(selectedReceivable)} onClose={() => setSelectedReceivable(null)}>
                <DialogTitle>{t('accountsReceivable.viewReceivable')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('accountsReceivable.receivableDetails')}
                    </DialogContentText>
                    {selectedReceivable && (
                        <ReceivableDetails receivable={selectedReceivable} />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSelectedReceivable(null)} color="primary">
                        {t('common.close')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ReceivablesOperator;
