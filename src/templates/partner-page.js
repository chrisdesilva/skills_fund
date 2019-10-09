import React from 'react'
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"


const PartnerPage = ({ data }) => {

    return (
        <Layout>
        <SEO title={`Partner page for Skills Fund and ${data.school.schoolname}`} />
            <h1 style={{color: 'black'}}>{data.school.schoolname}</h1>
            <h2>{data.school.schoolurl}</h2>
            <h3>{data.school.slug}</h3>
            <h4>Hello</h4>
        </Layout>
    )
}

export default PartnerPage;

export const pageQuery = graphql`
  query($slug: String!) {
    school: contentfulSchool(slug: {eq: $slug}) {
      schoolname
      schoolurl
      slug
    }
  }
`;