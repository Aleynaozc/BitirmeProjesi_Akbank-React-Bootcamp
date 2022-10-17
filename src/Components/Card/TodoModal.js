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


  const { id, maintitle, date, desc } = props.card;
  const [selectedColor, setSelectedColor] = useState();
  const [openCheckListModal, setOpenCheckListModal] = useState(false)
  const [openLabelModal, setOpenLabelModal] = useState(false)
  const [openCalendarModal, setOpenCalendarModal] = useState(false)
  const [label, setLabel] = useState([])
  async function getAllData() {
    try {
      const response = await axios.get("http://localhost:80/label");
      const data = response.data;
      console.log(data)
    } catch (error) {
      console.log(error.response)
    }

  }
  useEffect(() => {
    getAllData()
  }, [])

  const addCheckList = (value) => {
    props.boardsList.map((board) => board.list.map((list) => {
      list.cards.map((t) => {
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
    }))

  };


  const addCheckListItem = (checkLId, value) => {
    props.boardsList.map((board) => board.list.map((list) =>
      list.cards.map((card) =>
        card.checkList.map(checkList => {
          if (checkList.cardId === card.id) {
            const checkListItems = {
              id: uuidv4(),
              text: value,
              isChecked: false,
              checkListId: checkLId,
            };
            checkList.checkListItem = [...checkList.checkListItem, checkListItems]
          }
        }))))

  }

  const deleteCheckListItem = (id) => {
    props.boardsList.map((board) => 
    board.list.map((list)=>
    list.cards.map((card) => card.checkList.map(checkList => {
      if (checkList.cardId === card.id) {
        const newCheckListItem = checkList.checkListItem.filter((checkListItem) =>
          checkListItem.id !== id)

          checkList.checkListItem = newCheckListItem
      }
    }))))

  }

  const addLabel = (color, label) => {

    // props.boardsList.map((t) => t.cards.map((i) => {
    //   const labelsItem = {
    //     id: uuidv4(),
    //     color: color,
    //     text: label
    //   };
    //   i.labels = [...i.labels, labelsItem]
    // }))
  };





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
    props.boardsList.map((board) => 
    board.list.map((list)=>
    list.cards.map((card) =>
     card.checkList.map(checkList => {
      if (!checkList.checkListsItem?.length) return 0;
      const isChecked = checkList.checkListsItem?.filter((item) => item.isChecked)?.length;
      return (isChecked / checkList.checkListsItem?.length) * 100;
    }))))

  };

  //   const [post, setPost] = useState(null);

  // //  useEffect(() => {
  // //     axios.get('http://localhost:80/label').then((response) => {
  // //       setPost(response.data);
  // //     });
  // //   }, []);
  // // console.log(post)




  const handleClose = () => props.setOpenTodoModal(false);

  return (
    <>
      <Date
        date={date}
        openCalendarModal={openCalendarModal}
        setOpenCalendarModal={setOpenCalendarModal} />
      <Labels
        openLabelModal={openLabelModal}
        setOpenLabelModal={setOpenLabelModal}
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
              <FontAwesomeIcon icon={faTag} transform={{ rotate: 135 }} onClick={getAllData} />
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
                InputClass={"input2"}
                text={"Enter Description"}
                default={desc}
                placeholder="Enter Description"
                buttonText="Save"
              />
            </div>

            {/* CHECK LIST START */}
            <div className='checkList__container custom-scroll'>
              {props.boardsList.map((board) => 
              board.list.map((list)=>
              list.cards.map((card) =>
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
                          backgroundColor: calculatePercent() === 100 ? "blue" : "",
                        }}
                      />
                    </div>
                    <div className="todoModal_check_list ">
                      <CheckListItem
                        deleteCheckListItem={deleteCheckListItem}
                        checkList={checkList}
                        checkListId={checkList.id}
                        onSubmit={(value) => addCheckListItem(checkList.id, value)}
                      />
                    </div>
                  </div>
                ))))
              }
            </div>
            {/* CHECK LIST END */}
            <div className="TodoModal_box">
              <div className='TodoModal_box_title'>
                <p>Label</p>
              </div>
              <div className="cardinfo_box_labels">
                {/* {
                  props.boardsList.map((t) =>
                   t.cards.map((i) =>
                    i.labels.map((item, index) =>

                    <label
                      key={index}
                      style={{ backgroundColor: item.color, color: "#fff" }}
                    >
                      {item.text}
                      <FontAwesomeIcon icon={faXmark} />
                    </label>

                  )))
                } */}

              </div>
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
                InputClass={"input2"}
                placeholder="Enter Label"
                buttonText="Save"
                onSubmit={(value) =>
                  addLabel({ color: selectedColor, text: value })
                }
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