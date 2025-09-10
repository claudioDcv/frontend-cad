import { useState, useEffect } from 'react';
import { Divider, Grid2 as Grid, Paper, Typography } from '@mui/material';
import { Table } from '@/components';
import { useTranslation } from 'react-i18next';
import PieChart from '../components/charts/PieChart';
import BarChart from '../components/charts/BarChart';

const format = (value: number | string) => {
  return value.toLocaleString();
};

const PostInventory = () => {
  const { t } = useTranslation();

  // Datos de Inventario 1 (Ejemplo: Unidades de Material)
  const [materialUnits] = useState([
    { id: 1, name: 'Investment A', units: 3500 },
    { id: 2, name: 'Investment B', units: 5800 },
    { id: 3, name: 'Investment C', units: 2100 },
  ]);
  const [totalUnits, setTotalUnits] = useState(0);

  // Datos de Inventario 2 (Ejemplo: Valor de Mercancía)
  const [merchandiseValue] = useState([
    { id: 1, name: 'Investment A', value: 85000 },
    { id: 2, name: 'Investment B', value: 125000 },
    { id: 3, name: 'Investment C', value: 70000 },
  ]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const totalU = materialUnits.reduce((sum, inv) => sum + inv.units, 0);
    setTotalUnits(totalU);

    const totalV = merchandiseValue.reduce((sum, inv) => sum + inv.value, 0);
    setTotalValue(totalV);
  }, [materialUnits, merchandiseValue]);

  const calculateUnitsPercentage = (units: number) => {
    return totalUnits === 0 ? 0 : ((units / totalUnits) * 100).toFixed(2);
  };

  const calculateValuePercentage = (value: number) => {
    return totalValue === 0 ? 0 : ((value / totalValue) * 100).toFixed(2);
  };

  return (
    <>
      <Grid container spacing={3}>
        {/* Gráfico de Torta */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Typography variant="h5" component="h2" gutterBottom>
              {t('adminPostInventory.unitsChartTitle')}
            </Typography>
            <Table
              size="small"
              rows={materialUnits}
              columns={[
                { id: 'name', label: 'Investment Name' },
                { id: 'units', label: 'Units Amount', field: format },
                {
                  id: 'percentage',
                  label: 'Units Percentage',
                  render: (row) => `${calculateUnitsPercentage(row.units)}%`,
                },
              ]}
            />
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" component="p" sx={{ mt: 'auto' }}>
              <b>Total Unidades</b>: {totalUnits}
            </Typography>
            <PieChart
              data={materialUnits.map((inv) => ({
                name: inv.name,
                value: inv.units,
              }))}
              title="Units per Investment"
            />
          </Paper>
        </Grid>

        {/* Gráfico de Líneas */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Typography variant="h5" component="h2" gutterBottom>
              {t('adminPostInventory.valueChartTitle')}
            </Typography>
            <Table
              size="small"
              rows={merchandiseValue}
              columns={[
                { id: 'name', label: 'Investment Name' },
                { id: 'value', label: 'Merchandise Value', field: format },
                {
                  id: 'percentage',
                  label: 'Value Percentage',
                  render: (row) => `${calculateValuePercentage(row.value)}%`,
                },
              ]}
            />
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" component="p" sx={{ mt: 'auto' }}>
              <b>Total Valor</b>: ${totalValue.toLocaleString()}
            </Typography>
            <BarChart
              data={merchandiseValue.map((inv) => ({
                name: inv.name,
                value: inv.value,
              }))}
              title="Merchandise Value per Investment"
              yLabel="Value"
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default PostInventory;
