import { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MonthRangePicker, Table } from '@/components';
import { useTranslation } from 'react-i18next';
import PieChart from '../components/charts/PieChart';
import SalesChart from '../components/charts/BarChart';
import { defaultStartDate, toDay } from '@/utils';
import mock from '../components/index.mock';
import styles from './index.styles';
import BranchTable from '../components/BranchTable';
import BranchDetailModal from '../components/BranchDetailModal';
import { addTotalsRow, TableRow } from './index.utils';

const PreInventory = () => {
  const { t } = useTranslation();

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

  return (
    <Box>
      <Grid container spacing={2} sx={styles.monthPickerGrid}>
        <Grid>
          <MonthRangePicker value={range} onChange={handleChangeRange} />
        </Grid>
      </Grid>

      {/* Tabla principal */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid {...styles.gridFull}>
          <Paper elevation={3} sx={styles.paperContainer}>
            <Typography variant="h5" gutterBottom>
              {t('adminPreInventory.investmentTitle')}
            </Typography>
            <Divider sx={styles.divider} />
            <Table size="small" rows={tableRows} columns={tableColumns} />
          </Paper>
        </Grid>
      </Grid>

      {/* Detalle por inversión */}
      {investments.map((investment) => (
        <Accordion
          key={investment.name}
          defaultExpanded
          sx={styles.accordionMarginTop}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${investment.name}-content`}
            id={`${investment.name}-header`}
          >
            <Box sx={styles.accordionSummaryBox}>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                {investment.name}
              </Typography>
              <Button variant="contained" component="span">
                Descargar
              </Button>
            </Box>
          </AccordionSummary>

          <AccordionDetails>
            <Table size="small" rows={tableRows} columns={tableColumns} />
            <Box mt={3}>
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

      {/* Gráficos */}
      <Grid container spacing={3} sx={styles.chartsGrid}>
        <Grid {...styles.gridSmall}>
          <Paper elevation={3} sx={styles.gramsPaper}>
            <Typography variant="h6" gutterBottom>
              {t('adminPreInventory.gramsChartTitle')}: {totalGrams}
            </Typography>
            <Divider sx={styles.divider} />
            <PieChart
              data={allGramsData.map((inv) => ({
                name: inv.name,
                value: inv.grams,
              }))}
              title="Gramos Totales"
            />
          </Paper>
        </Grid>
        <Grid {...styles.gridLarge}>
          <Paper elevation={3} sx={styles.salesPaper}>
            <Typography variant="h6" gutterBottom>
              {t('adminPreInventory.salesChartTitle')}: $
              {totalSales.toLocaleString()}
            </Typography>
            <Divider sx={styles.divider} />
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
      </Grid>

      {selectedBranch && (
        <BranchDetailModal
          id={selectedBranch.id as number}
          onClose={handleCloseBranchModal}
        />
      )}
    </Box>
  );
};

export default PreInventory;
