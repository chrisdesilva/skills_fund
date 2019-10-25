import React, { useState } from 'react'
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import LoanApp from "../components/partner-pages/loanApp"
import LoanCalculator from "../components/partner-pages/loanCalculator"
import LoanTerms from '../components/partner-pages/loanTerms'
import Modal from '../components/modal'


const PartnerPage = ({ data }) => {

  const loanInfo = data.school.loanInfo.map(program => program)

  const [isModalOpen, toggleModal] = useState(true)
  const openSchoolPage = () => {
    window.open(data.school.schoolurl)
  }


    return (
        <Layout>
        <SEO title={`Financing page for Skills Fund and ${data.school.schoolname}`} />
          <div className="partner-page-container">
            <div className="logos">
              <img className="logos__image" onClick={openSchoolPage} src={data.school.schoolLogo.file.url} alt={`${data.school.schoolname} logo`}/>
              <div className="logos__image" ><Img className="logos__skf" fluid={data.skfLogo.childImageSharp.fluid} alt="Skills Fund logo"/></div>
            </div>
            <LoanApp 
              schoolname={data.school.schoolname}
              costOfLiving={data.school.costOfLiving}
              skfLogo={data.march.childImageSharp.fluid}
              loanInfo={data.school.loanURLs}
              hubspotFormId={data.school.hubspotFormId}
              selectAProgram={data.school.selectAProgram}
              slug={data.school.slug}
              modal={isModalOpen}
            />
            {isModalOpen ? 
              <Modal 
                toggleModal={() => toggleModal(false)}
                modal={isModalOpen}
              />
              :
              null
            }
            <LoanCalculator 
              maxLoanAmt={data.school.loanInfo[0].loanInfo.maxLoanAmt}
              defaultLoanAmount={data.school.defaultLoanAmount}
              ir36={data.school.interestRate36}
              ir60={data.school.interestRate60}
              origFee={data.school.origFee}
              scales={data.scales.childImageSharp.fluid}
              loanInfo={loanInfo}
              toggleModal={() => toggleModal(true)}
              modal={isModalOpen}
            />
            <LoanTerms 
              ir36={data.school.interestRate36}
              ir60={data.school.interestRate60}
              multiLoanLengths={data.school.multiLoanLengths}
              APR36={data.school.aprRange36}
              APR60={data.school.aprRange60}
              modal={isModalOpen}
            />
          </div>
        </Layout>
    )
}

export default PartnerPage;

export const fluidImage = graphql`
  fragment fluidImage on File {
    childImageSharp {
      fluid {
        ...GatsbyImageSharpFluid
      }
    }
  }
`;

export const pageQuery = graphql`
  query($slug: String!) {
    school: contentfulSchool(slug: {eq: $slug}) {
      applicationsLive
      aprRange36
      aprRange60
      loanInfo: childrenContentfulSchoolProgramLoanInfoJsonNode {
        name
        hasIO
        hasIR
        multiMetros
        nonPaymentPeriod
        loanType
        metros {
          location
          maxLoanAmt
        }
        loanInfo {
          loanTerm36
          loanTerm60
          maxLoanAmt
        }
      }
      loanURLs: childrenContentfulSchoolLoanUrLsJsonNode {
        name
        segment
      }
      costOfLiving
      defaultLoanAmount
      disabledLoanAppFormId
      hasImmediateRepayment
      hasInterestOnly
      hubspotFormId
      immediateRepayment {
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
        programName
      }
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
      loanRange {
        loanRange
      }
      multiLoanLengths
      multiLoanTypes
      multiPrograms
      nextCohortStartDate
      origFee
      paymentTable {
        data {
          col
          max
          program
          tuition
        }
        headers
        show
      }
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
    skfLogo: file(relativePath: { eq: "skillsFund_logo.png" }){
      ...fluidImage
    }
    march: file(relativePath: { eq: "PeopleMarch_Color.png" }){
      ...fluidImage
    }
    scales: file(relativePath: { eq: "Scales_Color.png" }){
      ...fluidImage
    }
  }
`;