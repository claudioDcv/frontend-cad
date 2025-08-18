import { useGetAllInventoryTypes, useGetResolutionContracts } from "@/clients";
import useGetReceivables from "@/clients/get-receivables";
import usePostReceivable from "@/clients/post-contract";
import { FetchStatus } from "@/constants";
import { useEffect } from "react";

const useServices = (resolutionId: number | null) => {
    const getReceivables = useGetReceivables();
    const getAllContracts = useGetResolutionContracts();
    const inventoryTypes = useGetAllInventoryTypes();
    const createReceivable = usePostReceivable();

    useEffect(() => {
        if (resolutionId && getReceivables.status === FetchStatus.IDLE) {
            getReceivables.call(resolutionId);
        }
        if (resolutionId && getAllContracts.status === FetchStatus.IDLE) {
            getAllContracts.call(resolutionId);
        }
        if (resolutionId && inventoryTypes.status === FetchStatus.IDLE) {
            inventoryTypes.call();
        }
    }, [getAllContracts, getReceivables, inventoryTypes, resolutionId]);

    const isLoading = () => {
        return (
            getAllContracts.status === FetchStatus.LOADING ||
            getReceivables.status === FetchStatus.LOADING ||
            inventoryTypes.status === FetchStatus.LOADING
        );
    };

    const receivablesResend = (resolutionId: number) => {
        getReceivables.reset();
        getReceivables.call(resolutionId);
    };

    return {
        receivablesResend,
        createReceivable: createReceivable.call,
        contracts: getAllContracts.data || [],
        receivables: getReceivables.data || [],
        inventoryTypes: inventoryTypes.data || [],
        loading: isLoading()
    };
};

export default useServices;