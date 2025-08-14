export type Receivable = {
    id: number;
    contractId: number | string;
    createdBy: number;
    reviewedBy: number;
    typeId: number;
    weight: number;
    quantity: number;
    operatorNote: string;
    administratorNote: string;
    averagePrice: number;
    status: boolean;
    observation: string;
    createdAt: string;
    updatedAt: string;
    createdByName: string;
    reviewedByName: string;
    typeName: string;
}