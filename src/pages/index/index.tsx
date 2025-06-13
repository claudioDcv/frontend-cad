import { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PackingList from './components/packing-list';
import Resolutions from './components/resolutions';
import { Breadcrumb } from '../../components';
import routes from '../../conf/routes';

const Index = () => {
  const { t } = useTranslation();
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <div>
      <Breadcrumb items={[routes().index]} />
      <Box>
        <Tabs value={tabIndex} onChange={handleTabChange}>
          <Tab label={t('common.resolutions')} />
          <Tab label={t('common.packingList')} />
        </Tabs>
        {tabIndex === 0 && <Resolutions />}
        {tabIndex === 1 && <PackingList />}
      </Box>
    </div>
  );
};

export default Index;
