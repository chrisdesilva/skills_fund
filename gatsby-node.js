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
            childrenContentfulSchoolProgramLoanInfoJsonNode {
              url
              name
              locations
              loanInfo {
                loanTerm36
                loanTerm60
                maxLoanAmt
              }
              metros {
                location
                loanInfo {
                  loanTerm36
                  loanTerm60
                  maxLoanAmt
                }
              }
            }
            defaultLoanAmount
            disabledLoanAppFormId
            faq {
              APR36
              APR60
              IOPayment36
              IOPayment60
              costOfLiving
              costOfLivingPrograms
              immediateRepayment
              interestOnly
              interestRate36
              interestRate60
              loanRange {
                col
                colAmount
                maxAmount
                programName
              }
              multCostOfLivingPrograms
              multiPrograms
              multipleLoanLengths
              multipleLoanTypes
              onlinePrograms
              origFee
              schoolHQState
            }
            headline
            hubspotFormId
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
            interestRates {
              ir36
              ir60
            }
            leadContent {
              header
              paragraph
            }
            multiLoanLengths
            multiLoanTypes
            netlifyFormName
            placeholderAmount
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