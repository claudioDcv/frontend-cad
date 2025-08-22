import { Inventory } from '@/entities/Inventory.entity';
import { postFetch } from '../customFetch';
import { ResolutionSendResponse } from '@/entities/ResolutionSendResonse.entity';

export interface Props {
  resolutionId: number;
  inventories: Inventory[];
}

/* Cambiar response
{
  message: "OK: Inventory successfully processed. Generated ID: 196, CXC Records: 0",
  resolutionId: "306402033"
}

{
  resolutionId: 306402033,
  sendedId: 196
  receivableCount: 0
}
*/
const client = async (data: Props): Promise<ResolutionSendResponse> => postFetch<ResolutionSendResponse>(
  `resolutions/${data.resolutionId}/send`,
  data,
  {
    requestBody: (data: Props) => (data.inventories.map(e => ({
      inventoryTypeId: Number(e.inventoryType.value),
      quantity: e.quantity,
      weight: e.weight,
    }))),
  },
  {
    responseError: 'error.postResolutionSendFetch',
    defaultError: 'error.postResolutionSendParse',
  });

export default client;
