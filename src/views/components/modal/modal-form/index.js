import { Fragment, useState } from "react"
import { Modal, ModalHeader, ModalBody } from "reactstrap"

const ModalForm = (props) => {
  const { openModal, setOpenModal, title, className } = props

  return (
    <>
      <div style={{width: "300px"}}>
        <Modal isOpen={openModal} className='modal-dialog-centered' backdrop='static' size="lg" style={{maxWidth: '700px', width: '100%'}}>
          {title && <ModalHeader >{title}</ModalHeader>}
          <ModalBody className={className}>
            {props.children}
          </ModalBody>
        </Modal>
      </div>
    </>
  )
}

export default ModalForm