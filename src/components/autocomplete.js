import React, { useEffect, useState } from 'react'
import { graphql, Link, useStaticQuery } from "gatsby"

const AutoComplete = props => {

    const data = useStaticQuery(graphql`
        query {
            schools: allContentfulSchool {
                edges {
                    node {
                        schoolname
                        slug
                    }
                }
            }
        }
    `)
    const programs = data.schools.edges.map(school => {
        return {
            name: school.node.schoolname,
            link: school.node.slug
        }
    }) // get list of all program names

    const [suggestions, setSuggestions] = useState([])
    const [text, updateText] = useState('')
    const [link, updateLink] = useState('')
    const [programIndex, setProgramIndex] = useState(null)

    const onTextChanged = e => {
        const value = e.target.value
        let suggestions = [] // set initial suggestions array to empty
            if(value.length > 0) {
                const regex = new RegExp(`${value}`, 'i') // check if characters from input string match any letters of programs
                suggestions = programs.map(program => [program.name, program.link]).filter(v => regex.test(v)).slice(0, 6) // show first 6 matches and populate with school name and slug
            }
        setSuggestions(suggestions)
        updateText(value)
        updateLink('') // clear out link to remove get funded button while user searches through schools
    }

    const suggestionSelected = (value, i) => {
        updateText(value[0]) // value[0] is the school's name
        setSuggestions([])
        updateLink(`/schools/${value[1]}`) // value[1] is the school's slug
    }

    const renderSuggestions = () => {
        if(suggestions.length === 0){
            return null
        }
        return (
            <ul>
                {suggestions.map((school, i) => {
                    return <li key={i} onClick={() => {
                        suggestionSelected(school, i)
                    }}>{school[0]}</li>
                })}
            </ul>
        )
    }

    useEffect(() => {
        // console.log(suggestions)
    }, [link, programIndex])
    
    return (
        <div id="autocomplete">
            <p>Enter your school name</p>
            <input value={text} onChange={onTextChanged} type="text" placeholder="School name"/>
            {renderSuggestions()}
            {link ? <button className="btn"><Link to={link}>Get Funded</Link></button> : null}
        </div>
    )
}

export default AutoComplete