import React, { useEffect, useState } from 'react'
import { UnmountClosed as Collapse } from 'react-collapse'
import ReactGA from "react-ga"
import ReactPixel from "react-facebook-pixel"
import Img from "gatsby-image"

const LoanApp = props => {

    const [segment, setSegment] = useState(props.loanInfo[0].segment)
    const [programName, setProgramName] = useState(props.loanInfo[0].name)
    const [IP, setIP] = useState('')
    const [email, setEmail] = useState('')
    const [submitted, isSubmitted] = useState(false)
    const [disclaimers, toggleDisclaimers] = useState(false)
  
    // Get IP address from client for Hubspot analytics
    async function fetchIP() {
      const res = await fetch("https://ip.nf/me.json")
      res
          .json()
          .then(res => setIP(res.ip.ip))
          .catch(err => console.log(err))
    }
  
    useEffect(() => {
      fetchIP();
    })
  
    const updateLoanUrl = e => {
      const { options, selectedIndex } = e.target
      setSegment(e.target.value)
      setProgramName(options[selectedIndex].innerHTML)
    }
  
    const handleChange = e => {
      setEmail(e.target.value)
    }
  
    const redirectLoanApp = () => {
      window.open(`https://sf.privateloan.studentloan.org/external/LoanApplication.do?lenderCode=${segment}`, "_blank", "noopener noreferrer")
    };
  
    const trackGoogleAnalyticsEvent = () => {
      ReactGA.event({
          category: `Apply Now Button`,
          action: 'click',
          label: 'submitted loan application'
      })
    }
  
    const trackFacebookPixel = () => {
      ReactPixel.track('InitiateCheckout', {
          value: 7200.00,
          currency: 'USD'
      })
    }
  
    // submit form data to Hubspot, track Google Analytics event, and redirect user to loan application
    const handleSubmit = e => {
      e.preventDefault();
      const url = `https://api.hsforms.com/submissions/v3/integration/submit/3871135/${props.hubspotFormId}`
      
      // hsCookie gets the data necessary to track Hubspot analytics
      const hsCookie = document.cookie.split(';').reduce((cookies, cookie) => {
          const [ name, value ] = cookie.split('=').map(c => c.trim());
          cookies[name] = value;
          return cookies;
        }, {});
  
      //   field names are all set to match internal values on Hubspot
      const info = {
      "fields": [
          {
          "name": "email",
          "value": `${email}`
          },
          {
          "name": "stakeholder_type",
          "value": "Student"
          },
          {
          "name": `${props.selectAProgram}`,
          "value": `${programName}`
          },
          {
          "name": "school",
          "value": `${props.schoolname}`
          },
          {
          "name": "student_loan_application_status",
          "value": "BLA Click Email Submitted"
          },
          {
          "name": "clicked_begin_loan_application_bla",
          "value": "BLA Click"
          },
      ],
      "context": {
          "hutk": hsCookie.hubspotutk, // include this parameter and set it to the hubspotutk cookie value to enable cookie tracking on your submission
          "pageUri": `${props.slug}`,
          "pageName": `${props.schoolname} | Skills Fund`,
          "ipAddress": `${IP}`
      }
      }
  
      fetch(url, {
          method: 'POST',
          body: JSON.stringify(info),
          headers: {
              'Content-Type': 'application/json'
          }
      }).then(res => res.json())
      .then(response => console.log('success', response))
      .catch(error => console.log('error: ', error))
      
      trackGoogleAnalyticsEvent()
      trackFacebookPixel()
      redirectLoanApp()
      isSubmitted(true)
  }
    return (
        <div className="loanApp">
              
        <h1>Loan Application for {props.schoolname}</h1>
        <div className="loanApp__content">
          <h2>{props.schoolname} Tuition {props.costOfLiving ? 'and Cost of Living' : null} Financing</h2>
          <div className="loanApp__img"><Img fluid={props.skfLogo} alt="Skills Fund logo"/></div>
            <form onSubmit={handleSubmit} className={`loanApp__form  ${props.schoolname}_apply_now program-apply`}>
              <label htmlFor="email">Email address</label>
              <input onChange={handleChange} type="email" name="email" value={email} placeholder="Enter your email address" />
              <select onChange={updateLoanUrl}>
                {props.loanInfo.map((school, i) => <option key={school.name} value={school.segment}>{school.name}</option>)}
              </select>
              {submitted ? <span>Thanks for applying! Your loan application has opened in a new window. If the application does not open and pop-up blockers have been disabled, please contact <a href="mailto:tech@skills.fund">Tech@Skills.Fund</a>.</span> : <input className="btn btn--submit" type="submit" value="APPLY NOW"/>}
            </form>
        </div>
        <div className="loanApp__subContent">
          <p onClick={() => toggleDisclaimers(!disclaimers)}><span className="disclaimers">Disclaimers</span></p>
          <Collapse isOpened={disclaimers} springConfig={{stiffness: 150, damping: 40}}>
            <div>
                <p><strong>Before you begin, please read these important notes:</strong></p>
                <p>Customer identification policy:</p>
                <p>For the purpose of the following notice, the words "you" and "your" mean the Borrower and the Cosigner. All applicants: Important Federal Law Notice - Important information about procedures for opening a new account: To help the government fight the funding of terrorism and money laundering activities, federal law requires all financial institutions to obtain, verify, and record information that identifies each person who opens an account. What this means for you: When you open an account, we will ask for your name, address, date of birth and other information that will allow us to identify you. We may also ask to see your driver's license or other identifying documents.</p>
                <p>Consent to share data:</p>
                <p>By clicking the box below and beginning the application, I consent under Federal and state privacy laws to NIMAA providing to Skills Fund information related to my application, enrollment, and completion, including but not limited to information contained in my original application and supplements as well as information regarding my completion, graduation, and post-program outcomes information.</p>
                <p><strong>While in the application, please note:</strong></p>
                <p>1. DO NOT use the browser Back button. Using the browser Back button may cause invalid information and delay the processing of your loan.</p>
                <p>2. Your application will not be complete until it has been signed and submitted along with any required documentation.</p>
                <p style={{margin: 0}}>3. You will need the address and phone number of 3 references to complete your application, including one relative not living with you. Others may be friends, employers, etc.</p>
            </div>
        </Collapse>
        </div>
      </div>
    )
}

export default LoanApp