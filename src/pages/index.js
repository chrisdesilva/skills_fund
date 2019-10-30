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

  return (
    <Layout>
      <SEO title="Home" />
      <div className="bg-white">
        
        <div id="banner" className={showInput ? "back-purple flex flex-col pt-8 px-4" : "flex flex-col pt-8 px-4"}>
              <h1 className="text-center mb-0 pb-4 mt-16">How Education Pays Off</h1>
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
