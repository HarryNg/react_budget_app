import { nanoid } from 'nanoid'

import {ChangeEvent, FormEvent, useState} from 'react'
import { Transaction } from '../types'

export default function IncomeForm() {
    const [income, setIncome] = useState<Omit<Transaction, 'id'>>({
        source: '',
        amount: 0,
        date: ''
    })
    const [incomes, setIncomes] = useState<Transaction[]>([])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIncome((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value}
        })
    }

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault()
        const newIncome = {
            id: nanoid(),
            source: income.source,
            amount: income.amount,
            date: income.date
        }
        setIncomes((preIncome) => {
            return [...preIncome, newIncome]
        })
        setIncome({
            source: '',
            amount: 0,
            date: ''
        })
    }

    const totalIncome = incomes.reduce((acc, income) => {
        return acc + Number(income.amount)
    }, 0)

    return (
    <div>
        <form onSubmit={handleFormSubmit} className='form'>
            <div className='formField'>
                <label htmlFor='source'>Income source</label> <br/>
                <input 
                    type="text" 
                    name='source' 
                    id='source'
                    value={income.source}
                    onChange={handleChange}
                    placeholder='Salary'/>
            </div>
            <div className='formField'>
                <label htmlFor='amount'>Amount of income</label> <br/>
                <input 
                    type="text" 
                    name='amount' 
                    id='amount'
                    value={income.amount}
                    onChange={handleChange}/>
            </div>
            <div className='formField'>
                <label htmlFor='date'>Date of income</label> <br/>
                <input 
                    type="date" 
                    name='date' 
                    id='date'
                    value={income.date}
                    onChange={handleChange}/>
            </div>
            <button type="submit" >Add income</button>
        </form>
        <p>Total Income: {totalIncome}</p>
        {incomes && incomes.length > 0 ? (
        <ul>
            {incomes.map((income) => {
                return (
                <li key={income.id}>
                    {income.source}: {income.amount}EUR on {income.date}
                </li>
                )
            })}
        </ul>
        ) : (<p>No income yet</p>)}
    </div>
  )
}