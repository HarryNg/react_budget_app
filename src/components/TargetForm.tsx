import { useState, FormEvent, ChangeEvent } from "react"

export default function TargetForm(props: {totalSaving: number}) {
    const [target, setTarget] = useState(0)

    const handleTargetChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTarget(Number(event.target.value))
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        setTarget(0)
    }
    const progress = (props.totalSaving && target > 0) ? ((props.totalSaving / target) * 100).toFixed() : 0;


    return (
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="target">Set target</label>
                <input 
                    type="number"
                    name="target"
                    id="target"
                    value={target}
                    onChange={handleTargetChange}
                    placeholder="20000" />
                <button>Reset</button>
            </form>
            <p>Current saving: {props.totalSaving}</p>
            <p>Target: {target}</p>
            <p>Progress: {progress}%</p>
            <progress max={target} value={props.totalSaving}/>
        </div>
    )
}