import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  TooltipItem,
} from 'chart.js';
import { Box } from '@mui/material';
import { colors } from '@/conf/chart';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: { name: string; value: number }[];
  title?: string;
}

const PieChart = ({ data, title }: PieChartProps) => {
  const chartData = {
    labels: data.map((d) => d.name),
    datasets: [
      {
        label: title || 'Dataset',
        data: data.map((d) => d.value),
        backgroundColor: colors.backgroundColor,
        borderColor: colors.borderColor,
        hoverBackgroundColor: colors.hoverBackgroundColor,
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: !!title, text: title },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<'pie'>) {
            let label = context.label || '';
            if (context.parsed !== null) {
              label += `: ${context.parsed.toLocaleString()}`;
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <Box sx={{ width: '100%', height: 400 }}>
      <Pie data={chartData} options={options} />
    </Box>
  );
};

export default PieChart;
