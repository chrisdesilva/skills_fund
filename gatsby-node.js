const path = require(`path`);
const slash = require(`slash`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  // we use the provided allContentfulBlogPost query to fetch the data from Contentful
  return graphql(
    `
    {
      allContentfulSchool {
        edges {
          node {
            applicationsLive
            aprRange36
            aprRange60
            costOfLiving
            defaultLoanAmount
            disabledLoanAppFormId
            hasImmediateRepayment
            hasInterestOnly
            hubspotFormId
            immediateRepayment {
              APR36
              APR60
              FullMonthlyPayment36
              FullMonthlyPayment60
              IOPayment36
              IOPayment60
              LoanExampleAmt
              LoanExampleAmtPlusOFee
              LoanExampleOFeeAmt
              financeCharge36
              financeCharge60
              programName
            }
            interestOnly {
              APR36
              APR60
              FullMonthlyPayment36
              FullMonthlyPayment60
              IOPayment36
              IOPayment60
              LoanExampleAmt
              LoanExampleAmtPlusOFee
              LoanExampleOFeeAmt
              financeCharge36
              financeCharge60
              programLength
              programName
            }
            interestRate36
            interestRate60
            loanRange {
              loanRange
            }
            loanUrLs {
              name
              segment
            }
            multiLoanLengths
            multiLoanTypes
            multiPrograms
            nextCohortStartDate
            origFee
            paymentTable {
              data {
                col
                max
                program
                tuition
              }
              headers
              show
            }
            placeholderAmount
            programLoanInfo {
              name
              hasIO
              hasIR
              multiMetros
              loanType
              metros {
                location
                maxLoanAmt
              }
              loanInfo {
                loanTerm36
                loanTerm60
                maxLoanAmt
              }
            }
            programMaxText {
              programMaxText
            }
            schoolLogo {
              file {
                url
              }
            }
            schoolname
            schoolurl
            selectAProgram
            slug
          }
        }
      }
    }
    
    `
  ).then(result => {
      if (result.errors) {
        console.log("Error retrieving contentful data", result.errors);
      }
      // Resolve the paths to our template
      const partnerPageTemplate = path.resolve("./src/templates/partner-page.js");
      // Then for each result we create a page.
      result.data.allContentfulSchool.edges.forEach(edge => {
        createPage({
          path: `/schools/${edge.node.slug}/`,
          component: slash(partnerPageTemplate),
          context: {
	        slug: edge.node.slug
          }
        });
      });
    })
    .catch(error => {
      console.log("Error retrieving contentful data", error);
    });
};