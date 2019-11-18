import React from 'react'
import { FaTimes } from 'react-icons/fa'

const Modal = props => {

    return (
        <div className={props.modal ? "modal show" : "modal hide"}>
            <div className="modal__content">
                <span className="modal__close" onClick={props.toggleModal}><FaTimes /></span>
                <h2>Income Share Agreement assumes the following:</h2>
                <ul>
                    <li>annual salary of $60,000 yielding monthly gross income of $5,000</li>
                    <li>income share percentage set at 15% of monthly gross income</li>
                    <li>making monthly payments for the duration of your loan term</li>
                </ul>
            </div>
        </div>
    )
}

export default Modal