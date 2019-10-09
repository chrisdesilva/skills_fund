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