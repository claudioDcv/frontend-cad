import useGetContract from "@/clients/get-contract";
import { ContractSummaryCard, ReceivableSummaryCard } from "@/components";
import ModalHeader from "@/components/molecules/modal-header";
import { FetchStatus } from "@/constants";
import { Receivable } from "@/entities/Receivable.entity";
import { Button, Dialog, DialogActions, DialogContent, LinearProgress, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface ViewContentProps {
    receivable: Receivable;
    onClose: () => void;
    onAccept: (data: Receivable) => void;
    onReject: (data: Receivable) => void;
}

const ViewContent = ({ receivable, onClose, onAccept, onReject }: ViewContentProps) => {
    const [message, setMessage] = useState<string>('');
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

    const handleAccept = () => {
        onAccept({
            ...receivable,
            administratorNote: message,
            status: true,
        });
    };

    const handleReject = () => {
        onReject({
            ...receivable,
            administratorNote: message,
            status: false,
        });
    };

    const handleChangeNote = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    return (
        <div>
            <ModalHeader title={t('accountsReceivable.viewReceivable')} onClose={onClose} />
            <DialogContent sx={{ gap: 2, display: 'flex', flexDirection: 'column' }}>
                <ContractSummaryCard contract={getContract.data} />
                <ReceivableSummaryCard receivable={receivable} contractAveragePurchaseValue={getContract.data.averagePurchaseValue} />
                <TextField
                    label={t('common.note')}
                    value={message}
                    onChange={handleChangeNote}
                    disabled={receivable.status !== null}
                />
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={handleReject}
                    disabled={receivable.status !== null}
                >
                    {t('common.reject')}
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleAccept}
                    disabled={receivable.status !== null}
                >
                    {t('common.approve')}
                </Button>
            </DialogActions>
        </div>
    );
};

interface ViewProps {
    receivable: Receivable | null;
    onClose: () => void;
    onAccept: (data: Receivable) => void;
    onReject: (data: Receivable) => void;
}

const View = ({ receivable, onClose, onAccept, onReject }: ViewProps) => {

    return (
        <Dialog open={Boolean(receivable)} onClose={onClose} fullWidth maxWidth="lg">
            {receivable && <ViewContent receivable={receivable} onClose={onClose} onAccept={onAccept} onReject={onReject} />}
        </Dialog>
    );
};

export default View;
