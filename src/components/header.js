import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import PropTypes from "prop-types"
import React, { useEffect, useRef, useState } from "react"
import { FaCaretDown } from "react-icons/fa"

const Header = () => {

  const data = useStaticQuery(graphql`
    query {
      skflogo: file(relativePath: { eq: "skillsFund_logo.png"}) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  
  // const [nav, toggleNav] = useState(false)
  const [navBackground, setNavBackground] = useState(false)
  const navRef = useRef()
  const [isMenuOpen, toggleMenu] = useState(false)
  
  navRef.current = navBackground
  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 10
      if (navRef.current !== show){
        setNavBackground(show)
      }
    }
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
    {/* ***** START MOBILE VERSION ***** */}
      <header className={isMenuOpen ? "nav expanded" : "nav closed"}>
        <div className={isMenuOpen ? "nav__links show" : "nav__links hidden"}>
          <Link className="colorLink" to="/schools">View All Schools</Link>
          <Link className="colorLink" to="/quality-assurance">Quality Assurance</Link>
          <a className="colorLink" href="https://my.skills.fund" target="_blank" rel="noreferrer noopener">Application Status</a>
          <Link className="colorLink" to="/repayment">Make a Payment</Link>
          <Link className="colorLink" to="/blog">Why Our Loans Are Better</Link>
          <Link to="/apply"><button className="btn btn--submit">Apply For A Loan</button></Link>
        </div>
        <div className="nav__logo">
          <div className={navBackground ? "shrink" : null} id="headerLogo">
            <Link to="/"><Img fluid={data.skflogo.childImageSharp.fluid} alt="Skills Fund logo"/></Link>
          </div>
        </div>
        <div className="nav__menu">
          <p onClick={() => toggleMenu(!isMenuOpen)}><span className={isMenuOpen ? "rotate" : null}><FaCaretDown /></span> Menu</p>
        </div> 
      </header>
    {/* ***** END MOBILE VERSION ***** */}
    


    {/* ***** START WEB VERSION ***** */}
    <header className={ navBackground ? "bigNav showNav" : "bigNav"}   >
      <div className="bigNav__logo">
        <div className={navBackground ? "shrink" : null} id="headerLogo">
          <Link to="/"><Img fluid={data.skflogo.childImageSharp.fluid} alt="Skills Fund logo"/></Link>
        </div>
      </div>
      <div className="bigNav__links">
        <Link className="colorLink" to="/schools">View All Schools</Link>
        <Link className="colorLink" to="/quality-assurance">Quality Assurance</Link>
        <a className="colorLink" href="https://my.skills.fund" target="_blank" rel="noreferrer noopener">Application Status</a>
        <Link className="colorLink" to="/repayment">Make a Payment</Link>
        <Link className="colorLink" to="/blog">Why Our Loans Are Better</Link>
      </div>
      <div className="bigNav__apply">
        <Link to="/apply"><button className="btn btn--submit">Apply For A Loan</button></Link>
      </div>
    </header>

    {/* ***** END WEB VERSION ***** */}
    </>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
