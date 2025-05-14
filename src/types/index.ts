export interface Jewel {
    id: string;
    label: string;
}

export type MaterialType = 'Gold' | 'Silver' | 'ExclusiveBrand' | 'Collected';

export interface Contract {
    id: string;
    jewels: Jewel[];
}

export interface PreResolution {
    id: string;
    materialType: MaterialType;
    contracts: Contract[];
}
