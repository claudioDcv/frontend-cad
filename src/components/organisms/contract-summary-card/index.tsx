import { Card, Box, Typography } from '@mui/material';
import { formatCurrency, verboseGram } from '../../../utils';
import { DisplayData } from '../..';
import { Contract } from '@/entities/Contract.entity';
import { useTranslation } from 'react-i18next';
import tsStyles from './index.styles';
import theme from '@/conf/theme';

interface ContractSummaryCardProps {
  contract: Contract;
  hiddenClient?: boolean;
}

const ContractSummaryCard: React.FC<ContractSummaryCardProps> = ({
  contract,
  hiddenClient,
}) => {
  const { t } = useTranslation();
  const lang = {
    label: `${t('common.contractDetail')} ${contract?.contractNumber}`,
    checkboxLabel: t('common.markAsReviewed'),
    weight: t('common.contractWeight'),
    totalContractValue: t('common.totalContractValue'),
    responsible: t('common.responsible'),
    expiration: t('common.expiration'),
    client: t('common.client'),
    clientRut: t('common.rut'),
    averagePurchaseValue: t('contract.averagePurchaseValue'),
  };
  return (
    <Card variant="outlined" sx={tsStyles.cardStyles}>
      <Box sx={tsStyles.titleBoxStyles}>
        <Typography
          variant="h6"
          component="h2"
          fontSize={theme.typography.h6.fontSize}
          fontWeight="regular"
        >
          {t('contract.summaryTitle')}
        </Typography>
      </Box>
      <Box sx={tsStyles.gridBoxStyles(hiddenClient ?? false)}>
        <Box>
          <DisplayData
            label={lang.weight}
            value={verboseGram(contract.totalWeight)}
          />
          <DisplayData
            label={lang.totalContractValue}
            value={formatCurrency(contract.totalContractValue)}
          />
          <DisplayData
            label={lang.averagePurchaseValue}
            value={formatCurrency(contract.averagePurchaseValue)}
          />
        </Box>
        <Box>
          <DisplayData
            label={lang.responsible}
            value={contract.responsibleName}
          />
          <DisplayData label={lang.expiration} value={contract.endDate} />
        </Box>
        {!hiddenClient && (
          <Box>
            <DisplayData label={lang.client} value={contract.clientName} />
            <DisplayData label={lang.clientRut} value={contract.clientRut} />
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default ContractSummaryCard;
