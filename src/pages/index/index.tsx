import { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PackingList from './components/packing-list';
import { Breadcrumb } from '@components/index';
import routes from '../../conf/routes';
import { TAB_RESOLUTIONS } from '@/utils';
import { TAB_PACKING_LIST } from '@/utils';
import Resolutions from './components/resolutions';

const Index = () => {
  const { t } = useTranslation();
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <div>
      <Breadcrumb items={[routes.index]} />
      <Box>
        <Tabs value={tabIndex} onChange={handleTabChange}>
          <Tab label={t('common.resolutions')} />
          <Tab label={t('common.packingList')} />
        </Tabs>
        {tabIndex === TAB_RESOLUTIONS && <Resolutions />}
        {tabIndex === TAB_PACKING_LIST && <PackingList />}
      </Box>
    </div>
  );
};

export default Index;
