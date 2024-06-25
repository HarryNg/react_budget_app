type Transaction = {
    id: string
    source: string
    amount: number
    date: string
}

type IncomeTypeProps = {
    onGetTotalIncome: (income: number) => void
}

type ExpenseFormProps = {
    onGetTotalExpense: (expense: number) => void
}

type TransferSavingProps = {
    totalIncome: number,
    totalExpense: number,
    onGetTotalSaving: (saving: number) => void
}

export type { Transaction, IncomeTypeProps, ExpenseFormProps, TransferSavingProps }