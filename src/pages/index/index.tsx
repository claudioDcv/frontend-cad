import { useState } from 'react';
import { getToken } from '../../hooks/useJWTNotification';
import { MaterialType } from '../../clients/get-all-material-types/types';
import { fetchHealthCheck, fetchSecureData } from '../../clients';
import client from '../../clients/get-all-material-types/client';


const Index = () => {
  const [secureDataResponse, setSecureDataResponse] = useState(null);
  const [healthCheckResponse, setHealthCheckResponse] = useState<string | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [materialType, setMaterialType] = useState<MaterialType[] | null>(null);

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

  const handleFetchMaterialType = async () => {
    try {
      const jwt = getToken();
      const result = await client(jwt);
      setMaterialType(result);
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <div>
      <h1>Index-Daniel</h1>
      <div>
        <h2>jwt: {getToken().substring(0, 20)}...</h2>
      </div>
      <div>
        <button onClick={handleHealthCheck}>request: /api/v1/health</button>
        <button onClick={handleFetchSecureData}>
          request: (/api/v1/secure/data)
        </button>
        <button onClick={handleFetchMaterialType}>Material Type: </button>
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
      {materialType && (
        <div>
          <h2>Material Type:</h2>
          <ul>
            {materialType.map((r) => (
              <li key={r.categoryId}>
                <strong>{r.categoryName}</strong> ({r.categoryCode}) -{' '}
                {r.measurementUnit} - Margen: {r.minimumProfitMargin}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Index;
