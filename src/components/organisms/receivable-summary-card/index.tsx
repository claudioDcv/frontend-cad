import { Card, Box } from '@mui/material';
import { formatCurrency, formatDateHour, formatNumberWithGr } from '../../../utils';
import { DisplayData } from '../..';
import { useTranslation } from 'react-i18next';
import theme from '@/conf/theme';
import { Receivable } from '@/entities/Receivable.entity';

interface ReceivableSummaryCardProps {
    receivable: Receivable;
}

const ReceivableSummaryCard: React.FC<ReceivableSummaryCardProps> = ({ receivable }) => {
    const { t } = useTranslation();
    const lang = {
        id: t('accountsReceivable.id'),
        contractId: t('accountsReceivable.contractId'),
        createdBy: t('accountsReceivable.createdBy'),
        reviewedBy: t('accountsReceivable.reviewedBy'),
        typeId: t('accountsReceivable.typeId'),
        weight: t('accountsReceivable.weight'),
        quantity: t('accountsReceivable.quantity'),
        operatorNote: t('accountsReceivable.operatorNote'),
        administratorNote: t('accountsReceivable.administratorNote'),
        averagePrice: t('accountsReceivable.averagePrice'),
        status: t('accountsReceivable.status'),
        observation: t('accountsReceivable.observation'),
        createdAt: t('accountsReceivable.createdAt'),
        updatedAt: t('accountsReceivable.updatedAt'),
        createdByName: t('accountsReceivable.createdByName'),
        reviewedByName: t('accountsReceivable.reviewedByName'),
        typeName: t('accountsReceivable.typeName'),
    }
    return (
        <Card variant="outlined" sx={{ backgroundColor: theme.palette.background.paper }}>
            <Box
                p={2}
                gap={2}
            >
                <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
                    <DisplayData
                        label={lang.weight}
                        value={formatNumberWithGr(receivable.weight)}
                    />
                    <DisplayData
                        label={lang.weight}
                        value={formatNumberWithGr(receivable.quantity)}
                    />
                    <DisplayData
                        label={lang.averagePrice}
                        value={formatCurrency(receivable.averagePrice)}
                    />
                </Box>
                <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
                    <DisplayData
                        label={lang.createdByName}
                        value={receivable.createdByName}
                    />
                    <DisplayData
                        label={lang.reviewedByName}
                        value={receivable.reviewedByName}
                    />
                    <DisplayData
                        label={lang.createdAt}
                        value={formatDateHour(receivable.createdAt)}
                    />
                </Box>
                <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
                    <DisplayData label={lang.operatorNote} value={receivable.operatorNote} />
                    <DisplayData label={lang.operatorNote} value={receivable.operatorNote} />
                </Box>
            </Box>
        </Card>
    );
}

export default ReceivableSummaryCard;
