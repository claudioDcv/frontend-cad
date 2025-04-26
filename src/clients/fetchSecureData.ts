import { API_BASE } from '../conf/http';

export const fetchSecureData = async (jwt: string) => {
    const url = `${API_BASE}/api/v1/secure/data`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `${jwt}`, // 👉 ahora usamos el parámetro
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};
