import React from 'react'
import { Form, ModalHeader } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../Date/Date.css"
const Date = (props) => {
    const handleClose=()=>{
        props.setOpenCalendarModal(false)
    
      }
  return (
    <div>
         <Modal className='cl_title_modal'  show={props.openCalendarModal} onHide={handleClose} size="sm" aria-labelledby="example-modal-sizes-title-sm">
    <ModalHeader closeButton></ModalHeader>
        <Modal.Body >
          <Form>
            <Form.Group >
            <input type="date" defaultValue={props.date}/>
            </Form.Group>
           
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
      
       
    </div>
  )
}

export default Date