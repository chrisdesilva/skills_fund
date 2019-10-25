import React from 'react'
import { FaTimes } from 'react-icons/fa'

const Modal = props => {

    return (
        <div className={props.modal ? "modal show" : "modal hide"}>
            <div className="modal__content">
                <span className="modal__close" onClick={props.toggleModal}><FaTimes /></span>
                <h2>Loan calculations based on...</h2>
                <ul>
                    <li>fixed interest rates</li>
                    <li>monthly interest payments made while in program</li>
                    <li>a 2 month grace period after program completion</li>
                    <li>making monthly payments for the duration of your loan term</li>
                </ul>
            </div>
        </div>
    )
}

export default Modal