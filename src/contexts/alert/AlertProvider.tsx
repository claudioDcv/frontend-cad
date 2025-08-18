import React, { useState, useCallback } from 'react';
import { AlertContext } from './AlertContext';
import { Alert } from './types';
import { Snackbar, Alert as MuiAlert, SnackbarOrigin } from '@mui/material';
import { Trans } from 'react-i18next';

interface AlertProviderProps {
    children: React.ReactNode;
}

const generateUniqueId = (() => {
    let counter = 0;
    return () => {
        counter += 1;
        return `alert-${counter}`;
    };
})();

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
    const [alerts, setAlerts] = useState<Alert[]>([]);

    const removeAlert = useCallback((id: string) => {
        setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, []);

    const addAlert = useCallback((alert: Omit<Alert, 'id'>) => {
        const id = generateUniqueId();
        setAlerts((prev) => [...prev, { ...alert, id }]);

        if (alert.duration !== 0) {
            setTimeout(() => {
                removeAlert(id);
                if (alert.callback) {
                    alert.callback();
                }
            }, alert.duration || 2000);
        }
    }, [removeAlert]);

    const anchorOrigin: SnackbarOrigin = { vertical: 'top', horizontal: 'right' };

    return (
        <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
            {children}
            {alerts.map(({ id, type, title, message, dismissible }) => (
                <Snackbar
                    key={id}
                    open
                    autoHideDuration={null}
                    onClose={() => dismissible && removeAlert(id)}
                    anchorOrigin={anchorOrigin}
                >
                    <MuiAlert
                        severity={type}
                        onClose={dismissible ? () => removeAlert(id) : undefined}
                    >
                        <div>
                            <strong>{title}</strong>
                        </div>
                        {message && <Trans components={{ strong: <strong /> }}>{message}</Trans>}
                    </MuiAlert>
                </Snackbar>
            ))}
        </AlertContext.Provider>
    );
};