import { use } from "react";
import ReceivablesContext from "./ReceivablesContext";

export const useReceivablesContext = () => {
    const context = use(ReceivablesContext);
    if (!context) {
        throw new Error("useReceivablesContext must be used within a ReceivablesProvider");
    }
    return context;
};
