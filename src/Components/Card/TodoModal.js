import { faCalendar, faEllipsis, faTag, faTrash, faUser } from '@fortawesome/free-solid-svg-icons'
import { faMessage, faSquareCheck } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import '../Card/Card.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import CheckListTitle from './CheckList/CheckListTitle'

import Labels from './Labels/Labels'
import Date from './Date/Date'
import AddTitleBtn from '../AddTitleBtn/AddTitleBtn'
import CheckListItem from './CheckList/CheckListItem'
import { v4 as uuidv4 } from 'uuid';
const TodoModal = (props) => {

  const { id, maintitle, date, desc } = props.card;
  const [selectedColor, setSelectedColor] = useState();
  const [openCheckListModal, setOpenCheckListModal] = useState(false)
  const [openLabelModal, setOpenLabelModal] = useState(false)
  const [openCalendarModal, setOpenCalendarModal] = useState(false)
  const [values, setValues] = useState({
    ...props.card,
  });



  const addCheckList = (value) => {
    props.boardsList.map((i) => {
      i.cards.map((t) => {
        if (t.id == id) {
          const checkLists = {
            id: uuidv4(),
            text: value,
            cardId: id,
            checkListItem: []
          };
          t.checkList = [...t.checkList, checkLists]
        }
      }
      )

    })

  };

  props.boardsList.map((t) => t.cards.map((i) =>
  console.log(i.labels)))

  const addCheckListItem = (checkLId, value) => {
    props.boardsList.map((t) => t.cards.map((i) => i.checkList.map(k => {
      if (k.cardId === i.id) {
        const checkListItems = {
          id: uuidv4(),
          text: value,
          isChecked: false,
          checkListId: checkLId,
        };
        k.checkListItem = [...k.checkListItem, checkListItems]
      }
    })))

  }

  const checkListsItems = props.boardsList.map((t) => t.cards.map((i) => i.checkList.map(k => k.checkListItem)))

  const colors = [
    "#a8193d",
    "#4fcc25",
    "#1ebffa",
    "#8da377",
    "#9975bd",
    "#cf61a1",
    "#240959",
  ];
  //PROGRESS BAR
  const calculatePercent = () => {
    if (!checkListsItems?.length) return 0;
    const completed = checkListsItems?.filter((item) => item.isChecked)?.length;
    return (completed / checkListsItems?.length) * 100;
  };

  const handleClose = () => props.setOpenTodoModal(false);

  return (
    <>
      <Date
        date={date}
        openCalendarModal={openCalendarModal}
        setOpenCalendarModal={setOpenCalendarModal} />

      <Modal
        show={props.openTodoModal}
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
              <FontAwesomeIcon icon={faCalendar} className="" onClick={() => (setOpenCalendarModal(true))} />
              <FontAwesomeIcon icon={faTag} transform={{ rotate: 135 }} className="" onClick={() => (setOpenLabelModal(true))} />
              <FontAwesomeIcon icon={faSquareCheck} onClick={() => (setOpenCheckListModal(true))} />

            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='checkList_title'>
            <CheckListTitle
              openCheckListModal={openCheckListModal}
              onSubmit={addCheckList}
              setOpenCheckListModal={setOpenCheckListModal}
            />
          </div>
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
                text={"Enter Description"}
                default={desc}
                placeholder="Enter Description"
                buttonText="Save"
              />
            </div>

            {/* CHECK LIST START */}
            <div className='checkList__container custom-scroll'>
              {props.boardsList.map((t) => t.cards.map((card) =>
                card.checkList.map((checkList, index) =>
                  <div className='checkList_box'>
                    <div key={index} className='TodoModal_box_title'>
                      <FontAwesomeIcon icon={faSquareCheck} className="nbr" />
                      <p>{checkList.text}</p>
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
                    <div className="todoModal_check_list ">
                      <CheckListItem
                        checkList={checkList}
                        checkListId={checkList.id}
                        onSubmit={(value) => addCheckListItem(checkList.id, value)}
                      />
                    </div>
                  </div>
                )))
              }
            </div>
            {/* CHECK LIST END */}
            <div className="TodoModal_box">
              <div className='TodoModal_box_title'>
                <p>Label</p>
              </div>
              {
                props.boardsList.map((t) => t.cards.map((i) =>
                  i.labels?.map((item, index) =>
                    <Labels
                      key={index + item.text}
                      openLabelModal={openLabelModal} 
                      setOpenLabelModal={setOpenLabelModal}
                      color={index + item.color}
                      text={item.text}
                      style={{ backgroundColor: item.color, color: "#fff" }}
                    />
                  )
                )
                )
              }
              <ul>
                {
                  colors.map((item, index) => (
                    <li
                      key={index + item}
                      style={{ backgroundColor: item }}
                      className={selectedColor === item ? "li_active" : ""}
                      onClick={() => setSelectedColor(item)} />
                  ))
                }
              </ul>
              <AddTitleBtn
                text="label"
                placeholder="Enter Label"
                buttonText="Save"
              />
            </div>


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

    </>
  )
}

export default TodoModal