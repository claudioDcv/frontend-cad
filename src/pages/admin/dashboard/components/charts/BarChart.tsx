import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Box } from '@mui/material';
import { colors } from '@/conf/chart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: { name: string; value: number }[];
  title?: string;
  yLabel?: string;
}

const BarChart = ({ data, title, yLabel }: BarChartProps) => {
  const chartData = {
    labels: data.map((d) => d.name),
    datasets: [
      {
        label: yLabel || title || 'Dataset',
        data: data.map((d) => d.value),
        backgroundColor: colors.backgroundColor,
        borderColor: colors.borderColor,
        hoverBackgroundColor: colors.hoverBackgroundColor,
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: !!title, text: title },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <Box sx={{ width: '100%', height: 400 }}>
      <Bar data={chartData} options={options} />
    </Box>
  );
};

export default BarChart;
