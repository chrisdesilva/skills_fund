import React from 'react'
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import LoanApp from "../components/partner-pages/loanApp"
import LoanCalculator from "../components/partner-pages/loanCalculator"


const PartnerPage = ({ data }) => {

    return (
        <Layout>
        <SEO title={`Partner page for Skills Fund and ${data.school.schoolname}`} />
          <div className="partner-page-container">
            <div className="logos">
              <img className="logos__image" src={data.school.schoolLogo.file.url} alt={`${data.school.schoolname} logo`}/>
              <div className="logos__image" ><Img className="logos__skf" fluid={data.skfLogo.childImageSharp.fluid} alt="Skills Fund logo"/></div>
            </div>
            <LoanApp 
              schoolname={data.school.schoolname}
              costOfLiving={data.school.costOfLiving}
              skfLogo={data.march.childImageSharp.fluid}
              loanInfo={data.school.loanInfo}
              hubspotFormId={data.school.hubspotFormId}
              selectAProgram={data.school.selectAProgram}
              slug={data.school.slug}

            />
            <LoanCalculator 
              maxLoanAmt={data.school.loanInfo[0].loanInfo.maxLoanAmt}
              defaultLoanAmount={data.school.defaultLoanAmount}
              ir36={data.school.interestRate36}
              ir60={data.school.interestRate60}
              origFee={data.school.origFee}
              hasIO={data.school.hasInterestOnly}
              scales={data.scales.childImageSharp.fluid}
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
        segment
        loanInfo {
          loanTerm36
          loanTerm60
          maxLoanAmt
        }
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
      programLoanInfo {
        name
        segment
        loanInfo {
          loanTerm36
          loanTerm60
          maxLoanAmt
        }
      }
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