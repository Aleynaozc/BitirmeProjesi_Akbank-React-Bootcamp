import { TextField } from '@mui/material';
import React from 'react'
import { Form, ModalHeader } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../CheckList/CheckList.css'
const CheckListTitle = (props) => {
  const handleClose=()=>{
    props.setOpenCheckListModal(false)

  }
  return (
    <div  >
    <Modal className='cl_title_modal'  show={props.openCheckListModal}onHide={handleClose} size="sm" aria-labelledby="example-modal-sizes-title-sm">
    <ModalHeader closeButton></ModalHeader>
        <Modal.Body >
          <Form>
            <Form.Group >
               <TextField id="filled-basic" label="Check List Title" variant="filled" />
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

export default CheckListTitle