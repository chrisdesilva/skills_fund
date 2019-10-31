import React, { useState } from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../styles/main.scss"
import AutoComplete from "../components/autocomplete"

const IndexPage = () => {
  
  const [showInput, toggleShowInput] = useState(false)
  const data = useStaticQuery(graphql`
    query {
      climbers: file(relativePath: {eq: "climbers.png"}){
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Home" />
      <div>
        
        <div className="banner">
          <div className="banner__content">
            <div className="banner__img">
              <Img fluid={data.climbers.childImageSharp.fluid} />
            </div>
            <div className="banner__text">
              <h1>Higher Ed Financing Made Simple</h1>
              <p>It’s your future. Expect more from your school and lender.</p>
              <div className="banner__buttons">
                {!showInput &&
                  <div className="banner__autocomplete">
                    <button className="btn" onClick={()=> toggleShowInput(true)} >I know my school</button>
                    <button className="btn" ><Link to='/schools'>View All Schools</Link></button>
                  </div>
                }
                {showInput &&
                  <div className="banner__autocomplete">
                    <AutoComplete 
                      toggleInput={()=> toggleShowInput(false)}
                    />
                  </div>
                }
              </div>
            </div>
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
