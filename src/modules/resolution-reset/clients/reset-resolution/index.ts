import { getHeader } from '@/clients/utils';
import { API_BASE } from '@/conf/http';
import { Send } from '@/entities/Send.entity';


const client = async (id: string): Promise<Send> => {
    const url = `${API_BASE}/resolutions/${id}/reset`;

    const response = await fetch(url, {
        headers: getHeader(),
        credentials: 'include',
        method: 'POST',
    });

    if (!response.ok) {
        throw new Error('ERROR');
    }

    try {
        return response.json();
    } catch {
        throw new Error('ERROR');
    }
};

export default client;
