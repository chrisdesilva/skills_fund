import React, { useState } from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import LoanApp from '../components/partner-pages/loanApp';
import LoanCalculator from '../components/partner-pages/loanCalculator';
import LoanTerms from '../components/partner-pages/loanTerms';
import Modal from '../components/modal';

const PartnerPage = ({ data }) => {
	const loanInfo = data.school.loanInfo.map((program) => program);

	const [ isModalOpen, toggleModal ] = useState(false);
	const openSchoolPage = () => {
		window.open(data.school.basicInfo.schoolurl);
	};

	return (
		<Layout>
			<SEO title={`Financing page for Skills Fund and ${data.school.schoolname}`} />
			<div className="partner-page-container">
				{/* <div className="logos">
              <img className="logos__image" onClick={openSchoolPage} src={data.school.schoolLogo.file.url} alt={`${data.school.schoolname} logo`}/>
              <div className="logos__image" ><Img className="logos__skf" fluid={data.skfLogo.childImageSharp.fluid} alt="Skills Fund logo"/></div>
            </div> */}
				{/* <LoanCalculator
					openSchoolPage={openSchoolPage}
					alt={`${data.school.basicInfo.schoolname} logo`}
					maxLoanAmt={
						data.school.loanInfo[0].aprAndType[0].maxTuition + data.school.loanInfo[0].aprAndType[0].maxCOL
					}
					defaultLoanAmount={data.school.defaultAmount}
					ir36={data.school.basicInfo.interestRate36}
					ir60={data.school.basicInfo.interestRate60}
					origFee={0.04}
					scales={data.scales.childImageSharp.fluid}
					loanInfo={loanInfo}
					// toggleModal={() => toggleModal(true)}
					// modal={isModalOpen}
					schoolname={data.school.basicInfo.schoolname}
				/> */}
				{/* <LoanApp
					schoolname={data.school.schoolname}
					costOfLiving={data.school.costOfLiving}
					skfLogo={data.march.childImageSharp.fluid}
					loanInfo={data.school.loanURLs}
					hubspotFormId={data.school.hubspotFormId}
					selectAProgram={data.school.selectAProgram}
					slug={data.school.slug}
					modal={isModalOpen}
				/> */}
				{/* {isModalOpen ? <Modal toggleModal={() => toggleModal(false)} modal={isModalOpen} /> : null}
				<LoanTerms
					ir36={data.school.interestRate36}
					ir60={data.school.interestRate60}
					multiLoanLengths={data.school.multiLoanLengths}
					APR36={data.school.aprRange36}
					APR60={data.school.aprRange60}
					modal={isModalOpen}
				/> */}
			</div>
		</Layout>
	);
};

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
		school: contentfulSchool(slug: { eq: $slug }) {
			schoolLogo {
				fluid {
					src
				}
			}
			paymentTable {
				data {
					col
					max
					program
					tuition
				}
				show
				headers
			}
			basicInfo {
				locations
				schoolurl
				APRRange36
				APRRange60
				schoolname
				programTypes
				hubspotFormID
				interestRate36
				interestRate60
				selectAProgram
				applicationsLive
				nextCohortStartDate
				disabledLoanAppFormID
			}
			features {
				products
				costOfLiving
				multiPrograms
				multiLoanLengths
			}
			loanInfo {
				name
				value
				defaultAmount
				metros {
					maxCOL
					location
					maxTuition
				}
				segment
				aprAndType {
					type
					apr36
					apr60
					maxCOL
					maxTuition
				}
				multiMetros
				nonPaymentPeriod
			}
		}
		skfLogo: file(relativePath: { eq: "skillsFund_logo.png" }) {
			...fluidImage
		}
		march: file(relativePath: { eq: "PeopleMarch_Color.png" }) {
			...fluidImage
		}
		scales: file(relativePath: { eq: "Scales_Color.png" }) {
			...fluidImage
		}
	}
`;
