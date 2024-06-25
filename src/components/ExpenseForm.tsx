import { nanoid } from 'nanoid'
import { useState, ChangeEvent, FormEvent } from 'react'

import { Transaction,ExpenseFormProps } from '../types'

export default function ExpenseForm (props:ExpenseFormProps) {
    const [expense, setExpense] = useState<Omit<Transaction, 'id'>>({
        source: '',
        amount: 0,
        date: ''
    })

    const [expenses, setExpenses] = useState<Transaction[]>([])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setExpense((prevState) => {
            return { ...prevState, [event.target.name]: event.target.value}
        })
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        const newExpense = {
            id : nanoid(),
            source: expense.source,
            amount: expense.amount,
            date: expense.date
        }

        setExpenses((prevExpense) => {
            return [...prevExpense, newExpense]
        })
        
        setExpense({
            source: '',
            amount: 0,
            date: ''
        })
    }

    const totalExpense = expenses.reduce((acc, expense) => {
        return acc + Number(expense.amount)
    }
    , 0)
    props.onGetTotalExpense(totalExpense)

    const handleBtnDelete = (id: string) : void => {
        setExpenses((prevExpense) => {
            return prevExpense.filter(expense => expense.id !== id)
        })
    }
    return (
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <div className="formField">
                    <label htmlFor="source">Expense source</label><br/>
                    <input 
                        type="text"
                        name="source"
                        id="source"
                        value={expense.source}
                        onChange={handleChange}
                        placeholder="Phone Bill" />
                </div>
                <div className="formField">
                    <label htmlFor="amount">Amount of expense</label><br/>
                    <input 
                        type="number"
                        name="amount"
                        id="amount"
                        onChange={handleChange}
                        value={expense.amount} />
                </div>
                <div className="formField">
                    <label htmlFor="date">Date of expense</label><br/>
                    <input 
                        type="date"
                        name="date"
                        id="date"
                        onChange={handleChange}
                        value={expense.date} />
                </div>
                <button type="submit">Add Expense</button>
            </form>
            {/* <p>Total expense: {totalExpense}</p> */}
            {expenses && expenses.length > 0 ? (
                <ul>
                    {expenses.map((expense) => {
                        return (
                            <li key={expense.id}>
                                {expense.source}: {expense.amount}EUR on {expense.date}
                                <button onClick={() => handleBtnDelete(expense.id)}>X</button>
                            </li>
                        )
                    })
                    }
                </ul>
            ): (<p>No expense yet</p>)}
        </div>
    )
}