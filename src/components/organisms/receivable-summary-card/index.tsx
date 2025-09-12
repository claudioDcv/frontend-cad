import { Card, Box, Typography } from '@mui/material';
import {
  formatDateHour,
  formatNumberWithGr,
  renderAveragePrice,
} from '../../../utils';
import { DisplayData } from '../..';
import { useTranslation } from 'react-i18next';
import { Receivable } from '@/entities/Receivable.entity';
import tsStyles from './index.styles';

interface ReceivableSummaryCardProps {
  receivable: Receivable;
  contractAveragePurchaseValue?: number;
}

const ReceivableSummaryCard: React.FC<ReceivableSummaryCardProps> = ({
  receivable,
  contractAveragePurchaseValue,
}) => {
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
  };

  return (
    <Card variant="outlined" sx={tsStyles.card}>
      <Box sx={tsStyles.mainBox}>
        <Typography variant="h6" component="h2" sx={tsStyles.title}>
          {t('accountsReceivable.summaryTitle')}
        </Typography>

        <Box sx={tsStyles.gridContainer}>
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
            value={renderAveragePrice(
              receivable.averagePrice,
              contractAveragePurchaseValue,
              t('accountsReceivable.averagePriceTooltipModified')
            )}
          />
        </Box>
        <Box sx={tsStyles.gridContainer}>
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
        <Box sx={tsStyles.gridContainer}>
          <DisplayData
            label={lang.operatorNote}
            value={receivable.operatorNote}
          />
          <DisplayData
            label={lang.administratorNote}
            value={receivable.administratorNote}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default ReceivableSummaryCard;
