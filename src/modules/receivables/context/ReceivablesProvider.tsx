import { useState } from "react";
import ReceivablesContext from "./ReceivablesContext";
import ReceivablesOperatorDialog from "../components";

interface ReceivablesProviderProps {
    children: React.ReactNode;
}

const ReceivablesProvider = ({ children }: ReceivablesProviderProps) => {
    const [resolutionId, setResolutionId] = useState<number | null>(null);

    const handleSetResolutionId = (id: number | string | null) => {
        setResolutionId(Number.isNaN(Number(id)) ? null : Number(id));
    };

    return (
        <ReceivablesContext.Provider value={{ resolutionId, setResolutionId: handleSetResolutionId }}>
            {children}
            <ReceivablesOperatorDialog />
        </ReceivablesContext.Provider>
    );
};

export default ReceivablesProvider;
