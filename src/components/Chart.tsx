import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import styled from 'styled-components';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const ChartTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

export default function Chart({ totalIncome, totalExpense }: { totalIncome: number, totalExpense: number }) {
  const data = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        label: 'EUR',
        data: [totalIncome, totalExpense],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <ChartContainer>
      <ChartTitle>Income vs Expense</ChartTitle>
      <Doughnut data={data} />
    </ChartContainer>
  )
}
