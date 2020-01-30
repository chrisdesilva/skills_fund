import { Link, useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

const Header = () => {
	const data = useStaticQuery(graphql`
		query {
			skflogo: file(relativePath: { eq: "skillsFund_logo.png" }) {
				childImageSharp {
					fluid {
						...GatsbyImageSharpFluid
					}
				}
			}
			whiteSkflogo: file(relativePath: { eq: "skf_logo_white.png" }) {
				childImageSharp {
					fluid(maxWidth: 1200) {
						...GatsbyImageSharpFluid
					}
				}
			}
		}
	`);

	// const [nav, toggleNav] = useState(false)
	const [ navBackground, setNavBackground ] = useState(false);
	const navRef = useRef();
	const [ menuOpen, setMenuOpen ] = useState(false);

	navRef.current = navBackground;
	useEffect(() => {
		const handleScroll = () => {
			const show = window.scrollY > 10;
			if (navRef.current !== show) {
				setNavBackground(show);
			}
		};
		document.addEventListener('scroll', handleScroll);
		return () => {
			document.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		// mobile version
		<header
			className={
				navBackground ? (
					'fixed w-full top-0 z-10 p-2 bg-white navBar scrollBorder'
				) : (
					'fixed w-full top-0 z-10 p-2 bg-white navBar'
				)
			}
		>
			<input onClick={() => setMenuOpen(!menuOpen)} type="checkbox" id="bars" />
			<label class="menu" htmlFor="bars">
				<div class="bar" />
				<div class="bar" />
				<div class="bar" />
			</label>
			<a className="btn btn--nav fixed right-0 top-0 mr-12 text-center" href="https://my.skills.fund/register">
				Apply Now
			</a>

			<ul className="m-0">
				<li className={navBackground ? 'logo shrink my-auto' : 'logo my-auto'}>
					<Link to="/">
						<Img fluid={data.skflogo.childImageSharp.fluid} alt="Skills Fund logo" />
					</Link>
				</li>
			</ul>

			<div className={menuOpen ? 'content showNav' : 'content'}>
				<div className="navFlex">
					<nav>
						<ul className="navigation">
							<li>
								<Link className="w-40 lg:w-48" to="/">
									<Img fluid={data.whiteSkflogo.childImageSharp.fluid} alt="Skills Fund logo" />
								</Link>
							</li>
							<li>
								<Link to="/schools">Our Partner Schools</Link>
							</li>
							<li>
								<Link to="/about">Why Skills Fund?</Link>
							</li>
							<li>
								<Link to="/blog">Student Journey</Link>
							</li>
							<li>
								<Link to="/loan-guide">Loan Guide</Link>
							</li>
							<li>
								<Link to="/frequently-asked-questions">FAQ</Link>
							</li>
							<li>
								<a href="http://my.skills.fund">Check Loan Status</a>
							</li>
							<li>
								<Link to="/repay">Repay My Loan</Link>
							</li>
							<li>
								<a className="btn" href="https://my.skills.fund/register">
									Apply Now
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
	);
};

Header.propTypes = {
	siteTitle: PropTypes.string
};

Header.defaultProps = {
	siteTitle: ``
};

export default Header;
