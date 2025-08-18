import { useState } from "react";
import MassiveResolutionContext from "./MassiveResolutionContext";
import MassiveResolutionDialog from "../components/MassiveResolutionDialog";

interface ReceivablesProviderProps {
    children: React.ReactNode;
}

const MassiveResolutionProvider = ({ children }: ReceivablesProviderProps) => {
    const [resolutionId, setResolutionId] = useState<number | null>(null);

    const handleSetResolutionId = (id: number | string | null) => {
        setResolutionId(Number.isNaN(Number(id)) ? null : Number(id));
    };

    return (
        <MassiveResolutionContext.Provider value={{ resolutionId, setResolutionId: handleSetResolutionId }}>
            {children}
            <MassiveResolutionDialog />
        </MassiveResolutionContext.Provider>
    );
};

export default MassiveResolutionProvider;
