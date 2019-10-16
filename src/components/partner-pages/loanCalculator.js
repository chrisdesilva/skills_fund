import React, { useEffect, useState } from 'react'
import Img from 'gatsby-image'
import { UnmountClosed as Collapse } from 'react-collapse'

const LoanCalculator = props => {

    const [loanValue, setLoanValue] = useState(props.defaultLoanAmount)
    const [programMax, setProgramMax] = useState(props.maxLoanAmt)
    const [monthlyPayment, setMonthlyPayment] = useState({ payment36: null, payment60: null })
    const [interestPayment, setInterestPayment] = useState({ payment36: null, payment60: null })
    const [loanType, setLoanType] = useState('io')
    const metros = props.loanInfo.map(program => program.metros)
    const multiMetros = props.loanInfo.map(program => program.multiMetros)
    const [programIndex, setProgramIndex] = useState(0)

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    })

    const handleSliderAmt = e => {
        setLoanValue(e.target.value)
    }

    const calculateMonthlyPayment = () => {
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

    const handleProgramName = e => {
        let index = e.target.value
        setProgramIndex(index)
        setProgramMax(Number(props['loanInfo'][index]['loanInfo']['maxLoanAmt']))
        console.log(multiMetros)        
    }

    const handleLoanType = e => {
        setLoanType(e.target.value)
    }

    const handleMetro = e => {
        setProgramMax(e.target.value)
    }

    useEffect(() => {
        calculateMonthlyPayment()
    }, [])

    return (
        <div className="loanCalculator">

            <h2>Loan Calculator</h2>
            <div className="loanCalculator__img"><Img fluid={props.scales} /></div>
            <p className="loanCalculator__leadText">Find out exactly what you'll pay with a Skills Fund loan:</p>

            <div className="loanCalculator__content">
                <div className="loanCalculator__select">
                    <div>
                        <select onChange={handleProgramName}>
                            {props.loanInfo.map((program, i) => <option value={i} key={program.name}>{program.name}</option>)}
                        </select>
                    </div>

                    <Collapse isOpened={props.loanInfo[programIndex].hasIO && props.loanInfo[programIndex].hasIR}>
                        <select onChange={handleLoanType}>
                            <option value="io">Interest-Only</option>
                            <option value="ir">Immediate Repayment</option>
                        </select>
                    </Collapse>

                    <Collapse isOpened={multiMetros[programIndex]}>
                        <select onChange={handleMetro}>
                            {metros.map(city => city.map(program => <option key={program.name} value={program.maxLoanAmt}>{program.location}</option>))}
                        </select>
                    </Collapse>
                </div>

                <div className="loanCalculator__slider">
                    <input className="loanCalculator__input" onChange={handleSliderAmt} onTouchEnd={calculateMonthlyPayment} onMouseUp={calculateMonthlyPayment} type="range" min="2000" step="5" max={programMax} value={loanValue}/>
                    <div className="loanCalculator__labels">
                        <p>$2,000</p>
                        <p >Loan Amount<br/><span className="loanCalculator__amount">{formatter.format(loanValue)}</span></p>
                        <p>{formatter.format(programMax)}</p>
                    </div>
                </div>

                <div className="loanCalculator__monthlyPayments">

                    <div className="loanCalculator__36months">
                        <h3>{loanType === "io" ? 'Interest-Only' : 'Immediate Repayment'}</h3>
                        <h4>36 Month Option</h4>
                        {loanType === "io" ? <><p>Interest Only Payment:</p> <p className="loanCalculator__paymentAmounts">${interestPayment.payment36}</p></> : null }
                        <p>Monthly Payment:</p> <p className="loanCalculator__paymentAmounts">${monthlyPayment.payment36}</p>
                    </div>

                    <div className="loanCalculator__60months">
                        <h3>{loanType === "io" ? 'Interest-Only' : 'Immediate Repayment'}</h3>
                        <h4>60 Month Option</h4>
                        <p>Interest Only Payment:</p> <p className="loanCalculator__paymentAmounts">${interestPayment.payment60}</p>
                        {loanType === "io" ? <><p>Monthly Payment:</p> <p className="loanCalculator__paymentAmounts">${monthlyPayment.payment60}</p></> : null }
                    </div>

                </div>

            </div>
        </div>
    )
}

export default LoanCalculator