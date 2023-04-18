import React from 'react'
import  ReactDOM  from 'react-dom'
import Backdrop from './Backdrop';
import ModalOverlay from './ModalOverlay';



const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <>  
        {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
        
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </>
  )
}

export default Modal