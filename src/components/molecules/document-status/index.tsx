import { statusToKeyMap } from "@/constants";
import { Chip } from "@mui/material";

interface DocumentStatusProps {
    statusId: number;
    statusName?: string;
}

const DocumentStatus: React.FC<DocumentStatusProps> = ({ statusId, statusName }) => {
    const { color } = statusToKeyMap[statusId] || {};
    return <Chip size="small" label={statusName} color={color} />;
};

export default DocumentStatus;
