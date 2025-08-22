import useGetContract from "@/clients/get-contract";
import { ContractSummaryCard, ReceivableSummaryCard } from "@/components";
import ModalHeader from "@/components/molecules/modal-header";
import { FetchStatus } from "@/constants";
import { Receivable } from "@/entities/Receivable.entity";
import { Button, Dialog, DialogActions, DialogContent, LinearProgress } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface ViewContentProps {
    receivable: Receivable;
    onClose: () => void;
}

const ViewContent = ({ receivable, onClose }: ViewContentProps) => {
    const { t } = useTranslation();
    const getContract = useGetContract();
    useEffect(() => {
        if (receivable && getContract.status === FetchStatus.IDLE) {
            getContract.call(receivable.contractId);
        }
    }, [receivable, getContract]);
    if (getContract.status === FetchStatus.LOADING || !getContract.data) {
        return (
            <LinearProgress />
        );
    }
    return (
        <div>
            <ModalHeader title={t('accountsReceivable.viewReceivable')} onClose={onClose} />
            <DialogContent sx={{ gap: 2, display: 'flex', flexDirection: 'column' }}>
                <ContractSummaryCard contract={getContract.data} />
                <ReceivableSummaryCard receivable={receivable} contractAveragePurchaseValue={getContract.data.averagePurchaseValue} />
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={onClose}
                >
                    {t('common.reject')}
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    onClick={onClose}
                >
                    {t('common.accept')}
                </Button>
            </DialogActions>
        </div>
    );
};

interface ViewProps {
    receivable: Receivable | null;
    onClose: () => void;
}

const View = ({ receivable, onClose }: ViewProps) => {

    return (
        <Dialog open={Boolean(receivable)} onClose={onClose} fullWidth maxWidth="lg">
            {receivable && <ViewContent receivable={receivable} onClose={onClose} />}
        </Dialog>
    );
};

export default View;
