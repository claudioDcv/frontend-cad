import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Tab, Tabs } from '@mui/material';
import { TAB_PACKING_LIST, TAB_RESOLUTIONS } from '@/constants';
import PackingList from './components/packing-list';
import Resolutions from './components/resolutions';
import ResolutionMassiveModal from './components/resolutions/components/ResolutionMassiveModal';

const Documents = () => {
  const { t } = useTranslation();
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box>
      <ResolutionMassiveModal id={String(1)} label={t('common.massUpload')} />
      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label={t('common.resolutions')} />
        <Tab label={t('common.packingList')} />
      </Tabs>
      {tabIndex === TAB_RESOLUTIONS && <Resolutions />}
      {tabIndex === TAB_PACKING_LIST && <PackingList />}
    </Box>
  );
};

export default Documents;
