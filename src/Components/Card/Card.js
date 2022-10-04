
import React from 'react'
import '../Card/Card.css'
import TodoItem from './TodoItem'
import Label from '../Labels/Labels'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { faClock, faComment, faSquareCheck, faSquareMinus } from '@fortawesome/free-regular-svg-icons';

const Card = (props) => {
    return (
        
        <div div className='todo_list_container' >
            <FontAwesomeIcon icon={faSquareMinus} className="closeBtn" />
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
            <TodoItem />
        </div >

    )



}

export default Card