
import React, { useState } from 'react'
import '../Card/Card.css'

import Label from './Labels/Labels'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { faClock, faComment, faSquareCheck, faSquareMinus } from '@fortawesome/free-regular-svg-icons';
import TodoModal from './TodoModal';

const Card = (props) => {
    const [openTodoModal,setOpenTodoModal]=useState(false)
    const { id, title, date, tasks, labels } = props.card;
    return (
        <>
         { <TodoModal card={props.card} openTodoModal={openTodoModal} setOpenTodoModal={setOpenTodoModal}/>}
        <div div className='todo_list_container' onClick={()=>setOpenTodoModal(true)} >
           
            <FontAwesomeIcon icon={faSquareMinus} className="closeBtn" onClick={() => props.removeCard(id)} />
            {
                props.card?.labels?.map((item, index) =>
                    <Label text={item.text}
                        color={item.color}
                        key={index}
                    />
                )
            }
            <div className='todo_list_main_title'>
                <h6> {props.card?.maintitle}</h6>
                <div className='card_footer'>
                    {
                        props.card?.date &&
                        <p className='date_of_todo'><FontAwesomeIcon icon={faClock} style={{ marginRight: "6px" }} /> {props.card?.date}</p>
                    }
                    <p className='compeleted_todo'><FontAwesomeIcon style={{ marginRight: "6px" }} icon={faSquareCheck} /> 1/3</p>
                </div>
            </div>
            <div className='todo_list_body'>
                <FontAwesomeIcon icon={faEye}  className="icon" />
                <div className='icon_paperclip'>
                    <FontAwesomeIcon icon={faPaperclip} transform={{ rotate: 45 }} /> <span style={{ marginRight: "6px" }}>0</span>
                    <FontAwesomeIcon icon={faComment} /> <span>1</span>
                </div>
            </div>
           
        </div>
        </>

    )
   

}

export default Card