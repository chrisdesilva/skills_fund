import { Link, useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';

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
					fluid {
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
		<Fragment>
			<header
				className={
					navBackground ? (
						'fixed w-full top-0 z-10 p-2 bg-white navBar scrollBorder lg:hidden'
					) : (
						'fixed w-full top-0 z-10 p-2 bg-white navBar lg:hidden'
					)
				}
			>
				<button onClick={() => setMenuOpen(!menuOpen)} id="bars" />
				<label className={menuOpen ? 'menu menuBars' : 'menu'} htmlFor="bars">
					<div className="bar" />
					<div className="bar" />
					<div className="bar" />
				</label>
				<Link className="btn btn--nav fixed right-0 top-0 text-center" to="/schools/apply">
					Apply Now
				</Link>

				<ul className="ml-0 mb-0">
					<li className={navBackground ? 'logo shrink' : 'logo'}>
						<Link to="/">
							{menuOpen ? (
								<Img fluid={data.whiteSkflogo.childImageSharp.fluid} alt="Skills Fund logo" />
							) : (
								<Img fluid={data.skflogo.childImageSharp.fluid} alt="Skills Fund logo" />
							)}
						</Link>
					</li>
				</ul>

				<div className={menuOpen ? 'content showNav' : 'content'}>
					<div className="navFlex">
						<nav>
							<ul className="navigation">
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
									<Link className="btn" to="/schools/apply">
										Apply Now
									</Link>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</header>
			{/* desktop version */}
			<header
				className={
					navBackground ? (
						'fixed w-full top-0 z-10 p-2 bg-white navBar scrollBorder lg:flex items-center hidden'
					) : (
						'fixed w-full top-0 z-10 p-2 bg-white navBar lg:flex items-center hidden'
					)
				}
			>
				<ul className="ml-0 mb-0">
					<li className="logo">
						<Link to="/">
							<Img fluid={data.skflogo.childImageSharp.fluid} alt="Skills Fund logo" />
						</Link>
					</li>
				</ul>
				<nav className="flex items-center w-2/3">
					<ul className="flex items-center mb-0 desktopNav">
						<li>
							<Link to="/schools">Our Partner Schools</Link>
						</li>
						<li>
							<Link to="/about">Why Skills Fund?</Link>
						</li>
						<li className="dropdown">
							<Link className="dropdown--main" to="/blog">
								Student Journey <FaCaretDown />
							</Link>
							<div className="dropdown--content">
								<li>
									<Link to="/loan-guide">Loan Guide</Link>
								</li>
								<li>
									<Link to="/frequently-asked-questions">FAQ</Link>
								</li>
							</div>
						</li>
					</ul>
				</nav>

				<nav className="flex items-center w-1/3 justify-end">
					<ul className="flex items-center mb-0 desktopNav justify-end">
						<li id="myLoan" className="dropdown">
							<a className="dropdown--main" href="http://my.skills.fund">
								My Loan <FaCaretDown />
							</a>
							<div className="dropdown--content">
								<li>
									<a href="http://my.skills.fund">Check Loan Status</a>
								</li>
								<li>
									<Link to="/repay">Repay My Loan</Link>
								</li>
							</div>
						</li>
						<li>
							<Link className="btn btn--nav fixed right-0 top-0 text-center" to="/schools/apply">
								Apply Now
							</Link>
						</li>
					</ul>
				</nav>
			</header>
		</Fragment>
	);
};

Header.propTypes = {
	siteTitle: PropTypes.string
};

Header.defaultProps = {
	siteTitle: ``
};

export default Header;
