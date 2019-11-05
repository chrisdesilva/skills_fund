import React, { useEffect, useState } from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Schools = ({ data }) => {

  const [program, setProgram] = useState(null)
  const [location, setLocation] = useState(null)
  const [filter, setFilter] = useState("program")

  // get all schools and return an array with each school's information
  const allSchools = data.schools.edges.map(school => {
    return school.node
  })

  return (
    <Layout>
      <SEO title="Schools" />
      <div className="schools">
        <div className="schoolsFilter">

        <label>Filter by...</label>
          <select onChange={e => setFilter(e.target.value)}>
            <option value="program">Program Type</option>
            <option value="region">Region</option>
            <option value="time">Time Commitment</option>
          </select>

        </div>
        
        <div className="schoolsList">
        
          {allSchools.map(school => {
              return <div key={school.schoolname} className="schoolsList__school show">
                <h3>{school.schoolname}</h3>
                <Link to={`/schools/${school.slug}`}>  
                  <div className="schoolsList__img"><img src={school.schoolLogo.file.url} alt={school.schoolname}/></div>
                </Link>
                <Link className="schoolsList__link" to={`/schools/${school.slug}`}>  
                  Get Funded
                </Link>
              </div> 
            }
          )}
        </div>
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
        hasUxui
        hasOnline
        hasPartTime
        hasFullTime
        hasDataScience
        hasSoftwareDev
        hasCyberSecurity
        hasLicensureTraining
        hasProfessionalTraining
        schoolLogo {
          file {
            url
          }
        }
        schoolname
        slug
        region
      }
    }
  }
}
`;
