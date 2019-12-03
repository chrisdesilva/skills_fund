import React, { useState } from "react"
import { Collapse } from "react-collapse"

const FAQTemplate = props => {

    const [isOpen, toggleIsOpen] = useState(false)

    return (
        <div className="px-4">
            <h2 className={isOpen ? "cursor-pointer text-base font-bold" : "cursor-pointer text-base"} onClick={() => toggleIsOpen(!isOpen)}>Q: {props.question}</h2>
            <Collapse isOpened={isOpen}>
                <p className="mb-0 pb-4">{props.answer}</p>
            </Collapse>
        </div>
    )
}

export default FAQTemplate