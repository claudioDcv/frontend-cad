import { useGetAllInventoryTypes, useGetReceivables, useGetResolutionContracts, usePostCreateReceivable } from "@/clients";
import { ReceivableProps } from "@/clients/get-receivables/client";
import { FetchStatus } from "@/constants";
import { useEffect } from "react";

const useServices = (props: ReceivableProps) => {
    const getReceivables = useGetReceivables();
    const getAllContracts = useGetResolutionContracts();
    const inventoryTypes = useGetAllInventoryTypes();
    const createReceivable = usePostCreateReceivable();

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