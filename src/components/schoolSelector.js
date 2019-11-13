import React, { useState } from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { FaArrowLeft } from 'react-icons/fa'

const SchoolSelector = props => {

    let [schools, setSchools] = useState(props.allSchools) // holds current set of schools, updates with filter
    const [prevSchools, setPrevSchools] = useState(null) // holds previous step's list of filtered schools in case user goes back a step
    const [optionButtons, showOptionButtons] = useState(true)
    const [isFiltering, setIsFiltering] = useState(false)
    const [scheduleSelected, setScheduleSelected] = useState(false)
    const [locationSelected, setLocationSelected] = useState({online: false, inPerson: false})
    const [stateSelected, setStateSelected] = useState(false)
    const [programSelected, setProgramSelected] = useState(false)
    const [finalList, showFinalList] = useState(false)
    const [itsAMatch, showItsAMatch] = useState(false)
    
    const resetFilters = () => {
        showOptionButtons(true)
        setScheduleSelected(false)
        setLocationSelected(false)
        setStateSelected(false)
        setProgramSelected(false)
        showFinalList(false)
        setSchools(props.allSchools)
      }
    
      const setSchedule = isPartTime => {
        setPrevSchools(schools)
        if(isPartTime) {
          schools = props.allSchools.filter(school => school.hasPartTime)
        } else {
          schools = props.allSchools
        }
        setSchools(schools)
        setIsFiltering(false)
        setScheduleSelected(true)
      }
    
      const setOnline = isOnline => {
        setPrevSchools(schools)
        if(isOnline) {
          schools = schools.filter(school => school.hasOnline)
          setLocationSelected({online: true, inPerson: false})
          setStateSelected(true)
        } else {
          setLocationSelected({online: false, inPerson: true})
        }
        setScheduleSelected(false)
        setSchools(schools)
      }
    
      const setRegion = region => {
        setPrevSchools(schools)
        schools = schools.filter(school => school.states.includes(region))
        setStateSelected(true)
        setSchools(schools)
      }
    
      const setProgram = program => {
        setPrevSchools(schools)
        schools = schools.filter(school => school.programsOffered.includes(program))
        setProgramSelected(true)
        setStateSelected(false)
        setLocationSelected(false)
        setSchools(schools)
        showFinalList(true)
        showItsAMatch(true)
      }

      const showAllSchools = () => {
        showFinalList(true)
        showOptionButtons(false)
        showItsAMatch(false)
      }

      const startFilter = () => {
        setIsFiltering(true)
        showOptionButtons(false)
        showFinalList(false)
      }

    return (
        <div className="schoolsList">
            <div className="schoolsFilter">

                {isFiltering ? 
                    <div className={isFiltering ? "schoolsFilter__question  show" : "schoolsFilter__question"}>
                        <span className="schoolsList__questionImg"><Img fluid={props.fullOrPart} /></span>
                        <p>First, do you want to attend classes full-time or part-time?</p>
                        <button className="btn" onClick={() => setSchedule(false)}>Full-Time</button>
                        <button className="btn" onClick={() => setSchedule(true)}>Part-Time</button>
                        <p onClick={() => {
                            setIsFiltering(false)
                            showOptionButtons(true)
                        }} className="schoolsList__back"><FaArrowLeft /><span>Back</span></p>
                    </div> 
                    : 
                    null
                }

                {scheduleSelected ? 
                    <div className={scheduleSelected ? "schoolsFilter__question  show" : "schoolsFilter__question"}>
                        <span className="schoolsList__questionImg"><Img fluid={props.inPersonOnline} /></span>
                        <p>Cool. Do you want to study in person or online?</p>
                        <button className="btn" onClick={() => setOnline(false)}>In-Person</button>
                        <button className="btn" onClick={() => setOnline(true)}>Online</button>
                        <p onClick={() => {
                            setIsFiltering(true)
                            setScheduleSelected(false)
                            setSchools(props.allSchools)
                        }} className="schoolsList__back"><FaArrowLeft /><span>Back</span></p>
                    </div> 
                    : 
                    null
                }

                {locationSelected.inPerson && !stateSelected ? 
                    <div className={locationSelected === "inPerson" ? "schoolsFilter__question  show" : "schoolsFilter__question"}>
                        <span className="schoolsList__questionImg"><Img fluid={props.location} /></span>
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
                        <p onClick={() => {
                            setScheduleSelected(true)
                            setLocationSelected(false)
                            setSchools(prevSchools)
                        }} className="schoolsList__back"><FaArrowLeft /><span>Back</span></p>
                    </div> 
                    : 
                    null
                }

                {stateSelected ? 
                    <div className={stateSelected ? "schoolsFilter__question show" : "schoolsFilter__question"}>
                        <span className="schoolsList__questionImg"><Img fluid={props.program} /></span>
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
                        <p onClick={() => {
                            if(locationSelected.inPerson) {
                                setStateSelected(false)
                                setSchools(prevSchools)
                            } else {
                                setPrevSchools(schools)
                                setStateSelected(false)
                                setScheduleSelected(true)
                            }
                        }} className="schoolsList__back"><FaArrowLeft /><span>Back</span></p>
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
                </div>
                {schools.length > 0 ? <button className="btn startOver show" onClick={resetFilters}>Start Over</button> : null} 
                </>
                :
                null
            }
            {schools.length === 0 && finalList ? 
                <div className="schoolsList__noMatch">
                    <span className="schoolsList__questionImg"><Img fluid={props.noMatches} /></span>
                    <p>Looks like we don't have a program that fits just yet. Try again or check out our whole list of partner programs.</p>
                        <>
                            <button className="btn startOver show" onClick={resetFilters}>Try Again</button> 
                            <button className="btn" onClick={()=> {
                                resetFilters()
                                setIsFiltering(false)
                                showItsAMatch(false)
                                showOptionButtons(false)
                                showFinalList(true)
                            }}>Show All Schools</button>
                        </>
                </div>
                :
                null 
            }
            {!isFiltering && optionButtons ?
                <div className="schoolsList__start show">
                    <span className="schoolsList__questionImg"><Img fluid={props.climbers} /></span>
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