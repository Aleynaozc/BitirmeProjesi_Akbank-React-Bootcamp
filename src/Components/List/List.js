
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { faSquareMinus } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddTitleBtn from '../AddTitleBtn/AddTitleBtn'
import '../List/List.css'
import Card from '../Card/Card'



const List = (props) => {

  return (
    <>
      <div className="board">
        <div
          className='deleteBoard'
          onClick={() => props.removeBoard(props.boards?.id)}>
          <FontAwesomeIcon
            icon={faSquareMinus}
            className="closeBtn" />
        </div>
        <h5 className="card-title">{props.boards?.title}</h5>
        <div className='board-body  custom-scroll'>

          {props.boards?.cards?.map((card, index) => (
            <Draggable
              key={card.id}
              draggableId={String(card.id)}
              index={index}
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    ...provided.draggableProps.style,
                    opacity: snapshot.isDragging ? '0.5' : '1'
                  }}
                  className='todo_list_container custom-scroll'
                >
                  <Card
                    setBoards={props.setBoards}
                    boardsList={props.boardsList}
                    key={card.id}
                    boardId={props.boards.id}
                    card={card}
                    removeCard={props.removeCard}
                  />
                </div>

              )}

            </Draggable>

          ))}
        </div>
        <div className='addacard_body'>
          <AddTitleBtn
            text="+ Add Card"
            onSubmit={(value) => props.addCard(props.boards?.id, value)}
            placeholder="Enter Card Title"
          />
        </div>

      </div>



    </>
  )
}

export default List