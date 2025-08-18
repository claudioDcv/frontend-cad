import { Box, LinearProgress } from "@mui/material";
import { useEffect } from "react";
import useGetContract from "@/clients/get-contract";
import { FetchStatus } from "@/constants";
import { Receivable } from "@/entities/Receivable.entity";

interface ReceivableDetailsProps {
    receivable: Receivable;
}

const ReceivableDetails = ({ receivable }: ReceivableDetailsProps) => {
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
        <Box>
            <pre>
                {JSON.stringify(receivable, null, 2)}
                {JSON.stringify(contract.data, null, 2)}
            </pre>
        </Box>
    );
};

export default ReceivableDetails;
