import { ResolutionMetadata } from '@/entities/Resolution.entity';

interface I18N {
  sent: string;
}

export const initialState18N: I18N = {
  sent: 'Enviado a CAD',
};

export interface DocumentStatusProps {
  i18n?: Partial<I18N>;
  statusId: number;
  statusName?: string;
  metadata?: ResolutionMetadata | null;
}
