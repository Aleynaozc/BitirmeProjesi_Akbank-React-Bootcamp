import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { faTag } from '@fortawesome/free-solid-svg-icons'
import Form from 'react-bootstrap/Form';
import '../Card.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ModalHeader } from 'react-bootstrap';

const Labels = (props) => {
    const handleClose = () => {
        props.setOpenLabelModal(false)

    }
    const labels = [
        {
            "id": 1,
            "title": "Önemli",
            "color": "red",
            "createdAt": "2022-10-02T17:51:16.000Z",
            "updatedAt": "2022-10-02T17:51:16.000Z"
        },
        {
            "id": 2,
            "title": "Önemsiz",
            "color": "gray",
            "createdAt": "2022-10-02T17:51:16.000Z",
            "updatedAt": "2022-10-02T17:51:16.000Z"
        }
    ]
    return (
        <div  >
            <Modal className='cl_title_modal ' size="sm" show={props.openLabelModal} onHide={handleClose} aria-labelledby="example-modal-sizes-title-sm">
                <ModalHeader closeButton></ModalHeader>
                <Modal.Body >
                    <Form>
                            <div className="todoModal_check_list">
                                    {labels.map((item) =>
                                    (
                                        <div className='todoModal_check_list_checkbox'>
                                            <input
                                                type="checkbox"
                                                defaultChecked=""
                                            /><span className="completed" >{item.title}</span>
                                            <FontAwesomeIcon icon={faTag} />
                                        </div>
                                    )
                                    )}
                              
                        </div>

                    </Form>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

        </div >
    )
}

export default Labels