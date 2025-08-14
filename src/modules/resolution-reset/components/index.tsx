import { Input } from "@/components";
import { FetchStatus } from "@/constants";
import { Button } from "@mui/material";
import { useState } from "react";
import client from "../clients/reset-resolution";

const useResolutionReset = () => {
    const [status, setStatus] = useState(FetchStatus.IDLE);
    const executeReset = async (resolution: string) => {
        setStatus(FetchStatus.LOADING);
        try {
            await client(resolution);
            setStatus(FetchStatus.SUCCESS);
        } catch (error) {
            console.error("Error resetting resolution:", error);
            setStatus(FetchStatus.ERROR);
        }
    };
    const resetStatus = () => {
        setStatus(FetchStatus.IDLE);
    };

    return { status, executeReset, resetStatus };
};

const ResolutionReset = () => {
    const [value, setValue] = useState('');
    const reset = useResolutionReset();
    return (
        <div>
            <Input label="Resolución a Resetear" value={value} onChange={(e) => setValue(e.target.value)} />
            <Button
                onClick={async () => {
                    await reset.executeReset(value);
                    setValue('');
                    reset.resetStatus();
                }}
            >
                Resetear
            </Button>
            {reset.status === FetchStatus.LOADING && <p>Loading...</p>}
            {reset.status === FetchStatus.ERROR && <p>Error resetting resolution</p>}
            {reset.status === FetchStatus.SUCCESS && <p>Resolution reset successfully</p>}
        </div>
    )
}

export default ResolutionReset;