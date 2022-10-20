import React, { useState } from 'react'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import '../Labels/Label.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form, ModalHeader } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';


const Labels = (props) => {

  

    // return (
    //     <Modal className='label_modal' onHide={handleClose} size="sm" aria-labelledby="example-modal-sizes-title-sm">
    //         <ModalHeader closeButton></ModalHeader>
    //         <Modal.Body >
    //             <Form>
    //                 <Form.Group >
    //                     {/* {props.labelData.map((i) =>
    //                         <div className='label_body'>
    //                             <div className='labels_item'>
    //                                 <input type="checkbox" />
    //                                 <p>{i.title} </p>
    //                             </div>
    //                         </div>
    //                     )
    //                     } */}
    //                 </Form.Group>
    //             </Form>
    //         </Modal.Body>
    //         <Modal.Footer>
    //             <Button className='label_btn' onClick={handleClose}>
    //                 Save
    //             </Button>
    //         </Modal.Footer>
    //     </Modal>

    // )
}

export default Labels