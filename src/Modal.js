import React, { useEffect } from 'react'

const Modal = ({ modalContent, closeModal }) => {

    useEffect(() => {
        setTimeout(() => {
            closeModal()
        }, 3000)
    })

  return <span className='modal'>{modalContent}</span>
}

export default Modal