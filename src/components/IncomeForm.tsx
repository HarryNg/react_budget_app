import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'

import { Transaction, IncomeTypeProps } from '../types'
import { getFromLocalStorage,saveToLocalStorage } from '../utils/localStorage'
import { incomeSchema } from '../utils/validation'
import { exportToCSV } from '../utils/exportToCSV'

type IncomeFormData = z.infer<typeof incomeSchema>;

export default function IncomeForm(props: IncomeTypeProps) {
    const { register, handleSubmit, reset, formState: { errors}} = useForm<IncomeFormData>({
        resolver: zodResolver(incomeSchema)
    })
    const [incomes, setIncomes] = useState<Transaction[]>(() => getFromLocalStorage('incomes') || [])

    useEffect(() => {
        saveToLocalStorage('incomes', incomes);
    }, [incomes]);


    const onSubmit = (data: IncomeFormData) => {
        const newIncome = {
            id: nanoid(),
            source: data.source,
            amount: data.amount,
            date: data.date
        }
        setIncomes((preIncome) => {
            return [...preIncome, newIncome]
        })
        reset()
    }

    const totalIncome = incomes.reduce((acc, income) => {
        return acc + Number(income.amount)
    }, 0)
    props.onGetTotalIncome(totalIncome)

    const handleBtnDelete = (id: string) => {
        setIncomes((prevIncome) => {
            return prevIncome.filter(income => income.id !== id)
        })
    }

    const handleExportIncomes = () => {
        exportToCSV(getFromLocalStorage('incomes') , 'incomes.csv')
    }

    return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)} className='form'>
            <div className='formField'>
                <label htmlFor='source'>Income source</label> <br/>
                <input 
                    type="text" {...register('source')}
                    placeholder='Salary'/>
                {errors.source && <span>{errors.source.message}</span>}
            </div>
            <div className='formField'>
                <label htmlFor='amount'>Amount of income</label> <br/>
                <input 
                    type="text" {...register('amount', {valueAsNumber:true})}/>
                {errors.amount && <span>{errors.amount.message}</span>}
            </div>
            <div className='formField'>
                <label htmlFor='date'>Date of income</label> <br/>
                <input 
                    type="date" {...register('date')}/>
                {errors.date && <span>{errors.date.message}</span>}
            </div>
            <button type="submit" >Add income</button>
        </form>
        
        {incomes && incomes.length > 0 ? (
        <ul>
            {incomes.map((income) => {
                return (
                <li key={income.id}>
                    {income.source}: {income.amount}EUR on {income.date}
                    <button onClick= {()=> handleBtnDelete(income.id)}>X</button>
                </li>
                )
            })}
        </ul>
        ) : (<p>No income yet</p>)}
        
        <button onClick={handleExportIncomes}>Export Incomes</button>
    </div>
  )
}