import { useState } from "react";
import ReceivablesContext from "./ReceivablesContext";
import ReceivablesOperatorDialog from "../components";

interface ReceivablesProviderProps {
    children: React.ReactNode;
}

const ReceivablesProvider = ({ children }: ReceivablesProviderProps) => {
    const [resolutionId, setResolutionId] = useState<number | null>(null);

    return (
        <ReceivablesContext.Provider value={{ resolutionId, setResolutionId }}>
            {children}
            <ReceivablesOperatorDialog />
        </ReceivablesContext.Provider>
    );
};

export default ReceivablesProvider;
