import { useState, useEffect } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { TransferSavingProps } from '../types'
import { getFromLocalStorage,saveToLocalStorage } from '../utils/localStorage'



function TransferSaving(props: TransferSavingProps) {
    const [totalSaving, setTotalSaving] = useState(() => getFromLocalStorage('totalSaving') || 0)

    const savingAmountSchema = z.object({
        saving: z.number().refine(data => data >= 0 && data<= totalBalance, {message: 'Amount must be greater than 0 and less than total balance'})
    });
    type SavingFormData = z.infer<typeof savingAmountSchema>

    const { register, handleSubmit, reset, formState: { errors } } = useForm<SavingFormData>({
        resolver: zodResolver(savingAmountSchema)
    })

    useEffect(() => {
        saveToLocalStorage('totalSaving', totalSaving)
    }, [totalSaving])
    
    const totalBalance = props.totalIncome - props.totalExpense - totalSaving

    const onSubmit = (data: SavingFormData) => {
        if (data.saving > totalBalance) {
            return alert('Insufficient balance')
        }
        
        setTotalSaving(data.saving)
        reset()
    }

    props.onGetTotalSaving(totalSaving)

    return (
    <div>
        <p>Current Balance: {totalBalance}</p>
        <form onSubmit={handleSubmit(onSubmit)} id='saving-form'>
            <div className='form-field'>
                <label htmlFor='saving'>Transfer to saving account</label><br/>
                <input 
                    type='number' {...register('saving', {valueAsNumber: true})}
                     />
                {errors.saving && <span>{errors.saving.message}</span>}
                <button>Transfer</button>
            </div>
        </form>
    </div>
    )
}

export default TransferSaving
