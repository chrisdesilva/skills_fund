import React, { useEffect, useState } from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Schools = ({ data }) => {

  const [program, setProgram] = useState(null)
  const [location, setLocation] = useState(null)

  // get all schools and return an array with each school's information
  const allSchools = data.schools.edges.map(school => {
    return school.node
  })

  return (
    <Layout>
      <SEO title="Schools" />
      <div className="schools">
        <div className="schoolsFilter">
        <label>Filter by Program</label>
          <select onChange={e => {
            setProgram(e.target.value)
            setLocation(null)
          }}>
            <option value="allSchools">Show All Schools</option>
            <option value="hasDataScience">Data Science</option>
            <option value="hasSoftwareDev">Software Development</option>
            <option value="hasCyberSecurity">Cyber Security</option>
            <option value="hasUxui">UX/UI</option>
          </select>
        <label>Filter by Location</label>
          <select onChange={e => {
            setLocation(e.target.value)
            setProgram(null)
          }}>
            <option value="allSchools">Show All Schools</option>
            <option value="west">West</option>
            <option value="midwest">Midwest</option>
            <option value="south">South</option>
            <option value="east">East</option>
          </select>
        </div>
        
        <div className="schoolsList">
        
          {allSchools.map(school => {

            const programFilter = programType => {
              return <div key={school.schoolname} className={program === programType ? "schoolsList__school show" : "schoolsList__school"}>
                <h3>{school.schoolname}</h3>
                <Link to={`/schools/${school.slug}`}>  
                  <div className="schoolsList__img"><img src={school.schoolLogo.file.url} alt={school.schoolname}/></div>
                </Link>
                <Link className="schoolsList__link" to={`/schools/${school.slug}`}>  
                  Get Funded
                </Link>
              </div> 
            }

            switch(program){
              case "allSchools": 
                  return programFilter("allSchools")
                  break;
              case "hasDataScience": 
                if(school.hasDataScience){
                  return programFilter("hasDataScience")
                }
                break;
              case "hasSoftwareDev":
                  if(school.hasSoftwareDev){
                    return programFilter("hasSoftwareDev")
                }
                break;
              case "hasUxui":
                  if(school.hasUxui){
                    return programFilter("hasUxui")
                }
                break;
              case "hasCyberSecurity":
                  if(school.hasCyberSecurity){
                    return programFilter("hasCyberSecurity")
                }
                break;
            }

            const regionFilter = region => {
              return <div key={school.schoolname} className={location === region ? "schoolsList__school show" : "schoolsList__school"}>
                <h3>{school.schoolname}</h3>
                <Link to={`/schools/${school.slug}`}>  
                  <div className="schoolsList__img"><img src={school.schoolLogo.file.url} alt={school.schoolname}/></div>
                </Link>
                <Link className="schoolsList__link" to={`/schools/${school.slug}`}>  
                  Get Funded
                </Link>
              </div> 
            }

            switch(location){
              case "allSchools": 
                  return regionFilter("allSchools")
                  break;
              case "west": 
                if(school.region === "west"){
                  return regionFilter("west")
                }
                break;
              case "east": 
                if(school.region === "east"){
                  return regionFilter("east")
                }
                break;
              case "south": 
                if(school.region === "south"){
                  return regionFilter("south")
                }
                break;
              case "midwest": 
                if(school.region === "midwest"){
                  return regionFilter("midwest")
                }
                break;
              default:
                return regionFilter("allSchools")
                break;
            }



          })}
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
