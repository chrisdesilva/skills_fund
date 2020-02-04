import React, { useLayoutEffect, useRef, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../../components/layout';
import SEO from '../../components/seo';
import Image from '../../components/image';

const Apply = () => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulSchool {
				edges {
					node {
						slug
						schoolLogo {
							sizes(maxWidth: 1280) {
								...GatsbyContentfulSizes
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
				}
			}
			climbers: file(relativePath: { eq: "Climbers_Color.png" }) {
				childImageSharp {
					fluid {
						...GatsbyImageSharpFluid
					}
				}
			}
		}
	`);

	const schoolsList = data.allContentfulSchool.edges;
	const [ schoolIndex, setSchoolIndex ] = useState(0);
	const [ schoolName, setSchoolName ] = useState('');
	const [ showPrograms, setShowPrograms ] = useState(false);
	const [ programIndex, setProgramIndex ] = useState(0);
	const [ loanUrl, setLoanUrl ] = useState(null);
	const [ programName, setProgramName ] = useState('');
	const [ showApply, setShowApply ] = useState(false);
	const [ email, setEmail ] = useState('');

	const firstUpdate = useRef(true);

	useLayoutEffect(
		() => {
			if (firstUpdate.current) {
				firstUpdate.current = false;
				return;
			}
			setSchoolName(schoolsList[schoolIndex]['node']['basicInfo']['schoolname']);
			setProgramName(schoolsList[schoolIndex]['node']['loanInfo'][programIndex]['name']);
			setLoanUrl(schoolsList[schoolIndex]['node']['loanInfo'][programIndex]['segment']);
		},
		[ schoolName, programName ]
	);

	const selectSchool = (e) => {
		setProgramIndex(0);
		setShowPrograms(true);
		setSchoolIndex(e.target.value);
		setSchoolName(schoolsList[schoolIndex]['node']['basicInfo']['schoolname']);
	};

	const selectProgram = (e) => {
		setProgramIndex(e.target.value);
		setLoanUrl(schoolsList[schoolIndex]['node']['loanInfo'][programIndex]['segment']);
		setProgramName(schoolsList[schoolIndex]['node']['loanInfo'][programIndex]['name']);
		setShowApply(true);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		window.open(loanUrl);
	};

	return (
		<Layout>
			<SEO title="Apply" />
			<div className="h-screen flex flex-col items-center">
				<section className="flex justify-center">
					<select defaultValue={'default'} onBlur={selectSchool} onChange={selectSchool}>
						<option disabled value="default">
							Select Your School
						</option>
						{schoolsList.map((school, i) => (
							<option key={school.node.basicInfo.schoolname} value={Number(i)}>
								{school.node.basicInfo.schoolname}
							</option>
						))}
					</select>
					<select
						className={showPrograms ? 'show' : 'opacity-0'}
						defaultValue={'default'}
						onBlur={selectProgram}
						onChange={selectProgram}
					>
						<option disabled value="default">
							Select Your Program
						</option>
						{schoolsList[schoolIndex].node.loanInfo.map((program, i) => (
							<option key={program.segment} value={Number(i)}>
								{program.name}
							</option>
						))}
					</select>
				</section>
				<section className="flex justify-center mt-5">
					<form onSubmit={handleSubmit} className={showApply ? 'flex show' : 'flex opacity-0'}>
						<input
							type="email"
							placeholder="Enter your email address"
							value={email}
							onBlur={(e) => setEmail(e.target.value)}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<input
							type="submit"
							value="Next &rarr;"
							className={email && loanUrl ? 'btn btn--submit' : 'btn btn--disabled'}
							disabled={email && loanUrl ? false : true}
						/>
					</form>
				</section>
				<div className="w-1/5 my-4">
					{showApply && <Img sizes={schoolsList[schoolIndex]['node']['schoolLogo']['sizes']} />}
				</div>
			</div>
		</Layout>
	);
};

export default Apply;
