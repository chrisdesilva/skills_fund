import React, { useEffect, useState } from 'react'
import { UnmountClosed as Collapse } from 'react-collapse'

const LoanCalculator = props => {

    const [loanValue, setLoanValue] = useState(props.defaultLoanAmount)
    const [programMax, setProgramMax] = useState(props.maxLoanAmt)
    const [monthlyPayment, setMonthlyPayment] = useState({ payment36: null, payment60: null })
    const [totalPayment, setTotalPayment] = useState({ payment36: null, payment60: null })
    const [interestPayment, setInterestPayment] = useState({ payment36: null, payment60: null })
    const [nonPaymentPeriod, setNonPaymentPeriod] = useState(props.loanInfo[0].nonPaymentPeriod)
    const [loanType, setLoanType] = useState(props.loanInfo[0].loanType)
    const metros = props.loanInfo.map(program => program.metros)
    const multiMetros = props.loanInfo.map(program => program.multiMetros)
    const [metroIndex, setMetroIndex] = useState(0)
    const [programIndex, setProgramIndex] = useState(0)

    const formatter = new Intl.NumberFormat('en-US', { 
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0, // even dollar amounts without cents
    })

    const formatterWithCents = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
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
        calculateTotalPayment()
    }

    const calculateInterest = () => {
        let interest36 = (Number(loanValue) * (1 + Number(props.origFee)) / 12 * (Number(props.ir36) / 100))
        let interest60 = (Number(loanValue) * (1 + Number(props.origFee)) / 12 * (Number(props.ir60) / 100))
        setInterestPayment({payment36: interest36.toFixed(2), payment60: interest60.toFixed(2)})
    }

    const calculateTotalPayment = () => {
        let months = [36, 60]
        let interestPeriod = nonPaymentPeriod
        let payments = []
        if(loanType === "io"){
            payments[0] = (interestPayment.payment36 * interestPeriod) + (monthlyPayment.payment36 * months[0])
            payments[1] = (interestPayment.payment60 * interestPeriod) + (monthlyPayment.payment60 * months[1])
        } else {
            payments[0] = monthlyPayment.payment36 * months[0]
            payments[1] = monthlyPayment.payment60 * months[1]
        }
        setTotalPayment({payment36: payments[0], payment60: payments[1]})
    }

    const handleProgramName = e => {
        setProgramIndex(Number(e.target.value))
        setLoanType(props.loanInfo[programIndex].loanType)
    }

    const handleLoanType = e => {
        setLoanType(e.target.value)
    }

    const handleMetro = e => {
        setMetroIndex(Number(e.target.value))
    }

    useEffect(() => {
        calculateMonthlyPayment() // run calculator when page loads to show initial amounts
        setLoanType(props.loanInfo[programIndex].loanType)
        setNonPaymentPeriod(props.loanInfo[programIndex].nonPaymentPeriod)

        // check to see if the program has multiple locations and set the program max based on individual cities
        if(props.loanInfo[programIndex]['multiMetros']){
            setProgramMax(metros[programIndex][metroIndex]['maxLoanAmt'])
        } else {
            setProgramMax(props['loanInfo'][programIndex]['loanInfo']['maxLoanAmt'])
        }

        // if the program selected has a maximum loan amount smaller than the default loan amount, set the initial value of the slider to the program's max
        if(props.defaultLoanAmount > props['loanInfo'][programIndex]['loanInfo']['maxLoanAmt']) {
            setLoanValue(props['loanInfo'][programIndex]['loanInfo']['maxLoanAmt'])
        } else {
            setLoanValue(props.defaultLoanAmount)
        }

        // hook is triggered when the values in the array below are updated
    }, [metroIndex, programIndex, programMax])

    useEffect(() => {
        calculateTotalPayment()
    }, [monthlyPayment])

    return (
        <div className={props.modal ? "loanCalculator opacity" : "loanCalculator"}>
            {/* <img className="schoolLogo" src={props.src} alt={props.alt} onClick={props.openSchoolPage}/> */}
            <div className="loanCalculator__content">

                <div className="loanCalculator__select">
                    <h2>Simple. Transparent.</h2>
                    {/* <div className="loanCalculator__img"><Img fluid={props.scales} /></div> */}
                    <p id="leadText">Figuring out your monthly payments on a loan shouldn't require a math degree. Find out exactly what you'll pay at {props.schoolname} with a Skills Fund loan:</p>
                    
                    <p>{` `}</p>

                    <div className="loanCalculator__selectInput">
                        <select onChange={handleProgramName}>
                            {props.loanInfo.map((program, i) => <option value={i} key={program.name}>{program.name}</option>)}
                        </select>
                    </div>

                    <p>{` `}</p>

                    <Collapse className="loanCalculator__selectInput" isOpened={props.loanInfo[programIndex].hasIO && props.loanInfo[programIndex].hasIR}>
                        <select onChange={handleLoanType}>
                            <option value="io">Interest-Only</option>
                            <option value="ir">Immediate Repayment</option>
                        </select>
                    </Collapse>

                    <p>{` `}</p>

                    <Collapse className="loanCalculator__selectInput" isOpened={multiMetros[programIndex]}>
                        <select onChange={handleMetro}>
                            {metros.map(city => city.map((program, i) => <option key={program.name} value={i}>{program.location}</option>))}
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
                    <p className="loanCalculator__disclaimers" onClick={props.toggleModal}>Disclaimers</p>
                </div>
                <div className="loanCalculator__monthlyPayments">
                <div className="loanCalculator__36months loanCalculator__monthlyPayments">
                    <h3>{loanType === "io" ? <span className={loanType === "io" ? "show" : "hide"}>Interest-Only</span> : <span className={loanType === "ir" ? "show" : "hide"}>Immediate Repayment</span>}</h3>
                    <h4>36 Month Option</h4>
                    <span className={loanType === "io" ? "show" : "hide"}><><p className="loanCalculator__paymentAmounts">${interestPayment.payment36}</p><p className="loanCalculator__paymentLabel">Interest Only Payment</p></></span>
                    <div className={loanType === "io" ? "show" : "show move"}>
                        <p className="loanCalculator__paymentAmounts">${monthlyPayment.payment36}</p><p className="loanCalculator__paymentLabel">Monthly Payment</p>
                        <p className="loanCalculator__paymentAmounts">{formatterWithCents.format(totalPayment.payment36)}</p><p className="loanCalculator__paymentLabel">Total Cost</p>
                    </div>
                </div>

                <div className="loanCalculator__60months loanCalculator__monthlyPayments">
                    <h3>{loanType === "io" ? <span className={loanType === "io" ? "show" : "hide"}>Interest-Only</span> : <span className={loanType === "ir" ? "show" : "hide"}>Immediate Repayment</span>}</h3>
                    <h4>60 Month Option</h4>
                    <span className={loanType === "io" ? "show" : "hide"}><><p className="loanCalculator__paymentAmounts">${interestPayment.payment60}</p><p className="loanCalculator__paymentLabel">Interest Only Payment</p></></span>
                    <div className={loanType === "io" ? "show" : "show move"}>
                        <p className="loanCalculator__paymentAmounts">${monthlyPayment.payment60}</p><p className="loanCalculator__paymentLabel">Monthly Payment</p>
                        <p className="loanCalculator__paymentAmounts">{formatterWithCents.format(totalPayment.payment60)}</p><p className="loanCalculator__paymentLabel">Total Cost</p>
                    </div>
                </div>
                </div>

            </div>
        </div>
    )
}

export default LoanCalculator