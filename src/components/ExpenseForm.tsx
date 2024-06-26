import { useState,useEffect } from 'react'
import { nanoid } from 'nanoid'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'

import { Transaction,ExpenseFormProps } from '../types'
import { getFromLocalStorage,saveToLocalStorage } from '../utils/localStorage'
import { expenseSchema } from '../utils/validation'

type ExpenseFormData = z.infer<typeof expenseSchema>;

export default function ExpenseForm (props:ExpenseFormProps) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ExpenseFormData>({
        resolver: zodResolver(expenseSchema),
    });

    const [expenses, setExpenses] = useState<Transaction[]>(() => getFromLocalStorage('expenses') || [])
    
    useEffect(() => {
        saveToLocalStorage('expenses', expenses);
    }, [expenses]);

    const onSubmit = (data: ExpenseFormData) => {
        const newExpense: Transaction = {
          id: nanoid(),
          source: data.source,
          amount: data.amount,
          date: data.date,
        };
    
        setExpenses((prevExpense) => [...prevExpense, newExpense]);
        reset();
    };

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
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="formField">
                    <label htmlFor="source">Expense source</label><br/>
                    <input 
                        type="text" {...register('source')}
                        placeholder="Phone Bill" />
                    {errors.source && <span>{errors.source.message}</span>}
                </div>
                <div className="formField">
                    <label htmlFor="amount">Amount of expense</label><br/>
                    <input 
                        type="number" {...register('amount', {valueAsNumber: true })}
                    />
                    {errors.amount && <span>{errors.amount.message}</span>}
                </div>
                <div className="formField">
                    <label htmlFor="date">Date of expense</label><br/>
                    <input 
                        type="date" {...register('date')}
                        />
                    {errors.date && <span>{errors.date.message}</span>}
                </div>
                <button type="submit">Add Expense</button>
            </form>
            
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