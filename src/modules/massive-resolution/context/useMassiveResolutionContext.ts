import { use } from "react";
import MassiveResolutionContext from "./MassiveResolutionContext";

export const useMassiveResolutionContext = () => {
    const context = use(MassiveResolutionContext);
    if (!context) {
        throw new Error("useMassiveResolutionContext must be used within a MassiveResolutionContext");
    }
    return context;
};
