import { API_BASE } from '../../conf/http';
import { Contract } from '@/entities/Contract.entity';
import { clearAllProps, getHeader } from '../utils';
import { formatToDDMMYYYY } from '@/utils';

const remap = (data: Contract[]): Contract[] => data.map((contract) => ({
  ...contract,
  totalWeight: contract.totalWeight || 0,
  averagePurchaseValue: contract.averagePurchaseValue || 0,
  totalContractValue: contract.totalContractValue || 0,
  responsibleName: contract.responsibleName || '',
  endDate: formatToDDMMYYYY(contract.endDate),
  clientName: contract.clientName || '',
  clientRut: contract.clientRut || '',
}));

const client = async (resolutionId: string): Promise<Contract[]> => {
  const params = {
    resolutionId,
  }

  const query = new URLSearchParams(clearAllProps(params));
  const url = `${API_BASE}/contracts/all?${query}`;

  const response = await fetch(url, {
    headers: getHeader(),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('error.getAllContractsFetch');
  }

  try {
    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('error.getAllContractsParse');
    }
    return remap(data);
  } catch {
    throw new Error('error.getAllContractsParse');
  }
};

export default client;
