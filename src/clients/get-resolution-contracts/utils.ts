import { Contract } from "@/entities/Contract.entity";
import { formatToDDMMYYYY } from "@/utils";

export const remap = (data: Contract[]): Contract[] =>
    data.map((contract) => ({
        ...contract,
        totalWeight: contract.totalWeight || 0,
        averagePurchaseValue: contract.averagePurchaseValue || 0,
        totalContractValue: contract.totalContractValue || 0,
        responsibleName: contract.responsibleName || '',
        endDate: formatToDDMMYYYY(contract.endDate),
        clientName: contract.clientName || '',
        clientRut: contract.clientRut || '',
    }));