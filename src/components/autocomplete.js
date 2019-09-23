import React from 'react'
import { schools } from "../constants/getFunded"
import { Link } from "gatsby"
import "../styles/autocomplete.css"

const programs = schools.map(school => school.name)
const links = schools.map(school => school.link)

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
        let suggestions = []
            if(value.length > 0) {
                const regex = new RegExp(`${value}`, 'i')
                suggestions = programs.sort().filter(v => regex.test(v))
            }
        this.setState({ suggestions, text: value, link: '' })
    }

    suggestionSelected = (value, i) => {
        this.setState({
            text: value,
            suggestions: [],
            link: links[i]
        })
    }

    renderSuggestions = () => {
        const { suggestions } = this.state
        if(suggestions.length === 0){
            return null
        }
        return (
            <ul className="z-50">
                {suggestions.map((school, i) => {
                    return <li key={i} onClick={() => {
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