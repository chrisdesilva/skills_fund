import React, { useEffect, useState } from 'react'
import Img from "gatsby-image"

const LoanCalculator = props => {

    const [loanValue, setLoanValue] = useState(props.defaultLoanAmount)
    const [monthlyPayment, setMonthlyPayment] = useState({ payment36: null, payment60: null })
    const [interestPayment, setInterestPayment] = useState({ payment36: null, payment60: null })

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    })

    const handleChange = e => {
        setLoanValue(e.target.value)
    }

    const calculateMonthlyPayment = e => {
        if(monthlyPayment.payment36 || monthlyPayment.payment60) {
            handleChange(e)
        }
        const monthlyRate36 = (Number(props.ir36) / 100) / 12
        const monthlyRate60 = (Number(props.ir60) / 100) / 12
        const borrowedAmount = Number(loanValue) || Number(props.defaultLoanAmount)
        const totalLoan = Number(borrowedAmount) * (1 + Number(props.origFee))
        let payment36 = Number((monthlyRate36 * totalLoan)) / (1 - (1 / Math.pow(1 + monthlyRate36, 36)))
        let payment60 = Number((monthlyRate60 * totalLoan)) / (1 - (1 / Math.pow(1 + monthlyRate60, 60)))
        setMonthlyPayment({payment36: payment36.toFixed(2), payment60: payment60.toFixed(2)})
        calculateInterest()
    }

    const calculateInterest = () => {
        let interest36 = (Number(loanValue) * (1 + Number(props.origFee)) / 12 * (Number(props.ir36) / 100))
        let interest60 = (Number(loanValue) * (1 + Number(props.origFee)) / 12 * (Number(props.ir60) / 100))
        setInterestPayment({payment36: interest36.toFixed(2), payment60: interest60.toFixed(2)})
    }

    useEffect(() => {
        calculateMonthlyPayment()
    }, [])

    return (
        <div className="loanCalculator">
            <h2>Loan Calculator</h2>
            <div className="loanCalculator__img"><Img fluid={props.scales} /></div>
            <p>Find out exactly what you'll pay with a Skills Fund loan:</p>
            <div className="loanCalculator__content">
                <div className="loanCalculator__slider">
                    <input className="loanCalculator__input" onChange={calculateMonthlyPayment} type="range" min="2000" step="5" max={props.maxLoanAmt} value={loanValue}/>
                    <div className="loanCalculator__labels">
                        <p>$2,000</p>
                        <p >Loan Amount<br/><span className="loanCalculator__amount">{formatter.format(loanValue)}</span></p>
                        <p>{formatter.format(props.maxLoanAmt)}</p>
                    </div>
                </div>
                <div className="loanCalculator__monthlyPayments">
                    <div className="loanCalculator__36months">
                        <h3>36 Month Option</h3>
                        {props.hasIO ? <><p>Interest Only Payment:</p> <p className="loanCalculator__paymentAmounts">${interestPayment.payment36}</p></> : null }
                        <p>Monthly Payment:</p> <p className="loanCalculator__paymentAmounts">${monthlyPayment.payment36}</p>
                    </div>
                    <div className="loanCalculator__60months">
                        <h3>60 Month Option</h3>
                        <p>Interest Only Payment:</p> <p className="loanCalculator__paymentAmounts">${interestPayment.payment60}</p>
                        {props.hasIO ? <><p>Monthly Payment:</p> <p className="loanCalculator__paymentAmounts">${monthlyPayment.payment60}</p></> : null }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoanCalculator