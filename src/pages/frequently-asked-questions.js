import React, { useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import FAQTemplate from "../components/faqtemplate"
import { Link } from "gatsby"
import { Collapse } from "react-collapse"
import { FaPlusSquare } from "react-icons/fa"

const FAQ = () => {

    const [isApplyOpen, toggleIsApplyOpen] = useState(false)
    const [isRepayOpen, toggleIsRepayOpen] = useState(false)
    const [isAboutOpen, toggleIsAboutOpen] = useState(false)

    return (
        <Layout>
            <SEO title="FAQ" />
            <h1 className="text-center mt-24 mb-12">Frequently Asked Questions</h1>
            <h3 className="text-secondary cursor-pointer flex items-center" onClick={() => toggleIsApplyOpen(!isApplyOpen)}><FaPlusSquare className={isApplyOpen ? "text-base mr-4 plus" : "text-base mr-4"} />Applying for a Loan </h3>
            <Collapse isOpened={isApplyOpen}>
                <FAQTemplate 
                    question="What’s the difference between fixed rates and variable rates?"
                    answer={<><p>Your interest rate is the base cost of borrowing money for the duration of your loan and is a percentage of the principal loan amount. It can be fixed (it will not change) or variable (it could change over time). Variable interest rates can increase or decrease throughout the life of your loan, which may result in your monthly payment changing over time. <strong>All Skills Fund loans are fixed rate</strong> – your rate won’t go up! You can use our loan calculator to preview your rate and payment amounts before you apply.</p></>}
                />
                <FAQTemplate 
                    question="How do I apply for a Skills Fund loan?"
                    answer={<><p>After you've been accepted into a Skills Fund partner school program, you’ll apply for a Skills Fund loan on our specific <Link className="text-secondary" to="/schools">partnership site</Link> for that school. Learn more <Link className="text-secondary" to="/resources/how-to-apply-for-a-loan">about our loan application.</Link></p></>}
                />
                <FAQTemplate 
                    question="I’m attending an online program. Why does my loan application say I’ll be attending a campus location?"
                    answer={<><p>Don’t worry – this means everything is working correctly! The location is a default for our loan application. If you select an online program, our loan application automatically assigns the school’s corporate location as the campus location. Once you finish up the rest of the application, you’ll be all set for your online program.</p></>}
                />
                <FAQTemplate 
                    question="Who can use Skills Fund?"
                    answer={<><p>U.S. citizens and Permanent Residents are eligible to apply for a Skills Fund loan.</p></>}
                />
                <FAQTemplate 
                    question="Will I qualify for a Skills Fund loan?"
                    answer={<><p>You might qualify for a Skills Fund loan if you meet our basic underwriting criteria, including: you are a U.S. citizen or green card holder, you haven’t defaulted on an educational loan, and you have an established credit history with fair credit or better. We also offer cosigner options, and we don’t consider your employment status or current salary in your credit decision. Learn more about our <Link className="text-secondary" to="/resources/will-my-loan-application-be-approved">loan approval criteria.</Link></p></>}
                />
                <FAQTemplate 
                    question="What are your interest rates?"
                    answer={<><p>We work with our partner schools to ensure their students have access to competitive financing. Please see your specific school’s Skills Fund site for further details.</p></>}
                />
                <FAQTemplate 
                    question="What information do I need to provide to Skills Fund?"
                    answer={<><p>During the loan application process, we will ask you for the following information:</p><ul className="list-disc"><li>Full name</li><li>Email address and other contact information</li><li>Social Security Number</li><li>Date of birth</li><li>Loan amount requested</li><li>One personal reference</li><li>Cosigner name and contact information (if applying with a cosigner)</li><li>Citizenship/Permanent Resident (Green Card) status</li><li>Current income (not a factor in credit decision)</li><li>Current employment status(not a factor in credit decision)</li></ul></>}
                />
                <FAQTemplate 
                    question="What is the status of my application?"
                    answer={<><p>After completing your loan application, you will receive a conditional credit decision in your loan application window.</p><p>If you are credit approved, your loan will then be certified by your school. If you are not credit approved, you may be given the opportunity to strengthen your application with a cosigner.</p><p>To find out the specific status of your application, log-in to your <a className="text-secondary" href="https://my.skills.fund">Skills Fund account</a> or contact our Customer Trust team at <a className="text-secondary" href="mailto:CustomerTrust@Skills.Fund">CustomerTrust@Skills.Fund</a>.</p></>}
                />
                <FAQTemplate 
                    question="I need financing for tuition and the cost of living. How do I select the amount for each?"
                    answer={<><p>Within the loan application, you will find two fields for financing: one for tuition and one for cost of living. Within each field, you can enter the precise amount you would like to borrow. Students are required to take at least $2,000 in tuition financing in order to receive any cost of living financing. Cost of living financing is not available for some schools.</p></>}
                />
                <FAQTemplate 
                    question="Can I apply for a loan for the cost of living only?"
                    answer={<><p>No, students must apply for at least $2,000 in tuition financing in order to add cost of living financing. However, at select schools, a student is only eligible to borrow cost of living funds. Please see your specific school's Skills Fund site for further information.</p></>}
                />
                <FAQTemplate 
                    question="Will Skills Fund check my credit?"
                    answer={<><p>Skills Fund conducts a hard credit check only after you submit your application, but we'll tell you your estimated monthly payment before you even submit your application via our Loan Calculator. Once your application is complete, we will check your credit, including your credit score.</p></>}
                />
                <FAQTemplate 
                    question="Do I need a cosigner?"
                    answer={<><p>If you do not meet the loan underwriting criteria, you may be invited to add a cosigner and reapply.</p><p>You can (1) apply individually, and should you not be approved, you may be offered the ability to reapply with a cosigner, or (2) initiate your loan process with a cosigner.</p><p><strong className="text-secondary">Please note:</strong> we recommend you to apply individually to begin, and should you not be credit approved, you may be given the opportunity to amend your application with a cosigner.</p></>}
                />
                <FAQTemplate 
                    question="How and when will I receive my funds?"
                    answer={<><p>We send your funds (tuition + any living expense funds) on the second Wednesday after your program starts. On that day, the tuition portion of your loan is sent directly to your school and any living expense funds are sent directly to you. Please see your specific school's Skills Fund site for further information, as this may vary for your school.</p></>}
                />
                <FAQTemplate 
                    question="Can I get a loan if I have a scholarship?"
                    answer={<><p>Yes, you may apply for financing in parallel to applying for your scholarship. If you are awarded your scholarship prior to the disbursement of your tuition financing to your school, please email <a className="text-secondary" href="mailto:CustomerTrust@Skills.Fund">CustomerTrust@Skills.Fund</a> with the amount of your scholarship, and your loan for tuition will be downward adjusted. Should you receive your scholarship following the second Wednesday after program start, you can apply your funds to your loan balance at any time without pre-payment penalty.</p><p className="mb-0 pb-4"><strong className="text-secondary">Please note:</strong> Should you want to apply for a scholarship, it is recommended to apply for max tuition financing, and once your scholarship is awarded, Skills Fund can downward adjust your requested tuition financing. This will prevent you having to apply for additional funds, should you not be awarded your scholarship, as loans may not be upward adjusted. Simply email <a className="text-secondary" href="mailto:CustomerTrust@Skills.Fund">CustomerTrust@Skills.Fund</a> with your approved scholarship amount.</p></>}
                />
            </Collapse>
            <h3 className="text-secondary cursor-pointer flex items-center" onClick={() => toggleIsRepayOpen(!isRepayOpen)}><FaPlusSquare className={isRepayOpen ? "text-base mr-4 plus" : "text-base mr-4"} />Repaying My Loan </h3>
            <Collapse isOpened={isRepayOpen}>
                <FAQTemplate 
                    question="Can I pay off my loan faster than the initial term?"
                    answer={<><p>Yes, you can pre-pay your loan at any time without penalty.</p></>}
                />
                <FAQTemplate 
                    question="How do I make payments on my Skills Fund loan?"
                    answer={<><p>To set up payments on your Skills Fund loan or to learn more about your payment options, visit <a className="text-secondary" href="https://www.AspireServicingCenter.com">www.AspireServicingCenter.com</a> or call 1-800-243-7552 (Monday-Friday, 8am - 4:30pm Central). You can make payments on your Skills Fund loan using AutoPay, one-time payments, or payment by mail.</p><p>The timing of your payments depends on your loan type.</p><ul className="list-disc"><li>For <span className="text-secondary font-bold">Interest-only Loans</span>, you will make interest-only payments while in program and for two months of grace. You will start making full (interest + principal) payments two months after your program ends.</li><li>For <span className="text-secondary font-bold">Immediate Repayment Loans</span>, you will start making payments roughly one month after your loan is disbursed (which occurs on the second Wednesday after program start.)</li></ul><p>You can find more information about repayment amounts and scheduling on your specific school's partner website.</p><p>For more info, go to: <Link className="text-secondary" to="/resources/how-do-i-pay-back-my-skills-fund-loan">How Do I Pay Back My Skills Fund Loan</Link></p></>}
                />
                <FAQTemplate 
                    question="What happens to my loan if I drop out of my program?"
                    answer={<><p>While it is our hope that every student graduates and finds an awesome job in your chosen field, we understand that other circumstances may intervene.</p><p><strong className="text-secondary">Regarding your tuition:</strong> You are responsible for the full amount you borrow, plus accrued interest and fees. If you are owed a refund by your partner school, the refund transaction will be made to Skills Fund in the amount of the refund due (but in no event greater than what that we paid to the school on your behalf). If there is a balance on your loan after any applied refund, you will be required to immediately start making monthly payments for the balance.</p><p><strong className="text-secondary">Regarding your cost of living:</strong> Because you've received the funds, you're responsible for repaying them to Skills Fund. If there is a balance on your loan after any applied refund, you will be required to immediately start making monthly payments for the balance.</p></>}
                />
                <FAQTemplate 
                    question="How can I cancel my loan?"
                    answer={<><p>Please email <a className="text-secondary" href="mailto:CustomerTrust@Skills.Fund">CustomerTrust@Skills.Fund</a> to request a loan cancellation. If you applied for your loan after X date, log in to your <a className="text-secondary" href="https://my.skills.fund">Skills Fund account</a> to cancel your loan.</p></>}
                />
            </Collapse>
            <h3 className="text-secondary cursor-pointer flex items-center" onClick={() => toggleIsAboutOpen(!isAboutOpen)}><FaPlusSquare className={isAboutOpen ? "text-base mr-4 plus" : "text-base mr-4"} />About Skills Fund </h3>
            <Collapse isOpened={isAboutOpen}>
                <FAQTemplate 
                    question="Who is Skills Fund?"
                    answer={<><p>We are a team of higher ed, consumer protection, and student loan industry leaders, committed to revolutionizing higher education for the benefit of students of all backgrounds and walks of life. Our goal is simple: build the best financing tools for the best outcomes-focused schools and their students.</p><p>In partnership with leading skills training programs, Skills Fund created a financing platform that is both transparent and student-first, to provide all students an experience radically different than traditional student loans. In order for all educational actors to keep an eye to student success, our model uniquely requires skin in the game from the school, lender, and quality assurance entity.</p></>}
                />
                <FAQTemplate 
                    question="Who are Aspire and Launch, how are they related to Skills Fund?"
                    answer={<><p>Aspire and Launch are the loan servicers for Skills Fund loans. This means Aspire or Launch will collect your monthly payments during the repayment phase of your loan. All loans originated before X date will be serviced by Aspire. All loans originated after X date will be serviced by Launch.</p><p className="text-center text-secondary">Need to pay your loan? Have a question about repayment on an existing loan?</p><div className="flex justify-between"><p>If you applied for your loan before X date, visit <a className="text-secondary" href="https://www.aspireservicingcenter.com/">Aspire online</a> or at 1-800-243-7552.</p><p>If you applied for your loan after X date, visit <a className="text-secondary" href="https://prod.launchservicing.com/Borrower/Login.aspx">Launch online</a> or at 877-354-2629.</p></div></>}
                />
                <FAQTemplate 
                    question="How do you pick schools to work with?"
                    answer={<><p>We start by asking schools the right questions about their application process, acceptance rates, curriculum, the qualifications of their staff, and student outcomes.</p><p>Then, together with our strategic financing partner, Goal Solutions, we perform an extensive evaluation to ensure every school we partner with is setting the bar high and paving the way for student success.</p></>}
                />
                <FAQTemplate 
                    question="Have you ever stopped working with a school?"
                    answer={<><p>Yes, several of them. While we’re mindful of the fact that Skills Fund isn't a government regulator or an accreditor, we commit to doing our absolute best to ensure we're only partnering with schools that deliver a tangible Return On Education. (That’s our way of saying you get your money’s worth and can start a better future.)</p><p>Despite our diligent efforts, sometimes we're just not a fit - culturally or operationally. Other times, we have concerns that a school will not be able to deliver on the promises they’ve made to students.</p><p>For this reason, our quality assurance efforts are continuous and never ending. We’re always checking up on our partners. We believe every student deserves their maximum Return On Education, and we're committed to making it happen for students from across the country.</p></>}
                />
                <FAQTemplate 
                    question="I have more questions, who can I ask?"
                    answer={<><p>Our Customer Trust team is here to help. For any additional questions, please complete the <Link className="text-secondary" to="/contact">General Inquiry Form</Link>.</p></>}
                />
            </Collapse>
        </Layout>
    )
}

export default FAQ