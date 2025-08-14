import { useState } from "react";
import {
    Dialog,
    Button,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface ConfirmProps {
    title?: string;
    description?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    response: (data?: any) => void;
    cancel?: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: (showDialog: (data?: any) => void) => React.ReactNode;
}

function Confirm(props: ConfirmProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [dataTransfer, setDataTransfer] = useState<any>();
    const { t } = useTranslation();
    //local states
    const [open, setOpen] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const showDialog = (newData?: any) => {
        setDataTransfer(newData);
        setOpen(true);
    };

    const hideDialog = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        if (props.cancel) props.cancel();
        hideDialog();
    }

    const confirmRequest = () => {
        props.response(dataTransfer);
        hideDialog();
    };

    return (
        <>
            {props.children(showDialog)}
            {open && (
                <Dialog
                    open={open}
                    onClose={hideDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{props.title || t("confirm.confirmation")}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {props.description || t("confirm.areYouSure")}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancel} color="success" autoFocus variant="outlined">
                            {t("confirm.no")}
                        </Button>
                        <Button onClick={confirmRequest} color="warning" variant="outlined">
                            {t("confirm.yes")}
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
}

export default Confirm;
