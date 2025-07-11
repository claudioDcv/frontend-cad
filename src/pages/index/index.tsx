import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Tab, Tabs } from '@mui/material';
import { TAB_PACKING_LIST, TAB_RESOLUTIONS } from '@/constants';
import PackingList from './components/packing-list';
import Resolutions from './components/resolutions';

const Index = () => {
  const { t } = useTranslation();
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box>
      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label={t('common.resolutions')} />
        <Tab label={t('common.packingList')} />
      </Tabs>
      {tabIndex === TAB_RESOLUTIONS && <Resolutions />}
      {tabIndex === TAB_PACKING_LIST && <PackingList />}
    </Box>
  );
};

export default Index;
