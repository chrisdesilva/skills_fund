import React, { useState } from "react"
import { Collapse } from "react-collapse"
import { FaCaretDown } from "react-icons/fa"

const FAQTemplate = props => {

    const [isOpen, toggleIsOpen] = useState(false)

    return (
        <div className="px-4">
            <h2 className={isOpen ? "cursor-pointer text-base font-bold flex items-center" : "cursor-pointer text-base flex items-center"} onClick={() => toggleIsOpen(!isOpen)}>{props.question}<FaCaretDown className={isOpen ? "text-base mr-4 flip faq self-end" : "text-base mr-4 faq self-end"} /></h2>
            <Collapse isOpened={isOpen}>
                <p className="mb-0 pb-4">{props.answer}</p>
            </Collapse>
        </div>
    )
}

export default FAQTemplate