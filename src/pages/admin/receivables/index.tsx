import useGetReceivables from "@/clients/get-receivables";
import { ReceivableProps } from "@/clients/get-receivables/client";
import { ResolutionDetailButton } from "@/components";
import Pagination from "@/components/molecules/pagination";
import Table from "@/components/organisms/table";
import { FetchStatus } from "@/constants";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const ReceivablesAdmin = () => {
    const [filters, setFilters] = useState<ReceivableProps>({
        page: 1,
        size: 15,
    });
    const { t } = useTranslation();
    const receivables = useGetReceivables();

    useEffect(() => {
        if (receivables.status === FetchStatus.IDLE) {
            receivables.call(filters);
        }
    }, [filters, receivables]);

    const handleChangePage = (_p: unknown, page: number) => {
        setFilters((prev) => ({ ...prev, page }));
        receivables.call({
            ...filters,
            page
        });
    };

    return (
        <div>
            <Box mt={2}>
                <Table
                    messageVoidData="No hay cuentas por cobrar"
                    rows={receivables.data.content}
                    columns={[
                        { id: 'contractId', label: 'Contrato' },
                        { id: 'quantity', label: 'Cantidad' },
                        { id: 'weight', label: 'Peso' },
                        { id: 'createdByName', label: 'Creado por' },
                        { id: 'reviewedByName', label: 'Revisado por' },
                        { id: 'typeName', label: 'Tipo', render: (row) => t(`inventoryType.${row.typeName}`) },
                        {
                            id: 'id', label: 'Ver', render: () => <ResolutionDetailButton
                                id={''}
                                label={t('common.view')}
                            />
                        },
                    ]}
                    loading={receivables.status === FetchStatus.LOADING}
                />
                <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Pagination
                        {...receivables.data.meta}
                        onChange={handleChangePage}
                    />
                </Box>
            </Box>
        </div>
    );
};

export default ReceivablesAdmin;
