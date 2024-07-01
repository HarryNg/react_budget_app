import React from 'react';
import Chart from '../components/Chart';
import { useLocation } from 'react-router-dom';
import { getFromLocalStorage } from '../utils/localStorage';

interface ChartPageProps {
  totalIncome: number;
  totalExpense: number;
}

const ChartPage: React.FC = () => {
  const location = useLocation();
  // const { totalIncome, totalExpense } = location.state;

  return (
    <div>
      <Chart totalIncome={getFromLocalStorage('incomes')} totalExpense={getFromLocalStorage('expenses')} />
    </div>
  );
};

export default ChartPage;
