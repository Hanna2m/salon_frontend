import React, { useEffect, useState } from "react";
import "./Modal.css";

const Modal = props => {
    const closeOnEscDown = (e) => {
        if ((e.charCode || e.keyCode) === 27){
            props.onClose()
        }
    }
    useEffect(() => {
        document.body.addEventListener('keydown', closeOnEscDown);
        return function cleanup() {
            document.body.addEventListener('keydown', closeOnEscDown); 
        }
    }, [])

    if(!props.show) {
        return null
    }
    
  return (
    <div className="modal" onClick={props.onClose}> 
        <div className="modal-content" onClick={e => e.stopPropagation()}> 
            <div className="modal-header">
                <h4 className="modal-title">{props.title}</h4>
            </div>
            <div className="modal-body">
                {props.children}
            </div>
            <div className="modal-footer">
                <button className="button" onClick={props.onClose}>Cancel</button>
                <button className="button" onClick={props.onSubmit}>Confirm</button>
            </div>
        </div>
    </div>
  )
}

export default Modal;