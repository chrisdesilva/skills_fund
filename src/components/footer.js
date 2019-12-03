import React from 'react'
import { FaTwitter, FaFacebookF } from "react-icons/fa"
import { Link } from "gatsby"


const Footer = () => (
    <footer className="footer">
        <div className="footer__content">
        <div className="footer__links">
            <a href="https://skills.fund/privacy-policy" target="_blank" rel="noreferrer noopener" className="colorLink">Privacy Policy</a>
            <a href="https://skills.fund/terms-of-use" target="_blank" rel="noreferrer noopener" className="colorLink">Terms of Use</a>
            <Link to="/careers" className="colorLink">Careers</Link>
            <Link to="/frequently-asked-questions" className="colorLink">FAQ</Link>
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
)

export default Footer