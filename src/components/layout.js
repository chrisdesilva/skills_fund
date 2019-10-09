import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { FaTwitter, FaFacebookF } from "react-icons/fa"

import Header from "./header"
import "../styles/main.scss"

// no updates necessary

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div>
        <main>{children}</main>
        <footer className="text-center my-8">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3">
              <p className="uppercase mb-1"><a href="https://skills.fund/privacy-policy" target="_blank" rel="noreferrer noopener" className="colorLink">privacy policy</a></p>
              <p className="uppercase"><a href="https://skills.fund/terms-of-use" target="_blank" rel="noreferrer noopener" className="colorLink">terms of use</a></p>
            </div>
            <div className="w-full mb-5 md:mb-0 md:w-1/3 flex items-center justify-center">
              <a href="https://twitter.com/skills_fund" target="_blank" rel="noreferrer noopener" className="colorLink mx-4 text-2xl"><FaTwitter/></a>
              <a href="https://www.facebook.com/SkillsFundEd/" target="_blank" rel="noreferrer noopener" className="colorLink mx-4 text-2xl"><FaFacebookF /></a>
            </div>
            <div className="w-full md:w-1/3">
              <p className="mb-1">Customer Service:</p>
              <p><a href="mailto:customertrust@skills.fund" className="colorLink">CustomerTrust@skills.fund</a></p>
            </div>
          </div>
          <p>© 2015-{new Date().getFullYear()}, Skills Fund, LLC</p>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
