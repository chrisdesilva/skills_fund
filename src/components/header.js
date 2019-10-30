import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import PropTypes from "prop-types"
import React, { useEffect, useRef, useState } from "react"

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
  
  const [nav, toggleNav] = useState(false)
  const [navBackground, setNavBackground] = useState(false)
  const navRef = useRef()
  
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
      <header>
      
      </header>
    {/* ***** END MOBILE VERSION ***** */}
    


    {/* ***** START WEB VERSION ***** */}
    <header className={ navBackground ? "nav showNav" : "nav"}   >
      <div className="nav__logo">
        <div className={navBackground ? "shrink" : null} id="headerLogo">
          <Link to="/"><Img fluid={data.skflogo.childImageSharp.fluid} alt="Skills Fund logo"/></Link>
        </div>
      </div>
      <div className="nav__links">
        <Link className="colorLink" to="/schools">Choose A Program</Link>
        <Link className="colorLink" to="/quality-assurance">Quality Assurance</Link>
        <Link className="colorLink" to="/faq">FAQ</Link>
      </div>
      <div className="nav__apply">
        <Link className="btn btn--submit" to="/apply">Apply For A Loan</Link>
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
