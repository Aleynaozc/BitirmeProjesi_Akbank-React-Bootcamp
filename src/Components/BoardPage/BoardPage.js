import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable} from 'react-beautiful-dnd'
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
                boardId:id,
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

  const removeCard = (cardId) => {
    const newCardList = boards.map((i) => {
      i.cards = i.cards.filter((item) => item.id !== cardId)
      return i
    })
    setBoards(newCardList);
  }

  useEffect(() => {
    localStorage.setItem("BoardsList", JSON.stringify(boards));
  }, [boards]);

  const onDragEnd = result => {
    if (!result.destination) return

    const { source, destination } = result

    if (source.droppableId !== destination.droppableId) {
        const sourceColIndex = boards.findIndex(e => e.id === Number(source.droppableId))
        const destinationColIndex = boards.findIndex(e =>e.id === Number(destination.droppableId))

        const sourceCol = boards[sourceColIndex]
        const destinationCol = boards[destinationColIndex]
       console.log(sourceCol)
        const sourceTask = [...sourceCol.cards]
        const destinationTask = [...destinationCol.cards]

        const [removed] = sourceTask.splice(source.index, 1)
        destinationTask.splice(destination.index, 0, removed)

        boards[sourceColIndex].cards = sourceTask
        boards[destinationColIndex].cards = destinationTask

        setBoards(boards)
    }
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
      <DragDropContext onDragEnd={onDragEnd}
       
      >


        <div className='add-list__container'>

          {boards.map((board) => (
            <Droppable
              key={String(board.id)}
              droppableId={String(board.id)}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <Board
                    key={boards.id}
                    boards={board}
                    setBoards={setBoards}
                    addCard={handleAddCard}
                    removeBoard={removeBoard}
                    removeCard={removeCard}
                  />
                      {provided.placeholder}
                </div>
              
              )
              }
             
            </Droppable>

          ))}

          <BoardModal onSubmit={handleAddBoard} openModal={openModal} setOpenModal={setOpenModal} />

        </div>

      </DragDropContext>

    </>
  )
}

export default BoardPage