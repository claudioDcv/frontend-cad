import { Card, Box, Typography, Tooltip } from '@mui/material';
import { formatCurrency, formatDateHour, formatNumberWithGr } from '../../../utils';
import { DisplayData } from '../..';
import { useTranslation } from 'react-i18next';
import theme from '@/conf/theme';
import { Receivable } from '@/entities/Receivable.entity';

interface ReceivableSummaryCardProps {
    receivable: Receivable;
    contractAveragePurchaseValue?: number;
}

const ReceivableSummaryCard: React.FC<ReceivableSummaryCardProps> = ({ receivable, contractAveragePurchaseValue }) => {
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

    const smallStyle = { fontSize: '0.75rem', color: theme.palette.text.secondary };
    const getAveragePrice = () => {
        if (contractAveragePurchaseValue) {
            if (receivable.averagePrice !== contractAveragePurchaseValue) {
                return <Tooltip title={t('accountsReceivable.averagePriceTooltipModified')}>
                    <div>
                        <strong>{formatCurrency(receivable.averagePrice)}</strong> <small style={smallStyle}>({formatCurrency(contractAveragePurchaseValue)})</small>
                    </div>
                </Tooltip>;
            }
            return formatCurrency(contractAveragePurchaseValue);
        }
        if (receivable.averagePrice) {
            return formatCurrency(receivable.averagePrice);
        }
        return null;
    }
    return (
        <Card variant="outlined" sx={{ backgroundColor: theme.palette.background.paper }}>
            <Box
                p={2}
                gap={2}
            >
                <Typography variant="h6" component="h2" fontSize={theme.typography.h6.fontSize} fontWeight="regular">
                    {t('accountsReceivable.summaryTitle')}
                </Typography>

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
                        value={getAveragePrice()}
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
                    <DisplayData label={lang.administratorNote} value={receivable.administratorNote} />
                </Box>
            </Box>
        </Card>
    );
}

export default ReceivableSummaryCard;
