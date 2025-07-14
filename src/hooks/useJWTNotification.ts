import { useEffect, useState } from 'react';

interface Message {
  action: string;
  code?: string;
  hostUrl: string;
}

const TOKEN_KEY = 'TOKEN_KEY';

// TODO: Change this to false when not in host URL
const ON_HOST_URL = true;

export const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    return token;
  }
  return '';
};

const useJWTNotification = () => {
  const [hostUrl, setHostUrl] = useState<string>('');
  const [token, setToken] = useState<string | null>(null);
  const requestCode = () => {
    window.parent.postMessage({ action: 'requestCode' }, '*');
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent<Message>) => {
      if (event.data.action === 'sendCode') {
        if (ON_HOST_URL) {
          const hostUrl = event.data.hostUrl.split('#')[1];
          if (hostUrl) {
            setHostUrl(hostUrl);
            console.log('Host URL:', hostUrl);
          }
        }
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

  return { requestCode, token, hostUrl };
};

export default useJWTNotification;
