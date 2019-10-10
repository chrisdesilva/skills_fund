import React, { useState } from 'react'
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"


const PartnerPage = ({ data }) => {

  const [loanUrl, setLoanUrl] = useState(data.school.loanInfo[0].url)
  const [programName, setProgramName] = useState(data.school.loanInfo.name)


  const updateLoanUrl = e => {
    const { options, selectedIndex } = e.target
    setLoanUrl(e.target.value)
    setProgramName(options[selectedIndex].innerHTML)
  }

    return (
        <Layout>
        <SEO title={`Partner page for Skills Fund and ${data.school.schoolname}`} />
            <h1 style={{color: 'black'}}>{data.school.schoolname}</h1>
            <h2>{data.school.schoolurl}</h2>
            <h3>{data.school.slug}</h3>
            <img style={{width: '25rem'}} src={data.school.schoolLogo.file.url} />
            <select onChange={updateLoanUrl}>
              {data.school.loanInfo.map((school, i) => <option key={school.name} value={school.url}>{school.name}</option>)}
            </select>
            <p>{loanUrl}</p>
            <p>{programName}</p>
        </Layout>
    )
}

export default PartnerPage;

export const pageQuery = graphql`
  query($slug: String!) {
    school: contentfulSchool(slug: {eq: $slug}) {
      applicationsLive
      aprRange36
      loanInfo: childrenContentfulSchoolProgramLoanInfoJsonNode {
        url
        name
        locations
        loanInfo {
          loanTerm36
          loanTerm60
          maxLoanAmt
        }
        metros {
          location
          loanInfo {
            loanTerm36
            loanTerm60
            maxLoanAmt
          }
        }
      }
      defaultLoanAmount
      disabledLoanAppFormId
      faq {
        APR36
        APR60
        IOPayment36
        IOPayment60
        costOfLiving
        costOfLivingPrograms
        immediateRepayment
        interestOnly
        interestRate36
        interestRate60
        loanRange {
          col
          colAmount
          maxAmount
          programName
        }
        multCostOfLivingPrograms
        multiPrograms
        multipleLoanLengths
        multipleLoanTypes
        onlinePrograms
        origFee
        schoolHQState
      }
      headline
      hubspotFormId
      interestOnly {
        APR36
        APR60
        FullMonthlyPayment36
        FullMonthlyPayment60
        IOPayment36
        IOPayment60
        LoanExampleAmt
        LoanExampleAmtPlusOFee
        LoanExampleOFeeAmt
        financeCharge36
        financeCharge60
        programLength
        programName
      }
      interestRate36
      interestRate60
      interestRates {
        ir36
        ir60
      }
      leadContent {
        header
        paragraph
      }
      multiLoanLengths
      multiLoanTypes
      netlifyFormName
      placeholderAmount
      programMaxText {
        programMaxText
      }
      schoolLogo {
        file {
          url
        }
      }
      schoolname
      schoolurl
      selectAProgram
      slug
    }
  }
`;