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

const TodoModal = (props) => {

  const [selectedColor, setSelectedColor] = useState();
  const [openCheckListModal, setOpenCheckListModal] = useState(false)
  const [openLabelModal, setOpenLabelModal] = useState(false)
  const [openCalendarModal, setOpenCalendarModal] = useState(false)
  const [values, setValues] = useState({
    ...props.card,
  });

  const uniqueIdGenerator = () => {
    return Math.floor(Math.random() * 100000 + 1);
  };



  const addCheckList = (value) => {

    const checkLists = {
      id: uniqueIdGenerator(),
      text: value,
      cardId: values.id,
      checkListItem: [],
    };
    setValues({
      ...values,
      checkList: [...values.checkList, checkLists],
    });

  };


  const addCheckListItem = (value) => {

    let newValue = values.checkList.map((i) =>
      i.id === values.checkList.id
        ? {
          ...i,
          checkListItem: [
            ...i.checkListItem,
            {
              id: uniqueIdGenerator(),
              isChecked: false,
              text: value,
              checkListId: values.checkList.id,
            }
          ],
        } : { ...i }
    )
    setValues(newValue)


  };
  console.log(values)

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
    if (!values.tasks?.length) return 0;
    const completed = values.tasks?.filter((item) => item.completed)?.length;
    return (completed / values.tasks?.length) * 100;
  };

  const handleClose = () => props.setOpenTodoModal(false);

  return (
    <>
      <Date
        date={values.date}
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
                text={values.maintitle}
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
                default={values.desc}
                placeholder="Enter Description"
                buttonText="Save"
              />
            </div>

            {/* CHECK LIST START */}
            <div className='checkList__container custom-scroll'>
              {values.checkList?.map((checkList) => (
                <div className='checkList_box'>
                  <div className='TodoModal_box_title'>
                    <FontAwesomeIcon icon={faSquareCheck} className="nbr" />
                    <AddTitleBtn
                      text={checkList.text}
                      defaultValue={"Check List Title "}
                      placeholder="Update Title"
                      buttonText="Set Title"
                      displayTextClass={""}

                    />

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
                    {
                      checkList.checkListItem.map((i, index) =>
                        (
                          <div className="todoModal_check_list_checkbox">
                            <div key={index} >
                              <input
                                type="checkbox"
                                defaultChecked=""
                              />
                              <p className="completed" >{i.text}</p>
                              <FontAwesomeIcon icon={faTrash} className="" />
                            </div>
                          </div>
                        )
                        )
                    }


                  </div>
                  <AddTitleBtn
                    text={"Add a List"}
                    defaultValue={"Check List Title "}
                    placeholder="Add Title"
                    InputClass={"inputClass2"}
                    editClass={"addListBtn"}
                    displayButtonClass={"displayBtn"}
                    displayClass={"list_design"}
                    onSubmit={(value) => addCheckListItem(value)}
                    displayFlex={"displyFlex"}
                    btnPosClass={"btnPosClass"}
                  />
                </div>
              ))}
            </div>
            {/* CHECK LIST END */}
            <div className="TodoModal_box">
              <div className='TodoModal_box_title'>
                <p>Label</p>
              </div>
              {
                values.labels?.map((item, index) =>
                  <Labels

                    key={index + item.text}
                    color={index + item.color}
                    text={item.text}
                    style={{ backgroundColor: item.color, color: "#fff" }}
                  />
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

      <Labels openLabelModal={openLabelModal} setOpenLabelModal={setOpenLabelModal} />
    </>
  )
}

export default TodoModal