// src/components/SalesChart.jsx
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { colors } from '@/conf/chart';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const SalesChart = ({ investments }: { investments: { name: string; sales: number }[] }) => {
    // Prepare the data for Chart.js
    const chartData = {
        labels: investments.map(inv => inv.name), // X-axis: Investment names
        datasets: [
            {
                label: 'Total Sales per Investment',
                data: investments.map(inv => inv.sales), // Y-axis: Sales amounts
                backgroundColor: colors.backgroundColor,
                borderColor: colors.borderColor,
                hoverBackgroundColor: colors.hoverBackgroundColor,
                borderWidth: 1,
            },
        ],
    };

    // Configuration options for the chart
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Total Sales per Investment',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="chart-container">
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default SalesChart;