import ResolutionMassiveModal from "@/modules/massive-resolution/components/ResolutionMassiveModal";
import { useMassiveResolutionContext } from "../context/useMassiveResolutionContext";
import { useGetResolution } from "@/clients";
import { useEffect } from "react";
import { FetchStatus } from "@/constants";

interface DialogContentProps {
    resolutionId: number | null;
    onClose: () => void;
}

const DialogContent: React.FC<DialogContentProps> = ({ resolutionId, onClose }) => {
    const resolution = useGetResolution();

    useEffect(() => {
        if (resolutionId && resolution.status === FetchStatus.IDLE) {
            resolution.call(resolutionId);
        }
    }, [resolution, resolution.data, resolutionId]);
    if (!resolution.data || resolution.status !== FetchStatus.SUCCESS || !resolutionId || resolution.data.resolutionId !== resolutionId) {
        return null; // or a loading state
    }
    return (
        <ResolutionMassiveModal
            resolution={resolution.data}
            onClose={onClose}
        />
    );
};

const MassiveResolutionDialog = () => {
    const massiveResolutionContext = useMassiveResolutionContext();
    return (
        <DialogContent
            resolutionId={massiveResolutionContext.resolutionId}
            onClose={() => massiveResolutionContext.setResolutionId(null)}
        />
    );
}

export default MassiveResolutionDialog;
