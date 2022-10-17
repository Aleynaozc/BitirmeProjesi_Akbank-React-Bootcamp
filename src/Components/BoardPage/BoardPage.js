import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import '../BoardPage/BoardPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ListModal from '../List/ListModal';
import List from '../List/List';

import Header from '../Common/Header/Header';


const BoardPage = () => {
  const [openModal, setOpenModal] = useState(false)
  const [boards, setBoards] = useState([])
  const [boardList,setBoardList]=useState([])
  const [editTitle, setEditTitle] = useState('Board Title')


 

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
        ownerId: "",
        list: [],
      }
    ])
  }


  const handleAddList = (title) => {

    setBoards(
      boards.map((item) =>
        item.id
          ? {
            ...item,
            list: [
              ...item.list,
              {
                id: uniqueIdGenerator(),
                title,
                boardId: item.id,
                cards: [],
              }
            ]
          }
          : { ...item }
      ))


  }
 

  const handleAddCard = (id, maintitle) => {
    boards.map((t) => t.list.map((i) =>  {
      if (i.id === id) {
        const listCard = {
          id: uniqueIdGenerator(),
          maintitle,
          listId: i.id,
          desc: "",
          date: "",
          checkList: [],
          labels: [],
          comments: [],
        };
        i.cards = [...i.cards, listCard]
      }
    }))

  }




  // const handleAddCard = (id, maintitle) => {

  //   setBoards(
  //     boards.map((item) =>
  //       item.id === id
  //         ? {
  //           ...item,
  //           cards: [
  //             ...item.cards,
  //             {
  //               id: uniqueIdGenerator(),
  //               maintitle,
  //               boardId: id,
  //               desc: "",
  //               date: "",
  //               checkList: [],
  //               labels: [],
  //               comments: [],
  //             }
  //           ]
  //         }
  //         : { ...item }
  //     ))
  // }



  const removeList = (listId) => {
    const newList = boards.map((board) => {
      board.list = board.list.filter((item) => item.id !== listId);
      return board
    }
    )
    setBoards(newList);
  }


  const removeCard = (cardId) => {
    const newCardList = boards.map((board) => 
      board.list.map((lists)=>{
        lists.cards = lists.cards.filter((item) => item.id !== cardId)
        return lists
      })
     
    )
    setBoards(newCardList);
  }





  useEffect(() => {
    localStorage.setItem("BoardsList", JSON.stringify(boards));
  }, [boards]);
  



  const onDragEnd = result => {

    if (!result.destination) return

    const { source, destination } = result

    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = boards.map((i)=>i.list.findIndex(e => e.id === Number(source.droppableId)))
      const destinationColIndex = boards.map((i)=>i.list.findIndex(e => e.id === Number(destination.droppableId)))

      const sourceCol = boards.map((i)=>i.list=[sourceColIndex])
      const destinationCol =boards.map((i)=>i.list=[destinationColIndex]) 
 
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
      <Header onSubmit={handleAddBoard}></Header>
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
          {boards.map((board) => board.list?.map((list) => (
            <Droppable
              key={String(list.id)}
              droppableId={String(list.id)}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <List
                    key={list.id}
                    list={list}
                    boardsList={boards}
                    setBoards={setBoards}
                    addCard={handleAddCard}
                    removeList={removeList}
                    removeCard={removeCard}
                  />
                  {provided.placeholder}
                </div>

              )
              }

            </Droppable>

          )))}

          <ListModal onSubmit={handleAddList} openModal={openModal} setOpenModal={setOpenModal} />

        </div>

      </DragDropContext>

    </>
  )

}

export default BoardPage