import React from 'react'
import { Link } from "gatsby"

const schools = [
    {
        name: "Flatiron"
    }
]

const programs = schools.map(school => school.name) // get list of all program names
const links = schools.map(school => school.link) // get list of all program internal page links

class AutoComplete extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            suggestions: [],
            text: '',
            link: ''
        }
    }

    onTextChanged = e => {
        const value = e.target.value
        let suggestions = [] // set initial suggestions array to empty
            if(value.length > 0) {
                const regex = new RegExp(`${value}`, 'i') // check if characters from input string match any letters of programs
                suggestions = programs.filter(v => regex.test(v)).slice(0, 6) // show first 6 matches
            }
        this.setState({ suggestions, text: value, link: '' })
    }

    suggestionSelected = (value, i) => {
        this.setState({
            text: value, // set input text to value of clicked program
            suggestions: [], // clear suggestions array
            link: links[i] // populate get funded button with link at the position of the clicked program
        })
    }

    renderSuggestions = () => {
        const { suggestions } = this.state
        if(suggestions.length === 0){
            return null
        }
        return (
            <ul>
                {suggestions.map((school, i) => {
                    return <li className="m-0" key={i} onClick={() => {
                        this.suggestionSelected(school, i)
                    }}>{school}</li>
                })}
            </ul>
        )
    }

    render(){
        const { link, text } = this.state
        return (
            <div id="autocomplete">
                <p className="m-0 text-sm">Enter your school name</p>
                <input className="shadow z-50" value={text} onChange={this.onTextChanged} type="text" placeholder="School name"/>
                {this.renderSuggestions()}
                {link && <button className="z-0 show hoverButton bg-primary rounded px-4 py-2 text-white w-40 text-center absolute left-50 -ml-20 mt-10 shadow-xl"><Link to={link}>Get Funded</Link></button>}
            </div>
        )
    }
}

export default AutoComplete