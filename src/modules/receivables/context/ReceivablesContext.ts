import React from "react";

interface ReceivablesContextProps {
    resolutionId: number | null;
    setResolutionId: (id: number | null) => void;
}

const ReceivablesContext = React.createContext<ReceivablesContextProps>({
    resolutionId: null,
    setResolutionId: () => { },
});

export default ReceivablesContext;
