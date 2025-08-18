import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Skeleton } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Contract } from "@/entities/Contract.entity";
import AutocompleteDropdown from "@/components/atoms/autocomplete-dropdown";
import { InventoryType } from "@/entities/InventoryType.entity";
import { createItem } from "@/components/atoms/autocomplete-dropdown/index.utils";
import { ContractSummaryCard, Dropdown, Input } from "@/components";
import { CreateReceivable } from "@/entities/CreateReceivable.entity";

const getContractByNumber = (contracts: Contract[], contractNumber: string) => {
    return contracts.find(contract => contract.contractNumber.toString() === contractNumber);
};

const getContractIdByNumber = (contracts: Contract[], contractNumber: string) => {
    const contract = getContractByNumber(contracts, contractNumber);
    return String(contract?.contractId) || '';
};

interface ReceivableForm {
    contractNumber: string;
    inventoryType: string;
    weight: number;
    quantity: number;
    operatorNote: string;
    averagePrice: number;
}

interface NewReceivableFormProps {
    open: boolean;
    onClose: () => void;
    contracts: Contract[];
    inventoryTypes: InventoryType[];
    onSubmit: (data: CreateReceivable) => void;
    loading: boolean;
}

const NewReceivableFormDialog = ({ open, onClose, contracts, inventoryTypes, onSubmit, loading }: NewReceivableFormProps) => {
    const { t } = useTranslation();
    const { control, getValues, setValue, reset, watch } = useForm<ReceivableForm>({
        defaultValues: {
            contractNumber: '',
            inventoryType: inventoryTypes[0]?.value || '',
            weight: 0,
            quantity: 0,
            operatorNote: '',
            averagePrice: 0
        }
    });
    const getContractOptions = (contracts: Contract[]) => {
        return contracts.map(contract => ({
            value: contract.contractNumber.toString(),
            label: contract.contractNumber.toString(),
        }));
    };

    const findContractById = (id: string) => {
        return getContractOptions(contracts).find(option => option.value === id);
    };

    const handleContractChange = (event: React.SyntheticEvent<Element, Event>, value: string) => {
        const contract = findContractById(value);
        if (contract && event) {
            setValue('contractNumber', contract.value);
            setValue('averagePrice', getContractByNumber(contracts, contract.value)?.averagePurchaseValue || 0);
        } else {
            setValue('contractNumber', '');
            setValue('averagePrice', 0);
        }
    };
    function handleSubmit() {
        const values = getValues();
        const data: CreateReceivable = {
            contractId: Number(getContractIdByNumber(contracts, values.contractNumber)),
            inventoryTypeId: Number(values.inventoryType),
            weight: Number(values.weight),
            quantity: Number(values.quantity),
            operatorNote: values.operatorNote,
            averagePrice: Number(values.averagePrice)
        }
        onSubmit(data);
    }

    const isDisabled = () => {
        const values = getValues();
        return !values.contractNumber || !values.inventoryType || values.weight <= 0 || values.quantity <= 0 || values.averagePrice <= 0;
    };

    const handleClose = () => {
        reset({ contractNumber: '', inventoryType: '', weight: 0, quantity: 0, operatorNote: '', averagePrice: 0 });
        onClose();
    };

    watch('contractNumber');
    watch('inventoryType');
    watch('weight');
    watch('quantity');
    watch('operatorNote');
    watch('averagePrice');

    const selectedContract = getContractByNumber(contracts, watch('contractNumber'));

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>{t('accountsReceivable.newReceivable')}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {t('accountsReceivable.formDescription')}
                </DialogContentText>
                <Divider sx={{ my: 2 }} />
                <Box display="flex" flexDirection="column" gap={2}>
                    <Controller
                        name="contractNumber"
                        control={control}
                        render={({ field }) => {
                            return (
                                <AutocompleteDropdown
                                    options={getContractOptions(contracts)}
                                    label="Contrato"
                                    value={createItem(field.value)}
                                    onChange={handleContractChange}
                                    disableClearable={false}
                                />
                            );
                        }}
                        rules={{ required: t('common.requiredField') }}
                    />
                    {selectedContract ? (
                        <>
                            <ContractSummaryCard contract={selectedContract} hiddenClient />
                            <Controller
                                name="inventoryType"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <Dropdown
                                            value={createItem(field.value)}
                                            onChange={(value) => {
                                                setValue('inventoryType', value?.value || '');
                                            }}
                                            options={inventoryTypes.map(type => ({
                                                value: type.value,
                                                label: type.label,
                                            }))}
                                            label="Tipo de Inventario"
                                            required
                                        />
                                    );
                                }}
                            />
                            <Box display="flex" flexDirection="row" gap={2}>
                                <Controller
                                    name="weight"
                                    control={control}
                                    render={({ field }) => {
                                        return (
                                            <Input
                                                {...field}
                                                type="number"
                                                label="Peso"
                                                required
                                            />
                                        );
                                    }}
                                />
                                <Controller
                                    name="quantity"
                                    control={control}
                                    render={({ field }) => {
                                        return (
                                            <Input
                                                {...field}
                                                type="number"
                                                label="Cantidad"
                                                required
                                            />
                                        );
                                    }}
                                />
                                <Controller
                                    name="averagePrice"
                                    control={control}
                                    render={({ field }) => {
                                        return (
                                            <Input
                                                {...field}
                                                type="number"
                                                label="Precio Promedio"
                                                required
                                            />
                                        );
                                    }}
                                />
                            </Box>
                            <Controller
                                name="operatorNote"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <Input
                                            {...field}
                                            type="textarea"
                                            label="Nota del Operador"
                                            required
                                        />
                                    );
                                }}
                            />
                        </>
                    ) : (
                        <Skeleton variant="rounded" height={324} />
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" disabled={loading}>
                    {t('common.cancel')}
                </Button>
                <Button onClick={handleSubmit} color="secondary" disabled={isDisabled()} loading={loading}>
                    {t('common.create')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default NewReceivableFormDialog;
