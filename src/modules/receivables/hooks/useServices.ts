import { useGetAllInventoryTypes, useGetResolutionContracts } from "@/clients";
import useGetReceivables from "@/clients/get-receivables";
import { ReceivableProps } from "@/clients/get-receivables/client";
import usePostReceivable from "@/clients/post-contract";
import { FetchStatus } from "@/constants";
import { useEffect } from "react";

const useServices = (props: ReceivableProps) => {
    const getReceivables = useGetReceivables();
    const getAllContracts = useGetResolutionContracts();
    const inventoryTypes = useGetAllInventoryTypes();
    const createReceivable = usePostReceivable();

    useEffect(() => {
        if (props.resolutionId && getReceivables.status === FetchStatus.IDLE) {
            getReceivables.call(props);
        }
        if (props.resolutionId && getAllContracts.status === FetchStatus.IDLE) {
            getAllContracts.call(props.resolutionId);
        }
        if (props.resolutionId && inventoryTypes.status === FetchStatus.IDLE) {
            inventoryTypes.call();
        }
    }, [getAllContracts, getReceivables, inventoryTypes, props]);

    const isLoading = () => {
        return (
            getAllContracts.status === FetchStatus.LOADING ||
            getReceivables.status === FetchStatus.LOADING ||
            inventoryTypes.status === FetchStatus.LOADING
        );
    };

    const receivablesResend = (props: ReceivableProps) => {
        getReceivables.reset();
        getReceivables.call(props);
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