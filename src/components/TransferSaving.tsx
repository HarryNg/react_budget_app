import {useState, ChangeEvent, FormEvent} from 'react'

import { TransferSavingProps } from '../types'

function TransferSaving(props: TransferSavingProps) {
    const [saving, setSaving] = useState(0)
    const [totalSaving, setTotalSaving] = useState(0)
    const totalBalance = props.totalIncome - props.totalExpense - totalSaving

    const handleSavingChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSaving(Number(event.target.value))
    }
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        setTotalSaving(saving)
    }

    props.onGetTotalSaving(totalSaving)

    return (
    <div>
        <p>Current Balance: {totalBalance}</p>
        <form onSubmit={handleSubmit} id='saving-form'>
            <div className='form-field'>
                <label htmlFor='saving'>Transfer to saving account</label><br/>
                <input 
                    type='number' 
                    id='saving'
                    value={saving}
                    onChange={handleSavingChange}
                     />
                <button>Transfer</button>
            </div>
        </form>
    </div>
    )
}

export default TransferSaving
