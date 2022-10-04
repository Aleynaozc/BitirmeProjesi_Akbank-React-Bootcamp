import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import '../BoardPage/BoardPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import BoardModal from '../Board/BoardModal';
import Board from '../Board/Board';


const BoardPage = () => {
  const [openModal, setOpenModal] = useState(false)
  const [boards, setBoards] = useState([])


  //Creat Unique ID
  const uniqueIdGenerator = () => {
    return Math.floor(Math.random() * 100000 + 1);
  };

  // ADD BOARD
  const handleAddBoard = (title) => {
    setBoards([
      ...boards,
      {
        id: uniqueIdGenerator(),
        title,
        cards: [],
      }
    ])
  }

  const handleAddCard = (id, maintitle) => {

    setBoards(
      boards.map((item) =>
        item.id === id
          ? {
            ...item,
            cards: [
              ...item.cards,
              {
                id: uniqueIdGenerator(),
                maintitle,
                desc: "",
                date: "",
                checkList: [],
                labels: [],
                comments: [],
              }
            ]
          }
          : { ...item }
      ))
  }


  const removeBoard = (boardId) => {

    const newList = boards.filter((item) => item.id !== boardId);
    setBoards(newList);

  }

  const removeCard = (boardId, cardId) => {

    //Find the board of the card to be deleted.
    const findBoardIndex =
      boards.findIndex((board) =>
        board.id === boardId
      )
    // Find the index of the card to be deleted
    const deletedCardIndex =
      boards[findBoardIndex].cards.findIndex((card) =>
        card.id === cardId
      )

    const newCardList =
      boards[findBoardIndex].cards[deletedCardIndex].filter((cards) => cards.id !== cardId);

    setBoards(newCardList);

  }

  useEffect(() => {
    localStorage.setItem("BoardsList", JSON.stringify(boards));
  }, [boards]);

  const onDragEnd = result => {
    console.log(result)
  }
  return (
    <>
      <div className="addList_btn_box">
        <button
          type="text"
          className="addList__button"
          name="txt"
          autoComplete='off'
          onClick={() => setOpenModal(true)}
        >
          <FontAwesomeIcon icon={faPlus} className="plus_icon" />
          <span className='add_list_Title'>Add a List </span>
        </button>


      </div>
      <DragDropContext onDragEnd={onDragEnd}>


        <div className='add-list__container'>

          {boards.map((board) => (
            <Droppable
              key={String(board.id)}
              droppableId={String(board.id)}>
              {(provided) => (
                <div
              className=""
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <Board
                key={boards.id}
                boards={board}
                setBoards={setBoards}
                addCard={handleAddCard}
                removeBoard={removeBoard} />
            </div>
              )}
            </Droppable>

          ))}

          <BoardModal onSubmit={handleAddBoard} openModal={openModal} setOpenModal={setOpenModal} />

        </div>

      </DragDropContext>

    </>
  )
}

export default BoardPage