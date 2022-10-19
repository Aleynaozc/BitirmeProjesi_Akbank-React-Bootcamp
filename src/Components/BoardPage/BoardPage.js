import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import '../BoardPage/BoardPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ListModal from '../List/ListModal';
import List from '../List/List';

import Header from '../Common/Header/Header';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';


const BoardPage = () => {
  const [openModal, setOpenModal] = useState(false)
  const [boards, setBoards] = useState([])

  const [board, setboard] = useState({ title: "" });
  const [lists, setLists] = useState({
    title: "",
    boardId: "",
  })
  const [getList, setGetList] = useState([])
  const [getCardData, setgetCardData] = useState([])




  const params = useParams();

  //ADD BOARD
  const handleBoardChange = (e) => {
    setboard({
      ...board,
      [e.target.name]: e.target.value,
    });
  };



  const navigate = useNavigate()

  const handleBoardSubmit = () => {
    const boardData = board;
    axios.post("/board", boardData
    ).then((response) => {
      setboard(response.data);
      navigate(`/boardpage/${response.data.id}/${response.data.title}`)
    }
    )


  };
console.log(board)

  const handleAddList = async (event) => {
    event.preventDefault();
    await axios.post("list", {
      title: lists.title,
      boardId: Number(params.id)
    })
      .then((res) => {
        console.log(res.data);
      }
      )
    getListData()
  }
console.log(lists)
  // Get LIST
  const getListData = async () => {
    await axios.get(`list?boardId=${params.id}`).then((response) => {
      setGetList(response.data);
    }
    )
  };
  const handleListChange = (e) => {
    setLists({
      ...lists,
      [e.target.name]: e.target.value,
    });
  };


  const removeList = async (id) => {
    await axios.delete("list/" + id);
    getListData()

  };


  //CARD ADD
  const handleAddCard = async (id, title) => {

    await axios.post("card", {
      title: title,
      listId: id
    })
      .then((res) => {
        console.log(res.data);
      }
      )
    handleGetCard()
  }
  const removeCard = async (id) => {
    await axios.delete("card/" + id);
    handleGetCard()
  };

  const handleGetCard = async () => {
    await axios.get("card").then((response) => {
      setgetCardData(response.data);
    }
    )

  }





  useEffect(() => {
    localStorage.setItem("BoardsList", JSON.stringify(board));
  }, [board]);


  useEffect(() => {
    getListData();
    handleGetCard();

  }, []);

  const onDragEnd = result => {

    if (!result.destination) return

    const { source, destination } = result

    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = boards.map((i) => i.list.findIndex(e => e.id === Number(source.droppableId)))
      const destinationColIndex = boards.map((i) => i.list.findIndex(e => e.id === Number(destination.droppableId)))

      const sourceCol = boards.map((i) => i.list = [sourceColIndex])
      const destinationCol = boards.map((i) => i.list = [destinationColIndex])

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
      <Header  handleChange={handleBoardChange} handleSubmit={handleBoardSubmit} board={board}></Header>
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
          {getList.map((list) =>
          (
            list.boardId === Number (params.id) ?


              <Droppable
                key={String(list.id)}
                droppableId={String(list.id)}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <List
                      getCardData={getCardData}
                      list={list}
                      addCard={handleAddCard}
                      handleGetCard={handleGetCard}
                      removeList={removeList}
                      removeCard={removeCard}
                    />
                    {provided.placeholder}
                  </div>

                )
                }

              </Droppable>
              : ""
          )


          )}

          <ListModal
            handleAddList={handleAddList}
            lists={lists}
            handleListChange={handleListChange}
            openModal={openModal}
            setOpenModal={setOpenModal} 
            board={board}
            />

        </div>

      </DragDropContext>

    </>
  )

}

export default BoardPage