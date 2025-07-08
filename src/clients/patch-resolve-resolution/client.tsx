//import { API_BASE } from '../../conf/http';
import { Resolution } from '@/entities/Resolution.entity';
//import { getHeader } from '../utils';

/*

const client = async (props: Resolution): Promise<Resolution> => {
  const url = `${API_BASE}/resolutions/${props.resolutionId}/resolve`;

  const response = await fetch(url, {
    headers: getHeader(),
    credentials: 'include',
    method: 'PATCH',
    body: JSON.stringify({
      //Despues agregar aca los datos que de modifican
    }),
  });

  if (!response.ok) {
    throw new Error('error.patchResolveResolutionFetch');
  }

  try {
    return response.json();
  } catch {
    throw new Error('error.patchResolveResolutionParse');
  }
};
*/

const client = async (props: Resolution): Promise<boolean> => {
  // Simulación temporal: retorna true directamente
  return new Promise((resolve) => {
    console.log(props)
    setTimeout(() => resolve(true), 200); 
  });
};


export default client;
