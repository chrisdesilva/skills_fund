import React, { useState } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/layout';
import SEO from '../components/seo';

import '../styles/main.scss';
import AutoComplete from '../components/autocomplete';

const IndexPage = () => {
	const [ showInput, toggleShowInput ] = useState(false);
	const data = useStaticQuery(graphql`
		query {
			climbers: file(relativePath: { eq: "climbers.png" }) {
				childImageSharp {
					fluid {
						...GatsbyImageSharpFluid
					}
				}
			}
			march: file(relativePath: { eq: "PeopleMarch_Color.png" }) {
				childImageSharp {
					fluid {
						...GatsbyImageSharpFluid
					}
				}
			}
			bike: file(relativePath: { eq: "bike.png" }) {
				childImageSharp {
					fluid {
						...GatsbyImageSharpFluid
					}
				}
			}
		}
	`);

	return (
		<Layout>
			<SEO title="Home" />
			<div>
				<header className="banner">
					<div className="stripesRight">
						<div className="stripesRight--1" />
						<div className="stripesRight--2" />
						<div className="stripesRight--3" />
					</div>
					<div className="stripesLeft invisible lg:visible">
						<div className="stripesLeft--1" />
						<div className="stripesLeft--2" />
						<div className="stripesLeft--3" />
					</div>
					<div className="banner__content">
						<div className="banner__img">
							<Img
								fluid={data.climbers.childImageSharp.fluid}
								alt="Planting a flag on top of a stack of books"
							/>
						</div>
						<div className="banner__text lg:m-12">
							<h1 className="tracking-tight">Higher Ed Financing Made Simple</h1>
							<p>It’s your future. Expect more from your school and lender.</p>
							<div className="banner__buttons">
								{!showInput && (
									<div className="banner__autocomplete show">
										<button className="btn" onClick={() => toggleShowInput(true)}>
											I know my school
										</button>
										<Link to="/schools">
											<button className="btn">I'm doing research</button>
										</Link>
									</div>
								)}
								{showInput && (
									<div className="banner__autocomplete">
										<AutoComplete toggleInput={() => toggleShowInput(false)} />
									</div>
								)}
							</div>
						</div>
					</div>
				</header>

				<section className="leadContent">
					<h2>Meet the Anti-Loan built to create a level playing field for all.</h2>
					<div className="leadContent__content">
						<div className="leadContent__content--text">
							<h3 className="tracking-tight text-primary-dark font-bold text-4xl lg:text-left">
								Built on Transparency
							</h3>
							<p>
								Why do lenders hide what you'll actually pay until after they run a hard credit check?
								Not here. Use our Loan Calculator to see all costs before you apply - and receive your
								approval in minutes.
							</p>
						</div>
						<div className="leadContent__img">
							<Img fluid={data.march.childImageSharp.fluid} />
						</div>
					</div>
					<div className="leadContent__steps">
						<h3 className="mb-0 flex items-center justify-center text-5xl text-primary">1</h3>
						<h4 className="tracking-tight font-bold">Know exactly what you'll pay</h4>
						<p>With our fixed rates, there are no surprises when it comes to your monthly payments.</p>

						<div className="leadContent__steps--centerLine">content</div>

						<div className="leadContent__steps--center">
							<div className="leadContent__steps--center-text">
								<h3 className="mb-0 flex items-center justify-center text-5xl text-primary">2</h3>
								<h4 className="tracking-tight font-bold">You've got options</h4>
								<p className="text-center">
									Whether you know your program or are looking for more information, we've got you
									covered.
								</p>
							</div>
							<div className="leadContent__steps--centerLine">content</div>
							<div className="leadContent__steps--center-img">
								<Img fluid={data.bike.childImageSharp.fluid} alt="Person riding a bike" />
							</div>
						</div>

						<div className="leadContent__steps--centerLine">.</div>

						<h3 className="mb-0 flex items-center justify-center text-5xl text-primary">3</h3>
						<h4 className="tracking-tight font-bold">Return on education</h4>
						<p>We take care of you so you can take care of your future.</p>
					</div>
				</section>

				<section
					className="yotpo yotpo-reviews-carousel"
					data-background-color="transparent"
					data-mode="top_rated"
					data-type="site"
					data-count="9"
					data-show-bottomline="1"
					data-autoplay-enabled="1"
					data-autoplay-speed="3000"
					data-show-navigation="1"
				>
					&nbsp;
				</section>
			</div>
		</Layout>
	);
};

export default IndexPage;
