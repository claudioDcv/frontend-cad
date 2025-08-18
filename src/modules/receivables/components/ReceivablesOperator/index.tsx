import { Box, Button, Dialog, DialogActions, DialogContent, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Visibility } from '@mui/icons-material';
import { Receivable } from "@/entities/Receivable.entity";
import { Pagination, Table } from "@/components";
import ReceivableDetails from "../ReceivableDetails";
import NewReceivableFormDialog from "../NewReceivableFormDialog";
import useServices from "../../hooks/useServices";
import { inventoryCategories } from "@/constants";
import { filterInventoryType } from "@/utils";
import { CreateReceivable } from "@/entities/CreateReceivable.entity";
import { useAlertContext } from "@/contexts/alert/useAlertContext";
import { AlertType } from "@/contexts/alert/types";
import ModalHeader from "@/components/molecules/modal-header";
import { ReceivableProps } from "@/clients/get-receivables/client";

interface ReceivablesOperatorProps {
    resolutionId: number;
    openNewReceivableForm: boolean;
    setOpenNewReceivableForm: (open: boolean) => void;
}
const ReceivablesOperator = ({ resolutionId, openNewReceivableForm, setOpenNewReceivableForm }: ReceivablesOperatorProps) => {
    const [filters, setFilters] = useState<ReceivableProps>({
        resolutionId,
        page: 1,
    });
    const { t } = useTranslation();
    const alertContext = useAlertContext();
    const [selectedReceivable, setSelectedReceivable] = useState<Receivable | null>(null);
    const { contracts, receivables, loading, inventoryTypes, createReceivable, receivablesResend } = useServices(filters);
    const badInventoryTypes = filterInventoryType(inventoryTypes, inventoryCategories.bad).map(type => ({
        value: type.value,
        label: t(`inventoryType.${type.label}`),
    }));
    const handleReceivableSubmit = async (receivable: CreateReceivable, onSuccess: () => void) => {
        try {
            const res = (await createReceivable(receivable)) as { id: number };
            if (res.id) {
                receivablesResend(filters);
                alertContext.addAlert({
                    type: AlertType.SUCCESS,
                    title: t('common.success'),
                    message: t('accountsReceivable.successMessage', {
                        id: res.id,
                    }),
                    callback: () => {
                        onSuccess();
                        setOpenNewReceivableForm(false);
                    },
                });
            }
        } catch (error) {
            console.error(error);
            alertContext.addAlert({
                type: AlertType.ERROR,
                title: t('common.error'),
                message: t('accountsReceivable.errorMessage'),
                dismissible: true,
            });
        }
    };

    const handleCall = (filter: { [key: string]: unknown }) => {
        setFilters((prev) => ({ ...prev, ...filter }));
        receivablesResend({ ...filters, ...filter });
    };
    const handleChangePage = (_p: unknown, page: number) => {
        handleCall({ page });
    };


    return (
        <>
            <NewReceivableFormDialog
                open={openNewReceivableForm}
                onClose={() => setOpenNewReceivableForm(false)}
                contracts={contracts}
                inventoryTypes={badInventoryTypes}
                onSubmit={handleReceivableSubmit}
                loading={loading}
            />
            <Box mt={2}>
                <Table
                    size="small"
                    messageVoidData="No hay cuentas por cobrar"
                    rows={receivables.content}
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
                <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Pagination
                        {...receivables.meta}
                        onChange={handleChangePage}
                    />
                </Box>
            </Box>
            <Dialog open={Boolean(selectedReceivable)} onClose={() => setSelectedReceivable(null)} fullWidth maxWidth="md">
                <ModalHeader title={t('accountsReceivable.viewReceivable')} onClose={() => setSelectedReceivable(null)} />
                <DialogContent>
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
        </>
    );
};

export default ReceivablesOperator;
