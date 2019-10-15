import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Schools = ({ data }) => {
  
  return (
    <Layout>
      <SEO title="Schools" />
      {data.schools.edges.map(school => {
        return <Link to={`/schools/${school.node.slug}`}>
          <h3>{school.node.schoolname}</h3>
          <img src={school.node.schoolLogo.file.url} alt={school.node.schoolname}/>
        </Link>
      })}
    </Layout>
  )
}


export default Schools

export const pageQuery = graphql`
{
  schools: allContentfulSchool {
    edges {
      node {
        schoolLogo {
          file {
            url
          }
        }
        schoolname
        slug
      }
    }
  }
}
`;
