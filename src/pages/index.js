import React, { useState } from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import bike from "../images/bike.png"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../styles/main.scss"
import AutoComplete from "../components/autocomplete"

const IndexPage = () => {
  
  const [showInput, toggleShowInput] = useState(false)
  const [inputValue, setInputValue] = useState(false)

  const data = useStaticQuery(graphql`
  query {
    schools: allContentfulSchoolProgramLoanInfoJsonNode {
      nodes {
        url
        loanTerm36
        loanTerm60
      }
    }
  }
`)



  return (
    <Layout>
      <SEO title="Home" />
      <div className="bg-white">
        
        <div id="banner" className={showInput ? "back-purple flex flex-col pt-8 px-4" : "flex flex-col pt-8 px-4"}>
              <h1 className="text-center mb-0 pb-4 mt-16">How Education Pays Off at {data.schools.nodes[0].url}</h1>
              <p className="text-center mb-0 pb-4">We won’t finance you to attend a crappy program. No tricks, gimmicks or teaser rates here. Just the help you deserve to build the career you want.</p>
              <p className="text-center text-primary font-bold mb-0 pb-4">It’s your future. Expect more from your school and lender.</p>
          <div className="relative">
            {!showInput &&
              <div className={!showInput ? "absolute show left-50 -ml-24 lg:-ml-48 pt-4" : "absolute"}>
                <button onClick={()=> toggleShowInput(true)} className="hoverButton bg-primary rounded px-4 py-2 mx-1 text-white w-48 text-center shadow-xl mb-1 lg:mb-0">I know my school</button>
                <button className="hoverButton bg-primary rounded px-4 py-2 mx-1 text-white w-48 text-center shadow-xl"><Link to='/bootcamp-selector'>I need help deciding</Link></button>
              </div>
            }
            {showInput &&
              <div className={showInput ? "absolute show left-50 -ml-32" : "absolute"}>
                <AutoComplete 
                  toggleInput={()=> toggleShowInput(false)}
                />
              </div>
            }
          </div>
        </div>

        <div id="homeContent--1" className="px-8 lg:px-32 bg-gray-100 py-12 lg:py-32">
          <div className="flex flex-col items-center">
            <p className="text-primary text-xl">WE BELIEVE</p>
            <h2 className="">Education is a life-changing investment.</h2>
            <p className="text-lg">But only if it pays off. We evaluate school quality and partner with ones worth your time and money. And we make schools put real skin in the game in part of your long-term success.</p>
            <p className="text-primary font-bold">After all, the whole point is for you to get a great job.</p>
          </div>
        </div>

        <div id="homeContent--3" className="px-8 py-16 flex flex-col lg:flex-row items-center">
          <div className="lg:w-2/4 justify-center flex flex-col items-center">
            <p className="text-center text-xl">We make it easy to choose the right program for your goals. Browse our verified partners by location or career path.</p>
            <p className="text-center text-primary font-bold text-lg">Find a school worthy of your future.</p>
            <Link to='/schools' className="hoverButton bg-primary mt-4 rounded px-4 py-2 text-white text-center w-48 shadow-xl">Select Your School</Link>
          </div>
          <div className="lg:w-1/4">

          </div>
          <div className="lg:w-1/4 pt-0 order-first lg:order-last">
            <img className="h-64" src={bike} alt="Riding a bike in the city"/>
          </div>
        </div>

          <div className="yotpo yotpo-reviews-carousel bg-gray-100 pb-8 m-0" 
            data-background-color="transparent" 
            data-mode="top_rated" 
            data-type="site" 
            data-count="9" 
            data-show-bottomline="1" 
            data-autoplay-enabled="1" 
            data-autoplay-speed="3000" 
            data-show-navigation="1">&nbsp;
          </div>


      </div> 
    </Layout>
  )
}


export default IndexPage
