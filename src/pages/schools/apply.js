import React, { useEffect, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { UnmountClosed } from 'react-collapse';

import Layout from '../../components/layout';
import SEO from '../../components/seo';

const Apply = () => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulSchool {
				edges {
					node {
						schoolname
						origFee
						interestRate36
						interestRate60
						aprRange36
						aprRange60
						defaultLoanAmount
						placeholderAmount
						multiPrograms
						multiLoanTypes
						multiLoanLengths
						programLoanInfo {
							APR36
							APR60
							hasIO
							hasIR
							showLoanTypes
							metros {
								location
								maxLoanAmt
								loanInfo {
									loanTerm36
									loanTerm60
									maxLoanAmt
								}
							}
							loanType
						}
						loanUrLs {
							segment
							name
						}
					}
				}
			}
		}
	`);

	const schoolsList = data.allContentfulSchool.edges;
	const [ schoolIndex, setSchoolIndex ] = useState(0);
	const [ schoolName, setSchoolName ] = useState('');
	const [ showPrograms, setShowPrograms ] = useState(false);
	const [ loanUrlIndex, setLoanUrlIndex ] = useState(0);
	const [ loanUrl, setLoanUrl ] = useState(null);
	const [ programName, setProgramName ] = useState('');
	const [ showApply, setShowApply ] = useState(false);
	const [ email, setEmail ] = useState('');

	useEffect(
		() => {
			setSchoolName(schoolsList[schoolIndex]['node']['schoolname']);
			setProgramName(schoolsList[schoolIndex].node.loanUrLs[loanUrlIndex]['name']);
			setLoanUrl(schoolsList[schoolIndex]['node']['loanUrLs'][loanUrlIndex]['segment']);
		},
		[ schoolIndex, loanUrlIndex ]
	);

	const selectSchool = (e) => {
		setLoanUrlIndex(0);
		setShowPrograms(true);
		setSchoolIndex(e.target.value);
		setSchoolName(schoolsList[schoolIndex]['node']['schoolname']);
	};

	const selectProgram = (e) => {
		setLoanUrlIndex(e.target.value);
		setLoanUrl(schoolsList[schoolIndex]['node']['loanUrLs'][loanUrlIndex]['segment']);
		setProgramName(schoolsList[schoolIndex].node.loanUrLs[loanUrlIndex]['name']);
		setShowApply(true);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		window.open(loanUrl);
	};

	return (
		<Layout>
			<SEO title="Apply" />
			<div className="flex justify-center mt-5">
				<select onChange={selectSchool}>
					<option>Select Your School</option>
					{schoolsList.map((school, i) => <option value={Number(i)}>{school.node.schoolname}</option>)}
				</select>
				<UnmountClosed isOpened={showPrograms}>
					<select onChange={selectProgram}>
						{schoolsList[schoolIndex].node.loanUrLs.map((program, i) => (
							<option value={Number(i)}>{program.name}</option>
						))}
					</select>
				</UnmountClosed>
				{/* <select className={showPrograms ? 'show' : 'opacity-0'} onChange={selectProgram}>
					{schoolsList[schoolIndex].node.loanUrLs.map((program, i) => (
						<option value={Number(i)}>{program.name}</option>
					))}
				</select> */}
			</div>
			<div className="flex justify-center mt-5">
				<form onSubmit={handleSubmit} className={schoolName ? 'flex show' : 'flex opacity-0'}>
					<input
						type="email"
						placeholder="Enter your email address"
						value={email}
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
			</div>
		</Layout>
	);
};

export default Apply;
