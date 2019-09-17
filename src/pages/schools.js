import React, { useState } from "react"
import { Link } from "gatsby"
import { FaGlobe, FaSchool, FaWifi } from "react-icons/fa"
import { UnmountClosed as Collapse } from "react-collapse"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { schools } from "../constants/getFunded"


const Schools = props => {

    const [ allSchools, showAllSchools ] = useState(false)
    const [ onlineSchools, showOnlineSchools ] = useState(false)
    const [ inPersonSchools, showInPersonSchools ] = useState(false)

    const displayAllPrograms = () => {
        showAllSchools(true)
        showOnlineSchools(false)
        showInPersonSchools(false)
    }

    const displayOnlinePrograms = () => {
        showAllSchools(false)
        showOnlineSchools(true)
        showInPersonSchools(false)
    }

    const displayInPersonPrograms = () => {
        showAllSchools(false)
        showOnlineSchools(false)
        showInPersonSchools(true)
        schools.forEach(school => console.log(school.name))
    }
  
  return (
    <Layout>
      <SEO title="Schools" />
      <div className="bg-white">

        <div id="" className="px-8 flex flex-col items-center py-16 bg-purple-150">
            <h1>Schools Worth Your Time & Money</h1>
            <p>With questions of quality and outcomes out of the way, find the right program to place you on a path to long-term success.</p>
        </div>

        <div id="" className="px-8 bg-white flex flex-col items-center py-8">
            <h2>Select Your Skills Training</h2>
            <p>Browse schools by program type or location. Once you've found the right school for you, click on "Get Funded" to see your transparent loan terms and use the Loan Calculator.</p>
            <div className="w-full flex flex-col lg:flex-row items-center justify-around mt-5">
                <p className="cursor-pointer flex items-center colorLink" 
                    onClick={displayOnlinePrograms}>
                    <FaWifi className="mr-2" /> 
                    Show Online Programs
                </p>
                <p className="cursor-pointer flex items-center colorLink" 
                    onClick={displayInPersonPrograms}>
                    <FaSchool className="mr-2" /> 
                    Show In-Person Programs
                </p>
                <p className="cursor-pointer flex items-center colorLink" 
                    onClick={displayAllPrograms}>
                    <FaGlobe className="mr-2" />
                    Show All Programs
                </p>
            </div>
        </div>
        
        {/* *** ALL SCHOOLS FILTER *** */}
        <Collapse isOpened={allSchools} springConfig={{stiffness: 200, damping: 50}}>
            <div className="px-8 flex flex-col lg:flex-row justify-center">
                {schools.map(program => {
                    return <div className="flex flex-col items-center h-64 w-full lg:w-1/5">
                        <img src={program.logo} alt={program.name}/>
                        <p className="m-0">{program.name}</p>
                        <Link to={program.link} className="cursor-pointer text-primary">Get Funded</Link>
                    </div>
                })}
            </div>
        </Collapse>

        {/* *** ONLINE ONLY FILTER *** */}
        <Collapse isOpened={onlineSchools} springConfig={{stiffness: 200, damping: 50}}>
            <div className="px-8 flex flex-col lg:flex-row justify-center">
                {schools.map(program => {
                    if(program.hasOnline) {
                        return <div className="flex flex-col items-center h-64 w-full lg:w-1/5">
                        <img src={program.logo} alt={program.name}/>
                        <p className="m-0">{program.name}</p>
                        <Link to={program.link} className="cursor-pointer text-primary">Get Funded</Link>
                    </div>
                    }
                })}
            </div>
        </Collapse>

        {/* *** IN-PERSON ONLY FILTER *** */}
        <Collapse isOpened={inPersonSchools} springConfig={{stiffness: 200, damping: 50}}>
            <div className="px-8 flex flex-col lg:flex-row justify-center">
                {schools.map(program => {
                    if(program.hasInPerson) {
                        return <div className="flex flex-col items-center h-64 w-full lg:w-1/5">
                        <img src={program.logo} alt={program.name}/>
                        <p className="m-0">{program.name}</p>
                        <Link to={program.link} className="cursor-pointer text-primary">Get Funded</Link>
                    </div>
                    }
                })}
            </div>
        </Collapse>


      </div> 
    </Layout>
  )
}


export default Schools
