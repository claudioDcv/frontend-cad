import { useState, useEffect } from 'react';
import GramsPieChart from './components/GramsPieChart';
import SalesChart from './components/SalesChart';
import { Divider, Grid2 as Grid, Paper, Typography } from '@mui/material';
import { Table } from '@/components';
import { useTranslation } from 'react-i18next';

const format = (value: number | string) => {
    return value.toLocaleString();
};

const PreInventory = () => {
    const { t } = useTranslation();
    // SALES data
    const [salesInvestments] = useState([
        { id: 1, name: 'Investment A', sales: 15000 },
        { id: 2, name: 'Investment B', sales: 22000 },
        { id: 3, name: 'Investment C', sales: 10000 }
    ]);
    const [totalSales, setTotalSales] = useState(0);

    // GRAMS data
    const [gramsInvestments] = useState([
        { id: 1, name: 'Investment A', grams: 100 },
        { id: 2, name: 'Investment B', grams: 50 },
        { id: 3, name: 'Investment C', grams: 200 }
    ]);
    const [totalGrams, setTotalGrams] = useState(0);

    useEffect(() => {
        const totalS = salesInvestments.reduce((sum, inv) => sum + inv.sales, 0);
        setTotalSales(totalS);

        const totalG = gramsInvestments.reduce((sum, inv) => sum + inv.grams, 0);
        setTotalGrams(totalG);
    }, [salesInvestments, gramsInvestments]);

    const calculateSalesPercentage = (sales: number) => {
        return totalSales === 0 ? 0 : ((sales / totalSales) * 100).toFixed(2);
    };

    const calculateGramsPercentage = (grams: number) => {
        return totalGrams === 0 ? 0 : ((grams / totalGrams) * 100).toFixed(2);
    };

    return (
        <>
            <Typography variant="h4" component="h1" gutterBottom>
                {t('adminPreInventory.title')}
            </Typography>
            <Grid container spacing={3}>
                {/* Gráfico de Torta (a la izquierda) */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            {t('adminPreInventory.gramsChartTitle')}
                        </Typography>
                        <Table size="small" rows={gramsInvestments}
                            columns={[
                                { id: 'name', label: 'Investment Name' },
                                { id: 'grams', label: 'Grams Amount', field: format },
                                { id: 'percentage', label: 'Grams Percentage', render: (row) => `${calculateGramsPercentage(row.grams)}%` }
                            ]} />
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6" component="p" sx={{ mt: 'auto' }}>
                            <b>Total Grams</b>: {totalGrams}
                        </Typography>
                        <GramsPieChart investments={gramsInvestments} />
                    </Paper>
                </Grid>

                {/* Gráfico de Barras (a la derecha) */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            {t('adminPreInventory.salesChartTitle')}
                        </Typography>
                        <Table size="small" rows={salesInvestments}
                            columns={[
                                { id: 'name', label: 'Investment Name' },
                                { id: 'sales', label: 'Sales Amount', field: format },
                                { id: 'percentage', label: 'Sales Percentage', render: (row) => `${calculateSalesPercentage(row.sales)}%` }
                            ]} />
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6" component="p" sx={{ mt: 'auto' }}>
                            <b>Total Sales</b>: ${totalSales.toLocaleString()}
                        </Typography>
                        <SalesChart investments={salesInvestments} />
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

export default PreInventory;