import React from 'react'

function TransferSaving() {
    
    return (
    <div>
        <p>Current Balance: </p>
        <form action="submit" id='saving-form'>
            <div className='form-field'>
                <label htmlFor='amount'>Transfer to saving account</label>
                <input type='number' id='amount' />
                <button>Transfer</button>
            </div>
        </form>
    </div>
    )
}

export default TransferSaving
