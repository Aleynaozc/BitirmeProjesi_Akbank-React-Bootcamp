import React, { useEffect, useState } from 'react'
import { faCalendar, faTag, faUser, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faMessage, faSquareCheck } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CheckListTitle from './CheckList/CheckListTitle'
import Labels from './Labels/Labels'
import Date from './Date/Date'
import AddTitleBtn from '../AddTitleBtn/AddTitleBtn'
import CheckListItem from './CheckList/CheckListItem'
import { v4 as uuidv4 } from 'uuid';

import '../Card/Card.css'
import axios from 'axios';
const TodoModal = (props) => {


  const { id, title, date, checklists, labels } = props.card;

  const [openCheckListModal, setOpenCheckListModal] = useState(false)

  const [openCalendarModal, setOpenCalendarModal] = useState(false)


  //CHECKLIST
  const addCheckList = async (title) => {

    await axios.post("checklist", {
      title: title,
      cardId: id
    })
      .then((res) => {
        console.log(res.data);
      }
      )
    props.handleGetCard();
  }

  const addCheckListItem = async (id, title) => {

    await axios.post("checklist-item", {
      title: title,
      checklistId: id,
      isChecked: false
    })
      .then((res) => {
        console.log(res.data);
      }
      )
    props.handleGetCard();
  }
  const removeCheckListItem = async (id) => {

    await axios.delete("checklist-item/" + id)
      .then((res) => {
        console.log(res.data);
      }
      )
    props.handleGetCard();
  }




  const updateCheckListItem = async (id) => {
    await axios.put("checklist-item/" + id, {
      isChecked: true,
    }).then((response) => {
      console.log(response.data);
    }
    )
    props.handleGetCard();
  }

  //PROGRESS BAR


  const calculatePercent = () => {

    let count = 0;
    checklists.map((cL) => cL.items.map(item => {

      if (item.isChecked === true) {
        count += 1;
      }

    }));
    return count;


  };

  useEffect(() => {

  }, [])

  console.log(labels)
  const handleClose = () => props.setOpenTodoModal(false);

  return (
    <>
      <Date
        date={date}
        openCalendarModal={openCalendarModal}
        setOpenCalendarModal={setOpenCalendarModal} />
      <Labels

        labelData={props.labelData}
      />

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
              <FontAwesomeIcon icon={faCalendar} onClick={() => (setOpenCalendarModal(true))} />
              <FontAwesomeIcon icon={faTag} transform={{ rotate: 135 }} />
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
                InputClass={"input2"}
                text={title}
                onSubmit={props.handleUpdateCard}
                defaultValue={title}
                placeholder="Enter Title"
                buttonText="Set Title"
              />
            </div>

            {/* CHECK LIST START */}
            <div className='checkList__container custom-scroll'>
              {checklists.map((checkList, index) =>
                <div className='checkList_box'>
                  <div key={index} className='TodoModal_box_title'>
                    <FontAwesomeIcon icon={faSquareCheck} className="nbr" />
                    <p>{checkList.title}</p>
                  </div>
                  <div className="todoModal__progress-bar">
                    <div
                      className="todoModal__progress"
                      style={{
                        width: `${calculatePercent() * 10}%`,
                        backgroundColor: calculatePercent() === 100 ? "blue" : "",
                      }}
                    />
                  </div>
                  <div className="todoModal_check_list ">
                    <CheckListItem
                      updateCheckListItem={updateCheckListItem}
                      removeCheckListItem={removeCheckListItem}
                      checkList={checkList}
                      checkListId={checkList.id}
                      onSubmit={(value) => addCheckListItem(checkList.id, value)}
                    />
                  </div>
                </div>


              )

              }
            </div>
            {/* CHECK LIST END */}
            <div className="TodoModal_box">
              <div className='TodoModal_box_title'>
                <p>Label</p>
              </div>
              <div className="cardinfo_box_labels">
                {
                  labels.map((item, index) =>

                    <label className='label_box'
                      key={index}
                      style={{ backgroundColor: item.color, color: "#fff" }}
                    >
                      {item.title}
                      <span ><FontAwesomeIcon icon={faXmark} onClick={() => props.removeLabelList(item.id)} /></span>
                    </label>

                  )


                }

              </div>
              <div className="cardinfo_box_labels">
                <form>
                  {

                    props.labelData.map((item, index) =>
                      <div className='label_body' key={index}>
                        <div className='labels_item'>
                          <input type="radio" name="lklş" />
                          <p>{item.title} </p>
                        </div>
                      </div>
                    )

                  }
                </form>

              </div>

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