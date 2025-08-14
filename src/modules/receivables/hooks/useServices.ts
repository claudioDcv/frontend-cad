import { useGetResolutionContracts } from "@/clients";
import useGetReceivables from "@/clients/get-receivables";
import { FetchStatus } from "@/constants";
import { useEffect } from "react";

const useServices = (resolutionId: number | null) => {
    const getReceivables = useGetReceivables();
    const getAllContracts = useGetResolutionContracts();

    useEffect(() => {
        if (resolutionId && getReceivables.status === FetchStatus.IDLE) {
            getReceivables.call(resolutionId);
        }
        if (resolutionId && getAllContracts.status === FetchStatus.IDLE) {
            getAllContracts.call(resolutionId);
        }
    }, [getAllContracts, getReceivables, resolutionId]);

    return {
        contracts: getAllContracts.data || [],
        receivables: getReceivables.data || [],
        loading: getAllContracts.status === FetchStatus.LOADING || getReceivables.status === FetchStatus.LOADING
    };
};

export default useServices;