import { Card, Box } from '@mui/material';
import { formatCurrency, formatNumberWithGr } from '../../../utils';
import { DisplayData } from '../..';
import { Contract } from '@/entities/Contract.entity';
import { useTranslation } from 'react-i18next';
import theme from '@/conf/theme';

interface ContractSummaryCardProps {
    contract: Contract;
    hiddenClient?: boolean;
}

const ContractSummaryCard: React.FC<ContractSummaryCardProps> = ({ contract, hiddenClient }) => {
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
    }
    return (
        <Card variant="outlined" sx={{ backgroundColor: theme.palette.background.paper }}>
            <Box
                p={2}
                display="grid"
                gridTemplateColumns={hiddenClient ? "repeat(2, 1fr)" : "repeat(3, 1fr)"}
                gap={2}
            >
                <Box>
                    <DisplayData
                        label={lang.weight}
                        value={formatNumberWithGr(contract.totalWeight)}
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
                <Box sx={{ display: hiddenClient ? 'none' : 'block' }}>
                    <DisplayData label={lang.client} value={contract.clientName} />
                    <DisplayData
                        label={lang.clientRut}
                        value={contract.clientRut}
                    />
                </Box>
            </Box>
        </Card>
    );
}

export default ContractSummaryCard;
