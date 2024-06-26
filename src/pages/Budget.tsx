import { useState } from 'react'
import IncomeForm from '../components/IncomeForm'
import ExpenseForm from '../components/ExpenseForm'
import TargetForm from '../components/TargetForm'
import TransferSaving from '../components/TransferSaving'
import Chart from '../components/Chart'
import { exportToCSV } from '../utils/exportToCSV'
import { getFromLocalStorage } from '../utils/localStorage'

const Budget = () => {
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
            <h1>Budget App</h1>
            <div className="top">
            <IncomeForm onGetTotalIncome= {getTotalIncome}/>
            <ExpenseForm onGetTotalExpense = {getTotalExpense}/>
            <TargetForm totalSaving={totalSaving}/>
            </div>
            <TransferSaving totalIncome={totalIncome} totalExpense={totalExpense} onGetTotalSaving={getTotalSaving}/>
            <Chart totalIncome={totalIncome} totalExpense={totalExpense} />
        </div>
      </>
    );
}

export default Budget
