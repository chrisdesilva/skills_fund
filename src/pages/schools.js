import React, { useEffect, useState } from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Schools = ({ data }) => {

  const [program, setProgram] = useState(null)

  // get all schools and return an array with each school's information
  const allSchools = data.schools.edges.map(school => {
    return school.node
  })

  return (
    <Layout>
      <SEO title="Schools" />
      <div>
        <select onChange={e => {
          setProgram(e.target.value)
        }}>
          <option value="allSchools">Show All Schools</option>
          <option value="hasDataScience">Data Science</option>
          <option value="hasSoftwareDev">Software Development</option>
          <option value="hasCyberSecurity">Cyber Security</option>
          <option value="hasUxui">UX/UI</option>
        </select>
      </div>
      
      <div className="schoolsList">
      
        {allSchools.map(school => {

          const schoolFilter = programType => {
            return <div key={school.schoolname} className={program === programType ? "schoolsList__school show" : "schoolsList__school"}>
              <h3>{school.schoolname}</h3>
              <Link to={`/schools/${school.slug}`}>  
                <div className="schoolsList__img"><img src={school.schoolLogo.file.url} alt={school.schoolname}/></div>
              </Link>
            </div> 
          }

           switch(program){
             case "allSchools": 
                return schoolFilter("allSchools")
                break;
             case "hasDataScience": 
              if(school.hasDataScience){
                return schoolFilter("hasDataScience")
              }
              break;
            case "hasSoftwareDev":
                if(school.hasSoftwareDev){
                  return schoolFilter("hasSoftwareDev")
              }
              break;
            case "hasUxui":
                if(school.hasUxui){
                  return schoolFilter("hasUxui")
              }
              break;
            case "hasCyberSecurity":
                if(school.hasCyberSecurity){
                  return schoolFilter("hasCyberSecurity")
              }
              break;
            default:
                return schoolFilter("allSchools")
           }
        })}
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
