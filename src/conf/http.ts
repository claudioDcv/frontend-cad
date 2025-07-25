export const API_BASE = import.meta.env.VITE_CAD_API_URL || 'http://localhost:80/api/v1';
export const VITE_MOCK_API = import.meta.env.VITE_MOCK_API === 'false';
export const WEBSOCKET_BASE = import.meta.env.VITE_WEBSOCKET_BASE || 'http://172.16.22.240:3003/ws/notifications';
