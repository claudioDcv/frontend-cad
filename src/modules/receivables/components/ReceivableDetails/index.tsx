import { Box, LinearProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import useGetContract from "@/clients/get-contract";
import { FetchStatus } from "@/constants";
import { Receivable } from "@/entities/Receivable.entity";
import { ContractSummaryCard, ReceivableSummaryCard } from "@/components";
import { useTranslation } from "react-i18next";

interface ReceivableDetailsProps {
    receivable: Receivable;
}

const ReceivableDetails = ({ receivable }: ReceivableDetailsProps) => {
    const { t } = useTranslation();
    const contract = useGetContract();
    useEffect(() => {
        if (receivable.contractId) {
            contract.call(receivable.contractId);
        }
    }, [contract, receivable.contractId]);

    if (contract.status === FetchStatus.LOADING || contract.data === null) {
        return <LinearProgress />;
    }

    return (
        <Box gap={2} display="grid" gridTemplateColumns="1fr" >
            <div>
                <Typography mt={2}>{t('accountsReceivable.contractTitle')}</Typography>
                <ContractSummaryCard contract={contract.data} />
            </div>
            <div>
                <Typography>{t('accountsReceivable.receivableDetails')}</Typography>
                <ReceivableSummaryCard receivable={receivable} />
            </div>
        </Box>
    );
};

export default ReceivableDetails;
