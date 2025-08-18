import React from "react";

interface MassiveResolutionContextProps {
    resolutionId: number | null;
    setResolutionId: (id: number | string | null) => void;
}

const MassiveResolutionContext = React.createContext<MassiveResolutionContextProps>({
    resolutionId: null,
    setResolutionId: () => { },
});

export default MassiveResolutionContext;
