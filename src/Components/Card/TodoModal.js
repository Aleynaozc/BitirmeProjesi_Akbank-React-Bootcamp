import { faCalendar, faEllipsis, faPaperclip,  faTag, faUser } from '@fortawesome/free-solid-svg-icons'
import { faMessage, faSquareCheck } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import '../Card/Card.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const TodoModal = (props) => {
  const [desValue, setDesValue] = useState()
  const [commentValue, setCommentValue] = useState()
 
 
  const handleAddTodoListItem = (desValue,commentValue, id) => {

    const newCardList = [...props.card]
    newCardList.map((card) => {
        card.todoList.forEach((todoList) => {
            if (card.id === id) {
              todoList.desc = desValue
              todoList.comments = commentValue
            }
        })


    })
    props.setCard(newCardList)
}

  // const handleAddTodoList = () => {
  //   props.setCard(
  //     props.card.map((card) =>
  //     card.id === props.cardId
  //     ? {
  //       ...card,
  //       todoList: card.todoList.map((todoList) =>
  //           // You can replace 2 with your dynamic value
  //           todoList.id === props.cardId 
  //               ? { ...todoList, desc: value.desc,comments:value.commets }
  //               : { ...todoList }
  //       ),
  //   }
  // : { ...card }
      
  //   )
        
           
       
  //     )
  //   setValue("")
  // }
  // const handleClick = () => {
  //   if (value.desc === "") {
  //     return alert("Lütfen açıklama giriniz")
  //   }
  //     handleAddTodoList(value)
      
     
  // }
 
  const handleSave = (id) => {

    if (desValue  ) {
      handleAddTodoListItem(desValue,commentValue, id)
    } else {
      setDesValue("")
      setCommentValue("")
    }
    props.setshowTodoModal(false)
}
 

 
  const handleClose = () => props.setshowTodoModal(false);

  return (
   
    <Modal
    show={props.showTodoModal}
    id={props.cardId}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    className='todo_modal_container'
    backdrop="static"
    keyboard={false}
    onHide={handleClose}
  >
    <Modal.Header  closeButton>
      <Modal.Title className='modal_header_title'>
        <div className='modal_title_icon'>
        <FontAwesomeIcon icon={faCalendar} className="" />
      <FontAwesomeIcon icon={faTag} transform={{ rotate: 135 }} className="" />
      <FontAwesomeIcon icon={faUser} className="" />
      <FontAwesomeIcon icon={faPaperclip} className="" />
      <FontAwesomeIcon icon={faSquareCheck} className="" />
      <FontAwesomeIcon icon={faEllipsis} className="" />
        </div>
      </Modal.Title>
    </Modal.Header>
   
    <Modal.Body>
      
   
     <div className='title__container'>
     <span>Title *</span>
     <input 
     type="text" 
     name="todolistTitle"
     placeholder="{props.ü}"
    />
    <textarea 
     type="desc" 
     placeholder='Description'
     className='desc_inp'
     name="todolistTitle"
     value={desValue}
    />
    <h5 style={{marginTop:"30px"}}><FontAwesomeIcon icon={faMessage} style={{marginRight:"10px"}} />Comment</h5>
    <div className='comment_container'>
    <FontAwesomeIcon icon={faUser} style={{fontSize:"30px" ,marginTop:"10px",marginRight:"10px"}} />
    <textarea
     className='comment_textarea' 
     value={commentValue}
   
     ></textarea>
    </div>
    
    
    
     </div>
    
    
    </Modal.Body>

    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button onClick={() => handleSave()} >Save</Button>
    </Modal.Footer>
  </Modal>
  
  )
}

export default TodoModal