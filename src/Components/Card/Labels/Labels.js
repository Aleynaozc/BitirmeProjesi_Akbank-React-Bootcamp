import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { faTag } from '@fortawesome/free-solid-svg-icons'
import Form from 'react-bootstrap/Form';
import '../Card.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ModalHeader } from 'react-bootstrap';
import AddTitleBtn from '../../AddTitleBtn/AddTitleBtn';

const Labels = (props) => {
    const handleClose = () => {
        props.setOpenLabelModal(false)

    }
    return (
        <div  >
            <Modal className='cl_title_modal ' size="sm" show={props.openLabelModal} onHide={handleClose} aria-labelledby="example-modal-sizes-title-sm">
                <ModalHeader closeButton></ModalHeader>
                <Modal.Body >
                    <Form>
                        <div className="todoModal_check_list_checkbox">
                            <input
                                type="checkbox"
                                defaultChecked=""
                            />
                            <AddTitleBtn
                                text={"your Label here"}
                                placeholder="Enter Description"
                                buttonText="Save"
                            />
                            <FontAwesomeIcon icon={faTag} />
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