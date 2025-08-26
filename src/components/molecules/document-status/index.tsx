import CadIcon from "@/components/atoms/cad-icon";
import { statusToKeyMap } from "@/constants";
import { ResolutionMetadata } from "@/entities/Resolution.entity";
import { Chip, Tooltip } from "@mui/material";

interface DocumentStatusProps {
    statusId: number;
    statusName?: string;
    metadata?: ResolutionMetadata | null;
}

const DocumentStatus: React.FC<DocumentStatusProps> = ({ statusId, statusName, metadata }) => {
    const { color } = statusToKeyMap[statusId] || {};
    const extraProps = {
        icon: metadata ? <CadIcon color={color} /> : undefined, 
    }
    const text = metadata ? 'Enviado a CAD' : statusName;
    return (<Tooltip title={text} arrow placement="top">
        <Chip size="small" label={statusName} color={color} variant="outlined" {...extraProps} />
    </Tooltip>);
};

export default DocumentStatus;
