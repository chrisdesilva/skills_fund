import React, { useState } from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Schools = ({ data }) => {

  // get all schools and return an array with each school's information
  let allSchools = data.schools.edges.map(school => {
    return school.node
  })

  const [scheduleSelected, setScheduleSelected] = useState(false)
  const [locationSelected, setLocationSelected] = useState(false)
  const [regionSelected, setRegionSelected] = useState(false)
  const [programSelected, setProgramSelected] = useState(false)

  let [schools, setSchools] = useState(null)
  const [finalList, showFinalList] = useState(false)

  const resetFilters = () => {
    setScheduleSelected(false)
    setLocationSelected(false)
    setRegionSelected(false)
    setProgramSelected(false)
    showFinalList(false)
    setSchools(null)
  }

  const setSchedule = isPartTime => {
    if(isPartTime) {
      schools = allSchools.filter(school => school.hasPartTime)
    } else {
      schools = allSchools
    }
    setSchools(schools)
    setScheduleSelected(true)
  }

  const setOnline = isOnline => {
    if(isOnline) {
      schools = schools.filter(school => school.hasOnline)
      setLocationSelected("online")
      setRegionSelected(true)
    } else {
      setLocationSelected("inPerson")
    }
    setSchools(schools)
  }

  const setRegion = region => {
    schools = schools.filter(school => school.states.includes(region))
    setRegionSelected(true)
    setSchools(schools)

    // switch(region) {
    //   case "west":
    //     schools = schools.filter(school => school.region === "west")
    //     setRegionSelected(true)
    //     setSchools(schools)
    //     break;
    //   case "east":
    //     schools = schools.filter(school => school.region === "east")
    //     setRegionSelected(true)
    //     setSchools(schools)
    //     break;
    //   case "midwest":
    //     schools = schools.filter(school => school.region === "midwest")
    //     setRegionSelected(true)
    //     setSchools(schools)
    //     break;
    //   case "south":
    //     schools = schools.filter(school => school.region === "south")
    //     setRegionSelected(true)
    //     setSchools(schools)
    //     break;
    //   default:
    //     setRegionSelected(true)
    //     break;
    // }
  }

  const setProgram = program => {
    switch(program) {
      case "dataScience":
        schools = schools.filter(school => school.hasDataScience)
        setProgramSelected(true)
        setSchools(schools)
        showFinalList(true)
        break;
      case "softwareDev":
        schools = schools.filter(school => school.hasSoftwareDev)
        setProgramSelected(true)
        setSchools(schools)
        showFinalList(true)
        break;
      case "uxui":
        schools = schools.filter(school => school.hasUxui)
        setProgramSelected(true)
        setSchools(schools)
        showFinalList(true)
        break;
      case "cyberSec":
        schools = schools.filter(school => school.hasCyberSecurity)
        setProgramSelected(true)
        setSchools(schools)
        showFinalList(true)
        break;
      case "licensure":
        schools = schools.filter(school => school.hasLicensureTraining)
        setProgramSelected(true)
        setSchools(schools)
        showFinalList(true)
        break;
      case "professional":
        schools = schools.filter(school => school.hasProfessionalTraining)
        setProgramSelected(true)
        setSchools(schools)
        showFinalList(true)
        break;
      default:
        setProgramSelected(true)
        showFinalList(true)
        break;
    }
  }

  return (
    <Layout>
      <SEO title="Schools" />
      <div className="schools">
        <div className="schoolsFilter">

          {!scheduleSelected ? 
            <>
            <p>First, do you want to attend classes full-time or part-time?</p>
            <button className="btn" onClick={() => setSchedule(false)}>Full-Time</button>
            <button className="btn" onClick={() => setSchedule(true)}>Part-Time</button>
            </> : 
            null
          }

          {scheduleSelected && !locationSelected ? 
            <>
            <p>Cool. Do you want to study in person or online?</p>
            <button className="btn" onClick={() => setOnline(false)}>In-Person</button>
            <button className="btn" onClick={() => setOnline(true)}>Online</button>
            </> : 
            null
          }

          {scheduleSelected && locationSelected === "inPerson" && !regionSelected ? 
            <>
            <label>Which state works best for you?</label>
            <select defaultValue={"default"} onChange={e => setRegion(e.target.value.toLowerCase())}>
              <option value="default" disabled>Select a State</option>
              <option value="AL">Alabama</option>
              <option value="AZ">Arizona</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MO">Missouri</option>
              <option value="NV">Nevada</option>
              <option value="NJ">New Jersey</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="SC">South Carolina</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WI">Wisconsin</option>
            </select>
            </> : 
            null
          }

          {scheduleSelected && locationSelected && regionSelected && !programSelected ? 
            <>
            <p>Last question. Promise. What type of content are you looking to study?</p>
            <button className="btn" onClick={() => setProgram("dataScience")}>Data Science</button>
            <button className="btn" onClick={() => setProgram("softwareDev")}>Software Development</button>
            <button className="btn" onClick={() => setProgram("uxui")}>UX/UI</button>
            <button className="btn" onClick={() => setProgram("cyberSec")}>Cyber Security</button>
            <button className="btn" onClick={() => setProgram("licensure")}>Professional Training</button>
            <button className="btn" onClick={() => setProgram("professional")}>Licensure</button>
            </> : 
            null
          }

          {schools ? <button className="btn startOver" onClick={resetFilters}>Start Over</button> : null}
        </div>
        
        <div className="schoolsList">


        {/* {location === "online" ? 
        <><label>Online? Good move. What type of program are you looking for?</label>
          <select onChange={e => {
            setLocation(e.target.value)}

          }>
            <option value="inPerson">In-Person</option>
            <option value="online">Online</option>
          </select>
        </> 
        : 
        <><label>In-person? Nice. What type of program are you looking for?</label>
          <select onChange={e => {
            setLocation(e.target.value)}

          }>
            <option value="inPerson">In-Person</option>
            <option value="online">Online</option>
          </select>
        </> 
        } */}


        
          {finalList ? schools.map(school => {
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
          ) : 
          null
          }
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
        states
      }
    }
  }
}
`;
