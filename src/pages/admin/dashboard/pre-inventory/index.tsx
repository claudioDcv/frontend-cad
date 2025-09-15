import { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Paper,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import { DistributionModal, MonthRangePicker, Table } from '@/components';
import PieChart from '../components/charts/PieChart';
import SalesChart from '../components/charts/BarChart';
import BranchTable from '../components/branch-table';
import BranchDetailModal from '../components/branch-detail-modal';
import { defaultStartDate, toDay } from '@/utils';
import { addTotalsRow, TableRow } from './index.utils';
import tsStyles from './index.styles';
import mock from '../components/index.mock';

const PreInventory = () => {
  const { t } = useTranslation();

  const [openDistribution, setOpenDistribution] = useState(false);
  const [range, setRange] = useState<[Date, Date]>([defaultStartDate, toDay()]);
  const [selectedBranch, setSelectedBranch] = useState<TableRow | null>(null);
  const [investments] = useState(mock.investment);
  const [tableRows] = useState(mock.rows);
  const [tableColumns] = useState(mock.columns);

  const allGramsData = investments.map((inv) => ({
    name: inv.name,
    grams: inv.data.reduce((sum, item) => sum + item.grams, 0),
  }));

  const allSalesData = investments.map((inv) => ({
    name: inv.name,
    sales: inv.data.reduce((sum, item) => sum + item.sales, 0),
  }));

  const totalGrams = allGramsData.reduce((sum, item) => sum + item.grams, 0);
  const totalSales = allSalesData.reduce((sum, item) => sum + item.sales, 0);

  const handleChangeRange = (newRange: [Date, Date]) => {
    setRange(newRange);
  };

  const handleOpenBranchModal = (branch: TableRow) => {
    setSelectedBranch(branch);
  };

  const handleCloseBranchModal = () => {
    setSelectedBranch(null);
  };

  const handleOpenModal = () => {
    setOpenDistribution(true);
  };

  const handleCloseModal = () => {
    setOpenDistribution(false);
  };

  return (
    <Box sx={tsStyles.container}>
      <Grid container spacing={2} sx={tsStyles.monthPickerGrid}>
        <Grid>
          <MonthRangePicker value={range} onChange={handleChangeRange} />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={tsStyles.chartsGrid}>
        <Grid {...tsStyles.gridFull}>
          <Paper elevation={3} sx={tsStyles.paperContainer}>
            <Typography variant="h5" gutterBottom>
              {t('adminPreInventory.investmentTitle')}
            </Typography>
            <Divider sx={tsStyles.divider} />
            <Table size="small" rows={tableRows} columns={tableColumns} />
          </Paper>
        </Grid>
      </Grid>

      {investments.map((investment) => (
        <Accordion
          key={investment.name}
          defaultExpanded
          sx={tsStyles.accordionMarginTop}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${investment.name}-content`}
            id={`${investment.name}-header`}
          >
            <Box sx={tsStyles.accordionSummaryBox}>
              <Typography variant="h6" sx={tsStyles.accordionSummaryTitle}>
                {investment.name}
              </Typography>
              <Button
                variant="contained"
                component="span"
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                Descargar
              </Button>
            </Box>
          </AccordionSummary>

          <AccordionDetails>
            <Table size="small" rows={tableRows} columns={tableColumns} />
            <Box sx={tsStyles.accordionDetailsBox}>
              <BranchTable
                branchRows={addTotalsRow(
                  investment.branchDetails as TableRow[],
                  mock.branchDetailColumns
                )}
                onDetailBranch={handleOpenBranchModal}
              />
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}

      <Grid container spacing={3} sx={tsStyles.chartsGrid}>
        <Grid {...tsStyles.gridSmall}>
          <Paper elevation={3} sx={tsStyles.paper}>
            <Typography variant="h6" gutterBottom>
              {t('adminPreInventory.gramsChartTitle')}: {totalGrams}
            </Typography>
            <Divider sx={tsStyles.divider} />
            <PieChart
              data={allGramsData.map((inv) => ({
                name: inv.name,
                value: inv.grams,
              }))}
              title="Gramos Totales"
            />
          </Paper>
        </Grid>
        <Grid {...tsStyles.gridLarge}>
          <Paper elevation={3} sx={tsStyles.paper}>
            <Typography variant="h6" gutterBottom>
              {t('adminPreInventory.salesChartTitle')}: $
              {totalSales.toLocaleString()}
            </Typography>
            <Divider sx={tsStyles.divider} />
            <SalesChart
              data={allSalesData.map((inv) => ({
                name: inv.name,
                value: inv.sales,
              }))}
              title="Ventas Totales"
              yLabel="Ventas"
            />
          </Paper>
        </Grid>
        <Grid>
          <Button variant="contained" color="primary" onClick={handleOpenModal}>
            Abrir Distribución
          </Button>
        </Grid>
      </Grid>

      {selectedBranch && (
        <BranchDetailModal
          id={selectedBranch.id as number}
          onClose={handleCloseBranchModal}
        />
      )}

      <DistributionModal open={openDistribution} onClose={handleCloseModal} />
    </Box>
  );
};

export default PreInventory;
