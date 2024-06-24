
export default function ExpenseForm () {
    return (
        <div>
            <form className="form">
                <div className="formField">
                    <label htmlFor="source">Expense source</label><br/>
                    <input 
                        type="text"
                        name="source"
                        id="source"
                        placeholder="Phone Bill" />
                </div>
                <div className="formField">
                    <label htmlFor="amount">Amount of expense</label><br/>
                    <input 
                        type="number"
                        name="amount"
                        id="amount" />
                </div>
                <div className="formField">
                    <label htmlFor="date">Date of expense</label><br/>
                    <input 
                        type="date"
                        name="date"
                        id="date" />
                </div>
                <button type="submit">Add Expense</button>
            </form>
        </div>
    )
}