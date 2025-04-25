import { API_BASE } from '../conf/http';
import { getToken } from '../hooks/useJWTNotification';

export const fetchSecureData = async () => {
    const url = `${API_BASE}/api/v1/secure/data`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `${getToken()}`,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};