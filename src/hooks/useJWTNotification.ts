import { useEffect, useState } from 'react';

interface Message {
    action: string;
    code?: string;
}

const TOKEN_KEY = 'TOKEN_KEY';

export const getToken = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
        return token;
    }
    return '';
}

const useJWTNotification = () => {
    const [token, setToken] = useState<string | null>(null);
    const requestCode = () => {
        window.parent.postMessage({ action: 'requestCode' }, '*');
    };

    useEffect(() => {
        const handleMessage = (event: MessageEvent<Message>) => {
            if (event.data.action === 'sendCode') {
                console.log(event.data.code);
                if (event.data.code) {
                    setToken(event.data.code);
                    localStorage.setItem(TOKEN_KEY, event.data.code);
                }
            }
        };
        window.addEventListener('message', handleMessage);
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    return { requestCode, token };
}

export default useJWTNotification;
