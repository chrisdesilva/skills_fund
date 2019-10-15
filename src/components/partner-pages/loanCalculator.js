import React, { useState } from 'react'

const LoanCalculator = props => {

    const [loanValue, setLoanValue] = useState(props.defaultLoanAmount)

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    })

    const handleChange = e => {
        setLoanValue(e.target.value)
    }

    return (
        <div className="loanCalculator">
            <h2>Loan Calculator</h2>
            <input className="loanCalculator__slider" onChange={handleChange} type="range" min="2000" step="5" max={props.maxLoanAmt} value={loanValue}/>
            <div className="loanCalculator__labels">
                <p>$2,000</p>
                <p >Loan Amount:<br/><span className="loanCalculator__amount">{formatter.format(loanValue)}</span></p>
                <p>{formatter.format(props.maxLoanAmt)}</p>
            </div>
        </div>
    )
}

export default LoanCalculator