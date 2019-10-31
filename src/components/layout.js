import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"
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
      <div className="main">
        <main>{children}</main>
        <footer className="footer">
          <div className="footer__content">
            <div className="footer__links">
              <a href="https://skills.fund/privacy-policy" target="_blank" rel="noreferrer noopener" className="colorLink">Privacy Policy</a>
              <a href="https://skills.fund/terms-of-use" target="_blank" rel="noreferrer noopener" className="colorLink">Terms of Use</a>
              <Link to="/careers" className="colorLink">Careers</Link>
              <Link to="/faq" className="colorLink">FAQ</Link>
            </div>
            <div className="footer__social">
              <a href="https://twitter.com/skills_fund" target="_blank" rel="noreferrer noopener" className="colorLink"><FaTwitter/></a>
              <a href="https://www.facebook.com/SkillsFundEd/" target="_blank" rel="noreferrer noopener" className="colorLink"><FaFacebookF /></a>
            </div>
            <div className="footer__email">
              <p>Customer Service:</p>
              <a href="mailto:customertrust@skills.fund" className="colorLink">CustomerTrust@skills.fund</a>
            </div>
          </div>
          <p className="footer__copyright">© 2015-{new Date().getFullYear()}, Skills Fund, LLC</p>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
