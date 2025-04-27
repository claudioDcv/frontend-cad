import { useState } from 'react';
import { getToken } from '../../hooks/useJWTNotification';
import { fetchSecureData } from '../../clients/fetchSecureData';
import { fetchHealthCheck } from "../../clients/fetchHealthCheck";

const Index = () => {
    const [secureDataResponse, setSecureDataResponse] = useState(null);
    const [healthCheckResponse, setHealthCheckResponse] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFetchSecureData = async () => {
        try {
            const jwt = getToken();
            const result = await fetchSecureData(jwt);
            setSecureDataResponse(result);
            setError(null);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : String(err));
        }
    };

    const handleHealthCheck = async () => {
        try {
            const result = await fetchHealthCheck();
            setHealthCheckResponse(result);
            setError(null);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : String(err));
        }
    };

    return (
        <div>
            <h1>Index</h1>
            <div>
                <h2>
                    jwt: {getToken().substring(0, 20)}...
                </h2>
            </div>
            <div>
                <button onClick={handleHealthCheck}>
                    request: /api/v1/health
                </button>
                <button onClick={handleFetchSecureData}>
                    request: (/api/v1/secure/data)
                </button>
            </div>
            {error && (
                <div>
                    <p>error: {error}</p>
                </div>
            )}
            {healthCheckResponse && (
                <div>
                    <h2>response: /api/v1/health</h2>
                    <p>{healthCheckResponse}</p>
                </div>
            )}
            {secureDataResponse && (
                <div>
                    <h2>response: /api/v1/secure/data</h2>
                    <pre>{JSON.stringify(secureDataResponse, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default Index;
