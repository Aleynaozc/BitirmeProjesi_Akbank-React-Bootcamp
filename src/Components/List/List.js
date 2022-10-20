
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
      <div className="list">
        <div
          className='deleteList'
          onClick={() => props.removeList(props.list?.id)}>
          <FontAwesomeIcon
            icon={faSquareMinus}
            className="closeBtn" />
        </div>
        <h5 className="card-title">{props.list?.title}</h5>
        <div className='list-body  custom-scroll'>

          {
            props.getCardData.map((card, index) =>
            (card.listId === props.list.id ?
              <Draggable
                key={String(card.id)}
                draggableId={String(card.id)}
                index={card.id}
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
                    className='todo_card_container custom-scroll'
                  >
                    <Card
                      handleGetCard={props.handleGetCard}
                      setBoards={props.setBoards}
                      boardsList={props.boardsList}
                      key={card.id}
                      boardId={props.list.id}
                      card={card}
                      removeCard={props.removeCard}
                      handleUpdateCard={props.handleUpdateCard}
                    />
                  </div>
                )}
              </Draggable>
              : ""

            ))}
        </div>
        <div className='addacard_body'>
          <AddTitleBtn
            text="+ Add Card"
            onSubmit={(value) => props.addCard(props.list?.id, value)}
            placeholder="Enter Card Title"
          />
        </div>

      </div>



    </>
  )
}

export default List