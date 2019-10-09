import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useEffect, useRef, useState } from "react"
import skillsFund from "../images/skillsFund_logo.png"


const Header = () => {
  
  const [nav, toggleNav] = useState(false)
  const [navBackground, setNavBackground] = useState(false)
  const navRef = useRef()
  
  navRef.current = navBackground
  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 50
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
