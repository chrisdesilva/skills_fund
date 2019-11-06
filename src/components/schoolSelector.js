import React, { useState } from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

const SchoolSelector = props => {

    let [schools, setSchools] = useState(props.allSchools)
    const [optionButtons, showOptionButtons] = useState(true)
    const [isFiltering, setIsFiltering] = useState(false)
    const [scheduleSelected, setScheduleSelected] = useState(false)
    const [locationSelected, setLocationSelected] = useState(false)
    const [regionSelected, setRegionSelected] = useState(false)
    const [programSelected, setProgramSelected] = useState(false)
    const [finalList, showFinalList] = useState(false)
    const [itsAMatch, showItsAMatch] = useState(false)
    
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
          schools = props.allSchools.filter(school => school.hasPartTime)
        } else {
          schools = props.allSchools
        }
        console.log("schedule: ", schools)
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
        console.log("online: ", schools)
        setSchools(schools)
      }
    
      const setRegion = region => {
        schools = schools.filter(school => school.states.includes(region))
        setRegionSelected(true)
        console.log("region: ", schools)
        setSchools(schools)
      }
    
      const setProgram = program => {
        schools = schools.filter(school => school.programsOffered.includes(program))
        setProgramSelected(true)
        console.log("program: ", schools)
        setSchools(schools)
        showFinalList(true)
        showItsAMatch(true)
      }

      const showAllSchools = () => {
        showFinalList(true)
        showOptionButtons(false)
      }

      const startFilter = () => {
        setIsFiltering(true)
        showOptionButtons(false)
        showFinalList(false)
      }

    return (
        <div className="schoolsList">
            <div className="schoolsFilter">

                {isFiltering && !scheduleSelected ? 
                    <div className={!scheduleSelected ? "schoolsFilter__question show" : "schoolsFilter__question"}>
                        <p>First, do you want to attend classes full-time or part-time?</p>
                        <button className="btn" onClick={() => setSchedule(false)}>Full-Time</button>
                        <button className="btn" onClick={() => setSchedule(true)}>Part-Time</button>
                    </div> 
                    : 
                    null
                }

                {scheduleSelected && !locationSelected ? 
                    <div className={scheduleSelected && !locationSelected ? "schoolsFilter__question show" : "schoolsFilter__question"}>
                        <p>Cool. Do you want to study in person or online?</p>
                        <button className="btn" onClick={() => setOnline(false)}>In-Person</button>
                        <button className="btn" onClick={() => setOnline(true)}>Online</button>
                    </div> 
                    : 
                    null
                }

                {scheduleSelected && locationSelected === "inPerson" && !regionSelected ? 
                    <div className={scheduleSelected && locationSelected === "inPerson" && !regionSelected ? "schoolsFilter__question show" : "schoolsFilter__question"}>
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
                    </div> 
                    : 
                    null
                }

                {scheduleSelected && locationSelected && regionSelected && !programSelected ? 
                    <div className={scheduleSelected && locationSelected && regionSelected && !programSelected ? "schoolsFilter__question show" : "schoolsFilter__question"}>
                        <label>Last question. Promise. What type of content are you looking to study?</label>
                        <select defaultValue={"default"} onChange={e => setProgram(e.target.value)}>
                            <option value="default">Select a Program</option>
                            <option value="fullStack">Software Development</option>
                            <option value="webDev">Web Development</option>
                            <option value="mobileDev">Mobile Development</option>
                            <option value="uxui">UX/UI</option>
                            <option value="dataSci">Data Science</option>
                            <option value="dataAnalytics">Data Analytics</option>
                            <option value="cySec">Cyber Security</option>
                            <option value="it">Information Technology</option>
                            <option value="management">Management/Operations</option>
                            <option value="med">Medical Training</option>
                            <option value="dent">Dental Training</option>
                            <option value="cert">Certifications</option>
                        </select>
                    </div> 
                    : 
                    null
                }
            </div>
            {finalList ?
                <>
                {schools.length > 0 && itsAMatch ? <h2 className="show">It's a match!</h2> : null}
                <div className="schoolsList__final">
                    {schools.map(school => {
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
                    {schools.length === 0 ? 
                        <div className="schoolsList__noMatch">
                            <Img fluid={props.fluid} />
                            <p>Dang, looks like we don't have any options.</p>
                            {isFiltering && scheduleSelected ? <button className="btn startOver show" onClick={resetFilters}>Try Again</button> : null}
                        </div>
                        :
                        null 
                    }
                </div> 
                </>
                :
                null
            }
            {!isFiltering && optionButtons ?
                <div className="schoolsList__start">
                    <Img fluid={props.fluid} />
                    <button className="btn" onClick={showAllSchools}>Show All Schools</button>
                    <button className="btn" onClick={startFilter}>I Need Options</button>
                </div>
                :
                null
            }
        </div>
    )
}

export default SchoolSelector