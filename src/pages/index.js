import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import { UnmountClosed as Collapse } from 'react-collapse'
import climbers from "../images/climbers.png"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../styles/homepage.css"

const IndexPage = ({ data }) => {
  
  const [showInput, toggleShowInput] = useState(false)
  
  return (
    <Layout>
      <SEO title="Home" />
      <div className="bg-white">
        
        <div id="banner" className="bg-purple-150 flex flex-col lg:flex-row justify-center lg:justify-start items-center lg:pl-32">
            <div className="flex flex-col items-center">
              <button onClick={()=> toggleShowInput(!showInput)} className="hoverButton bg-primary rounded px-4 py-2 text-white w-48 shadow-xl">{showInput ? 'Wait, no I don\'t' : 'I know my school'}</button>
              <Collapse isOpened={showInput}>
                <input className="rounded w-48 my-4 py-2 text-center" type="text" placeholder="Enter your school name" />
              </Collapse>
                {!showInput && <Link to='/bootcamp-selector' className="hoverButton bg-primary mt-4 rounded px-4 py-2 text-white text-center w-48 shadow-xl">I need help deciding</Link>}
            </div>
        </div>

        <div id="homeContent--1" className="px-8 flex flex-col lg:flex-row">
          <div className="pt-12 h-64 lg:w-2/4">
            <h1 className="text-center">How Education Pays Off</h1>
            <p className="text-center">We won’t finance you to attend a crappy program. No tricks, gimmicks or teaser rates here. Just the help you deserve to build the career you want.</p>
            <p className="text-center text-primary font-bold">It’s your future. Expect more from your school and lender.</p>
          </div>
          <div className="lg:w-1/4">

          </div>
          <div className="lg:w-1/4 pt-0">
            <img className="h-64" src={climbers} alt="Sitting and climbing on top of books"/>
          </div>
        </div>

        <div id="homeContent--2" className="px-8 lg:px-32 bg-gray-200 pt-16 pb-12">
          <div className="flex flex-col items-center">
            <p className="text-primary ">WE BELIEVE</p>
            <h2 className="">Education is a life-changing investment.</h2>
            <p>But only if it pays off. We evaluate school quality and partner with ones worth your time and money. And we make schools put real skin in the game in part of your long-term success.</p>
            <p className="text-primary font-bold">After all, the whole point is for you to get a great job.</p>
          </div>
        </div>

        <div id="homeContent--3">
          <div class="yotpo yotpo-reviews-carousel" 
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

      </div> 
    </Layout>
  )
}

export const query = graphql`
  query {
    file(relativePath: { eq: "climbers.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default IndexPage
