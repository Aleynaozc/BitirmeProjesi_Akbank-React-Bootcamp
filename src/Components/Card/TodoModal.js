import { faCalendar, faEllipsis, faTag, faTrash, faUser } from '@fortawesome/free-solid-svg-icons'
import { faMessage, faSquareCheck } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import '../Card/Card.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import CheckListTitle from './CheckList/CheckListTitle'
import CheckList from './CheckList/CheckList'
import Labels from './Labels/Labels'
import AddTitleBtn from '../AddTitleBtn/AddTitleBtn'
const TodoModal = (props) => {
  const { maintitle, desc, date, labels, checkList } = props.card

  const [openCheckListModal, setOpenCheckListModal] = useState(false)
  const [openLabelModal, setOpenLabelModal] = useState(false)
  const [values, setValues] = useState({
    ...props.card,
  });



  //PROGRESS BAR
  const calculatePercent = () => {
    if (!values.tasks?.length) return 0;
    const completed = values.tasks?.filter((item) => item.completed)?.length;
    return (completed / values.tasks?.length) * 100;
  };


  const handleClose = () => props.setOpenTodoModal(false);

  return (
    <>
      <Modal
        show={props.openTodoModal}
        id={props.cardId}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        className='todo_modal_container'
        backdrop="static"
        centered
        keyboard={false}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title className='modal_header_title'>
            <div className='modal_title_icon'>
              <FontAwesomeIcon icon={faCalendar} className="" />
              <FontAwesomeIcon icon={faTag} transform={{ rotate: 135 }} className="" onClick={() => (setOpenLabelModal(true))} />
              <FontAwesomeIcon icon={faSquareCheck} onClick={() => (setOpenCheckListModal(true))} />
              <FontAwesomeIcon icon={faEllipsis} className="" />
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* TITLE */}
          <div className='title__container'>
            <div className="TodoModal_box">
              <div className='TodoModal_box_title'>
                <p>Title *</p>
              </div>
              <AddTitleBtn
                text={maintitle}
                defaultValue={"maintitle"}
                placeholder="Enter Title"
                buttonText="Set Title"
              />

            </div>
            {/* DESCRIPTION */}
            <div className="TodoModal_box">
              <div className='TodoModal_box_title'>
                <p>Description</p>
              </div>
              <AddTitleBtn
                text={"desc"}
                default={desc}
                placeholder="Enter Description"
                buttonText="Save"
              />
            </div>
            {/* CHECK LIST START */}
            <div className='checkList_box'>
              <div className='TodoModal_box_title'>
                <p><FontAwesomeIcon icon={faSquareCheck} /> Check List</p>
              </div>
            </div>
            <div className="todoModal__progress-bar">
              <div
                className="todoModal__progress"
                style={{
                  width: `${calculatePercent()}%`,
                  backgroundColor: calculatePercent() === 100 ? "limegreen" : "",
                }}
              />
            </div>

            <div className="todoModal_check_list">
              <CheckList />
            </div>

            {/* CHECK LIST END */}
            {/* COMMENTS */}
            <h5 style={{ marginTop: "30px" }}><FontAwesomeIcon icon={faMessage} style={{ marginRight: "10px" }} />Comment</h5>
            <div className='comment_container'>
              <FontAwesomeIcon icon={faUser} style={{ fontSize: "30px", marginTop: "10px", marginRight: "10px" }} />
              <textarea
                className='comment_textarea'
              ></textarea>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button  >Save</Button>
        </Modal.Footer>
      </Modal>
      <CheckListTitle openCheckListModal={openCheckListModal} setOpenCheckListModal={setOpenCheckListModal} />
      <Labels openLabelModal={openLabelModal} setOpenLabelModal={setOpenLabelModal} />
    </>
  )
}

export default TodoModal