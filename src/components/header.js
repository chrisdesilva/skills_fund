import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import skillsFund from "../images/skillsFund_logo.png"
import { FaBars, FaTimes } from 'react-icons/fa'
import { UnmountClosed as Collapse } from 'react-collapse'

const Header = () => {
  
  const [nav, toggleNav] = useState(false)

  return (
    <>
    {/* ***** START MOBILE VERSION ***** */}
      <header className="border-b-4 border-primary lg:hidden">
      <Collapse isOpened={!nav} springConfig={{stiffness: 150, damping: 30}}>
        <div className="flex justify-around py-2 bg-white">

          {/* LOGO */}
          <div className="flex justify-start items-center m-0">
              <Link to="/">
                <img className="h-8 m-0" src={skillsFund} alt="Skills Fund Logo"/>
              </Link>
          </div>

          <div className="flex flex-col items-center">
          <span onClick={() => toggleNav(!nav)} className="cursor-pointer bg-gray-100 text-primary rounded-full shadow h-12 w-12 justify-center items-center flex"><FaBars /></span>
          </div>

        </div>
      </Collapse>
      <Collapse isOpened={nav} springConfig={{stiffness: 150, damping: 30}}>
            <div className="flex justify-end pt-8 pr-8">
              <span onClick={() => toggleNav(!nav)} className="cursor-pointer bg-gray-100 text-primary rounded-full shadow h-12 w-12 justify-center items-center flex"><FaTimes /></span>
            </div>
            <div className="flex flex-col items-center text-lg">
              {/* DROPDOWN */}
                <div className="flex flex-col justify-center items-center">
                  <Link className="hoverButton bg-primary mt-4 rounded px-4 py-2 text-white text-center w-32 shadow-xl" to="/get-started">
                    Get Started
                  </Link>
                  <Link id="students" to="/schools" className="pt-4">
                    Students
                  </Link>
                  <Link className="pt-4" to="/how-skills-fund-works">
                    How Skills Fund Works
                  </Link>
                  <Link className=" pt-4" to="/how-to-apply-for-a-loan">
                    How To Apply For A Loan
                  </Link>
                  <Link className=" pt-4" to="/eligibility-criteria">
                    Credit & Eligibility Criteria
                  </Link>
                  <Link className=" pt-4" to="/pay-your-loan">
                    How To Pay Your Loan
                  </Link>
                  <Link className="pt-4" to="/reviews">
                    Reviews
                  </Link>
                  <Link to="/partners" className="pt-4">
                    Partners
                  </Link>
                  <Link to="/about" className="pt-4">
                    About
                  </Link>
                  <Link to="/blog" className="pt-4">
                    Blog
                  </Link>
                  <Link className="pt-4" to="/student-journey">
                    Student Journey
                  </Link>
                  <Link className="pt-4" to="/financing-101">
                    Financing 101
                  </Link>
                  <Link className="py-4" to="/frequently-asked-questions">
                    FAQ
                  </Link>
                </div>
              </div>
            </Collapse>
    </header>
    {/* ***** END MOBILE VERSION ***** */}
    


    {/* ***** START WEB VERSION ***** */}
    <header className="hidden lg:block border-b-4 border-primary">
      <div className="flex">

        {/* LOGO */}
        <div className="w-1/4 flex justify-center items-center m-0">
            <Link to="/">
              <img className="h-8 m-0" src={skillsFund} alt="Skills Fund Logo"/>
            </Link>
        </div>

        {/* CENTRAL NAVIGATION */}
        <div className="w-1/4 flex justify-around items-center text-lg">
          
          {/* DROPDOWN */}
          <div className="subnav flex justify-center">
            <p id="students" className="py-4 cursor-pointer m-0 colorLink">
              <Link to="/schools">
                Students
              </Link>
            </p>
              <div className="subnav__content mt-12 p-4 bg-white border-t-4 border-primary shadow-2xl rounded flex flex-col">
                <Link className="colorLink" to="/how-skills-fund-works">
                  How Skills Fund Works
                </Link>
                <Link className="colorLink pt-4" to="/how-to-apply-for-a-loan">
                  How To Apply For A Loan
                </Link>
                <Link className="colorLink pt-4" to="/eligibility-criteria">
                  Credit & Eligibility Criteria
                </Link>
                <Link className="colorLink pt-4" to="/pay-your-loan">
                  How To Pay Your Loan
                </Link>
                <Link className="colorLink pt-4" to="/reviews">
                  Reviews
                </Link>
              </div>
          </div>

          <Link to="/partners" className="colorLink">
            Partners
          </Link>

          <Link to="/about" className="colorLink">
            About
          </Link>

          {/* DROPDOWN */}
          <div className="subnav flex justify-center">
            <p id="students" className="py-4 cursor-pointer  m-0 colorLink">
              <Link to="/blog">
                Blog
              </Link>
            </p>
              <div className="subnav__content mt-12 p-4 bg-white border-t-4 border-primary shadow-2xl rounded flex flex-col">
                <Link className="colorLink" to="/student-journey">
                  Student Journey
                </Link>
                <Link className="colorLink pt-4" to="/financing-101">
                  Financing 101
                </Link>
                <Link className="colorLink pt-4" to="/frequently-asked-questions">
                  FAQ
                </Link>
              </div>
          </div>

        </div>

        {/* GET STARTED */}
        <div className="w-1/2 pr-16 flex justify-end items-center font-bold">
          <Link className="hoverButton bg-primary rounded px-4 py-2 text-white text-center w-32 shadow-xl" to="/get-started">Get Started</Link>
        </div> 

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
