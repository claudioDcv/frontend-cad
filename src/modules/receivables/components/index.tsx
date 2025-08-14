import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useReceivablesContext } from "../context/useReceivablesContext";
import { useTranslation } from "react-i18next";
import useServices from "../hooks/useServices";
import { Contract } from "@/entities/Contract.entity";
import { useState } from "react";
import AutocompleteDropdown from "@/components/atoms/autocomplete-dropdown";
import ModalHeader from "@/components/molecules/modal-header";
import { IconList } from "@/components";

interface ReceivableForm {
    contractId: { label: string; value: string };
}

interface NewReceivableFormProps {
    open: boolean;
    onClose: () => void;
    contracts: Contract[];
    onSubmit: (data: Partial<ReceivableForm>) => void;
}

const NewReceivableFormDialog = ({ open, onClose, contracts, onSubmit }: NewReceivableFormProps) => {
    const { t } = useTranslation();
    const { control, getValues, setValue } = useForm<Partial<ReceivableForm>>({
        defaultValues: {
            contractId: { label: '', value: '' }
        }
    });
    const getContractOptions = (contracts: Contract[]) => {
        return contracts.map(contract => ({
            value: contract.contractId.toString(),
            label: contract.contractNumber.toString(),
        }));
    }

    const findContractById = (id: string) => {
        return getContractOptions(contracts).find(option => option.value === id);
    }

    const handleContractChange = (event: React.SyntheticEvent<Element, Event>, value: string) => {
        if (findContractById(value) && event) {
            setValue('contractId', findContractById(value));
        }
    }
    function handleSubmit() {
        onSubmit(getValues());
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{t('accountsReceivable.newReceivable')}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {t('common.selectContract')}
                </DialogContentText>
            </DialogContent>
            <DialogContent>
                <Controller
                    name="contractId"
                    control={control}
                    render={({ field }) => {
                        return (
                            <AutocompleteDropdown
                                options={getContractOptions(contracts)}
                                label="Contrato"
                                value={field.value}
                                onChange={handleContractChange}
                                disableClearable={false}
                            />
                        );
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    {t('common.cancel')}
                </Button>
                <Button onClick={handleSubmit} color="secondary">
                    {t('common.create')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

interface ReceivablesOperatorProps {
    resolutionId: number;
    openNewReceivableForm: boolean;
    setOpenNewReceivableForm: (open: boolean) => void;
}
const ReceivablesOperator = ({ resolutionId, openNewReceivableForm, setOpenNewReceivableForm }: ReceivablesOperatorProps) => {
    const { contracts } = useServices(resolutionId);
    return (
        <div>
            <NewReceivableFormDialog
                open={openNewReceivableForm}
                onClose={() => setOpenNewReceivableForm(false)}
                contracts={contracts}
                onSubmit={(data) => {
                    console.log("New Receivable Data:", data);
                }}
            />
        </div>
    );
};

const ReceivablesOperatorDialog = () => {
    const { t } = useTranslation();
    const [openNewReceivableForm, setOpenNewReceivableForm] = useState(false);
    const { resolutionId, setResolutionId } = useReceivablesContext();
    return (
        <Dialog open={Boolean(resolutionId)} onClose={() => setResolutionId(null)} fullScreen>
            <AppBar position="static">
                <ModalHeader
                    onClose={() => setResolutionId(null)}
                    icon={<IconList name="receivables" />}
                    title={t('accountsReceivable.title')}
                    actions={<Button variant="contained" color="secondary" onClick={() => setOpenNewReceivableForm(true)}>{t('accountsReceivable.newReceivable')}</Button>}
                />
            </AppBar>
            <DialogContent>
                <DialogContentText>
                    {t('accountsReceivable.description')}
                </DialogContentText>
                {/* Add form fields or other content here */}
                {resolutionId && <ReceivablesOperator resolutionId={resolutionId} openNewReceivableForm={openNewReceivableForm} setOpenNewReceivableForm={setOpenNewReceivableForm} />}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { }} color="primary">
                    {t('common.save')}
                </Button>
                <Button onClick={() => setResolutionId(null)} color="secondary">
                    {t('common.close')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};


export default ReceivablesOperatorDialog;