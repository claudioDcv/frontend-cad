import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, TooltipItem, ChartOptions } from 'chart.js';
import { colors } from '@/conf/chart';

ChartJS.register(ArcElement, Tooltip, Legend);

const GramsPieChart = ({ investments }: { investments: { name: string; grams: number }[] }) => {
  // Prepare the data for the pie chart
  const chartData = {
    labels: investments.map(inv => inv.name), // Investment names
    datasets: [
      {
        label: 'Grams per Investment',
        data: investments.map(inv => inv.grams), // Grams amount
        backgroundColor: colors.backgroundColor,
        borderColor: colors.borderColor,
        hoverBackgroundColor: colors.hoverBackgroundColor,
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Grams per Investment Percentage',
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<'pie'>) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += `${context.parsed} grams`;
            }
            return label;
          }
        }
      }
    },
  };

  return (
    <div className="chart-container">
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default GramsPieChart;