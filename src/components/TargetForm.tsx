import { useState, useEffect } from "react"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'

import { getFromLocalStorage,saveToLocalStorage } from '../utils/localStorage'
import { targetShema } from '../utils/validation'

type TargetFormData = z.infer<typeof targetShema>

export default function TargetForm(props: {totalSaving: number}) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<TargetFormData>({
        resolver: zodResolver(targetShema)
    })
    const [target, setTarget] = useState(() => getFromLocalStorage('target') || 0)

    useEffect(() => {
        saveToLocalStorage('target', target)
    }, [target])

    const onSubmit = (data: TargetFormData) => {
        setTarget(data.target)
        reset()
    }
    const progress = (props.totalSaving && target > 0) ? ((props.totalSaving / target) * 100).toFixed() : 0;


    return (
        <div>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="target">Set target</label>
                <input 
                    type="number" {...register('target', {valueAsNumber: true})}
                    placeholder={target} />
                {errors.target && <span>{errors.target.message}</span>}
                <button>Reset</button>
            </form>
            <p>Current saving: {props.totalSaving}</p>
            <p>Target: {target}</p>
            <p>Progress: {progress}%</p>
            <progress max={target} value={props.totalSaving}/>
        </div>
    )
}