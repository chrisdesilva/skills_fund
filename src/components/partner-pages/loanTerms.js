import React from 'react'

const LoanTerms = props => {

    return (
        <div className="loanTerms">
        <div id="shape-1"></div>
        <div id="shape-2"></div>
            <div className="loanTerms__info">
                <div className="loanTerms__interestRates">
                    <h3>Interest Rates</h3>
                    <div className="loanTerms_percentages">
                        <p><span>36 mo.</span> {props.ir36}<span>%</span></p>
                        {props.multiLoanLengths ? <p><span>60 mo.</span> {props.ir60}<span>%</span></p> : null }
                    </div>
                </div>
                <div className="loanTerms__APR">
                    <h3>APR</h3>
                    <div className="loanTerms_percentages">
                        <p><span>36 mo.</span> {props.APR36}<span>%</span></p>
                        {props.multiLoanLengths ? <p><span>60 mo.</span> {props.APR60}<span>%</span></p> : null }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoanTerms