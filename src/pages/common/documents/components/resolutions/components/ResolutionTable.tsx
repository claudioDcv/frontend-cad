import {
  Access,
  DocumentStatus,
  IconList,
  ResolutionDetailButton,
  Table,
} from '@/components';
import { validRoles } from '@/constants';
import { useReceivablesContext } from '@/modules/receivables/context/useReceivablesContext';
import { formatToDDMMYYYY, getMaterialType } from '@/utils';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Resolution } from '@/entities/Resolution.entity';

interface ResolutionTableProps {
  resolutions: Resolution[];
  onMassiveResolution: (resolution: Resolution) => () => void;
  onSendTruckId: (resolutionId: number) => () => void;
}

const ResolutionTable: React.FC<ResolutionTableProps> = ({
  resolutions,
  onMassiveResolution,
  onSendTruckId,
}) => {
  const { t } = useTranslation();
  const receivablesContext = useReceivablesContext();

  return (
    <Table
      columns={[
        {
          id: 'statusName',
          label: t('resolution.status'),
          render: ({ statusId, stateName, metadata }) => (
            <DocumentStatus
              metadata={metadata}
              statusId={statusId}
              statusName={stateName}
            />
          ),
        },
        { id: 'resolutionNumber', label: t('resolution.resolutionNumber') },
        { id: 'barcode', label: t('resolution.barcode') },
        { id: 'dispatchGuide', label: t('resolution.dispatchGuide') },
        { id: 'investmentName', label: t('common.investment') },
        { id: 'locationName', label: t('resolution.location') },
        {
          id: 'closeDate',
          label: t('resolution.closeDate'),
          render: ({ closeDate }) => formatToDDMMYYYY(closeDate),
        },
        { id: 'contractCount', label: t('resolution.contractCount') },
        {
          id: 'categoryName',
          label: t('common.category'),
          render: ({ categoryName, categoryId }) =>
            getMaterialType(categoryName, String(categoryId), 'tooltip'),
        },
        {
          id: 'actions',
          label: t('common.actions'),
          render: (resolution) => (
            <Box display="flex" gap={1}>
              <ResolutionDetailButton
                id={String(resolution.resolutionId)}
                label={t('common.view')}
              />
              <Access roles={[validRoles.operator]}>
                <Tooltip title={t('common.massUpload')}>
                  <IconButton onClick={onMassiveResolution(resolution)}>
                    <IconList name="box" />
                  </IconButton>
                </Tooltip>
              </Access>
              <Tooltip title={t('common.sendTruck')}>
                <IconButton onClick={onSendTruckId(resolution.resolutionId)}>
                  <IconList name="truckDoc" />
                </IconButton>
              </Tooltip>
              <Access roles={[validRoles.operator]}>
                <Tooltip title={t('accountsReceivable.tooltipOpen')}>
                  <IconButton
                    onClick={() =>
                      receivablesContext.setResolutionId(
                        resolution.resolutionId
                      )
                    }
                  >
                    <IconList name="receivables" />
                  </IconButton>
                </Tooltip>
              </Access>
            </Box>
          ),
        },
      ]}
      rows={resolutions}
      messageVoidData={t('common.noData')}
      size="small"
    />
  );
};

export default ResolutionTable;
