
import React, { useEffect, useState } from 'react'
import '../Card/Card.css'

import Label from './Labels/Labels'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { faClock, faComment, faSquareCheck, faSquareMinus } from '@fortawesome/free-regular-svg-icons';
import TodoModal from './TodoModal';
import axios from 'axios';

const Card = (props) => {
    const [openTodoModal, setOpenTodoModal] = useState(false)
    const { id } = props.card;

    const date = props.card?.updatedAt.toString().slice(0, 10)


    const [labelData, getLabelData] = useState([])


    const handleGetLabel = async () => {
        await axios.get("label").then((response) => {
            getLabelData(response.data);
        }
        )

    }

    const addLabelList = async (title, id) => {

        await axios.post("label", {
            title: title,
            cardId: id
        })
            .then((res) => {
                console.log(res.data);
            }
            )
        handleGetLabel()
    }

    const removeLabelList = async (id) => {

        await axios.delete("card-label/" + id, {
        })
            .then((res) => {
                console.log(res.data);
            }
            )
        handleGetLabel()
    }


    useEffect(() => {
        handleGetLabel()

    }, []);

    return (
        <>
            {
                <TodoModal
                    handleUpdateCard={(value) => props.handleUpdateCard(id, value)}
                    handleGetCard={props.handleGetCard}
                    card={props.card}
                    openTodoModal={openTodoModal}
                    setOpenTodoModal={setOpenTodoModal}
                    addLabelList={(value) => addLabelList(id, value)}
                    labelData={labelData}
                    removeLabelList={removeLabelList}
                />
            }

            <div div className='todo_card_container' onClick={() => setOpenTodoModal(true)} >
                <div>
                    {
                        labelData.map((item, index) =>
                            <hr className='hr_style' key={index} style={{ background: item.color, color: "#fff" }} />
                        )

                    }
                </div>
                <FontAwesomeIcon icon={faSquareMinus} className="closeBtn" onClick={() => props.removeCard(id)} />

                <div className='todo_list_main_title'>
                    <h6> {props.card?.title}</h6>
                    <div className='card_footer'>
                        {date && (
                            <p className='date_of_todo'>
                                <FontAwesomeIcon icon={faClock}
                                    style={{ marginRight: "6px" }} />
                                {date}
                            </p>
                        )
                        }
                        <p className='compeleted_todo'><FontAwesomeIcon style={{ marginRight: "6px" }} icon={faSquareCheck} /> 1/3</p>
                    </div>
                </div>
                <div className='todo_list_body'>
                    <FontAwesomeIcon icon={faEye} className="icon" />
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