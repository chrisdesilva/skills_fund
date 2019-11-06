import React, { useState } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import SchoolSelector from "../components/schoolSelector"

const Schools = ({ data }) => {

  // get all schools and return an array with each school's information
  let allSchools = data.schools.edges.map(school => {
    return school.node
  })

  return (
    <Layout>
      <SEO title="Schools" />
      <div className="schools">
        <SchoolSelector 
          allSchools={allSchools}
          fluid={data.noMatches.childImageSharp.fluid}
        />
      </div>
    </Layout>
  )
}


export default Schools

export const pageQuery = graphql`
{
  schools: allContentfulSchool {
    edges {
      node {
        hasOnline
        hasPartTime
        hasFullTime
        programsOffered
        schoolLogo {
          file {
            url
          }
        }
        schoolname
        slug
        states
      }
    }
  }
  noMatches: file(relativePath: {eq: "climbers.png"}) {
    childImageSharp {
      fluid {
        ...GatsbyImageSharpFluid
      }
    }
  }
}
`;
