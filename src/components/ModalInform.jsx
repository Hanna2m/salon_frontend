import React, { useState, useEffect } from "react";

import "./Modal.css";

const ModalInform = props => {
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
                <h4 className="modal-title">Add new Customer</h4>
            </div>
            <div className="modal-body">
                
            </div>
            <div className="modal-footer">
                <button className="button" onClick={props.onClose}>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default ModalInform;