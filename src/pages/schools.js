import React from "react"
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
          climbers={data.climbers.childImageSharp.fluid}
          noMatches={data.noMatches.childImageSharp.fluid}
          fullOrPart={data.fullOrPart.childImageSharp.fluid}
          location={data.location.childImageSharp.fluid}
          program={data.program.childImageSharp.fluid}
          inPersonOnline={data.inPersonOnline.childImageSharp.fluid}
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
  climbers: file(relativePath: {eq: "Climbers_Color.png"}) {
    childImageSharp {
      fluid {
        ...GatsbyImageSharpFluid
      }
    }
  }
  noMatches: file(relativePath: {eq: "balancing.png"}) {
    childImageSharp {
      fluid {
        ...GatsbyImageSharpFluid
      }
    }
  }
  fullOrPart: file(relativePath: {eq: "student_at_desk.png"}) {
    childImageSharp {
      fluid {
        ...GatsbyImageSharpFluid
      }
    }
  }
  location: file(relativePath: {eq: "america_purple.png"}) {
    childImageSharp {
      fluid {
        ...GatsbyImageSharpFluid
      }
    }
  }
  program: file(relativePath: {eq: "cert_color.png"}) {
    childImageSharp {
      fluid {
        ...GatsbyImageSharpFluid
      }
    }
  }
  inPersonOnline: file(relativePath: {eq: "class_color.png"}) {
    childImageSharp {
      fluid {
        ...GatsbyImageSharpFluid
      }
    }
  }
}
`;
