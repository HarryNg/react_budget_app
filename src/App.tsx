import { useState } from "react";

import IncomeForm from "./components/IncomeForm";
import ExpenseForm from "./components/ExpenseForm";
import TargetForm from "./components/TargetForm";
import TransferSaving from "./components/TransferSaving";

function App() {
  const [totalIncome, setTotalIncome] = useState(0)
  const [totalExpense, setTotalExpense] = useState(0)
  const [totalSaving, setTotalSaving] = useState(0)

  const getTotalIncome = (income: number) => {
    setTotalIncome(income)
  }
  const getTotalExpense = (expense: number) => {
    setTotalExpense(expense)
  }
  const getTotalSaving = (saving: number) => {
    setTotalSaving(saving)
  }

  return (
    <>
      <div className="container">
        <div className="top">
          <IncomeForm onGetTotalIncome= {getTotalIncome}/>
          <ExpenseForm onGetTotalExpense = {getTotalExpense}/>
          <TargetForm totalSaving={totalSaving}/>
        </div>
        <TransferSaving totalIncome={totalIncome} totalExpense={totalExpense} onGetTotalSaving={getTotalSaving}/>
      </div>
    </>
  );
}

export default App;
