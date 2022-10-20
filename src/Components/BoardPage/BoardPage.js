import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import '../BoardPage/BoardPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ListModal from '../List/ListModal';
import List from '../List/List';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Common/Header/Header';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';



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



  const navigate = useNavigate()

  const params = useParams();

  //BOARD
  const handleBoardChange = (e) => {
    setboard({
      ...board,
      [e.target.name]: e.target.value,
    });
  };
  const handleBoardSubmit = () => {
    const boardData = board;
    axios.post("/board", boardData
    ).then((response) => {
      setboard(response.data);
      navigate(`/boardpage/${response.data.id}/${response.data.title}`)
    }
    )


  };

  //  LIST
  const handleAddList = async (event) => {
    event.preventDefault();
    if (!params.title) {
      alert("Başlık Girin!")

    } else {
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

  }
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

  //CARD 
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
  const handleUpdateCard = async (id, title) => {
    await axios.put("card/" + id, {
      title: title,
      boardId: params.id
    }).then((response) => {
      console.log(response.data);
    }
    )
    handleGetCard()
  }

  const onDragEnd = result => {

    if (!result.destination) return

    const { source, destination } = result

    if (source.droppableId !== destination.droppableId) {

      const sourceColIndex = getList.findIndex(e => e.id === Number(source.droppableId))
      const destinationColIndex = getList.findIndex(e => e.id === Number(destination.droppableId))

      let sourceCol = getList[sourceColIndex]

      let destinationCol = getList[destinationColIndex]

      let newList = getList

      let sourceTask = [...sourceCol.cards]

      let destinationTask = [...destinationCol.cards]

      const findedIndex = sourceCol.cards.findIndex(i => i.id === source.index)

      let [removed] = sourceTask.splice(findedIndex, 1)

      destinationTask.splice(destination.index, 0, removed)

      newList[sourceColIndex].cards = sourceTask
      newList[destinationColIndex].cards = destinationTask


      setGetList(newList)


    }
  }
  useEffect(() => {
    getListData();
    handleGetCard();

  }, []);
  return (
    <>
      <Header handleChange={handleBoardChange} handleSubmit={handleBoardSubmit} board={board}></Header>
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
            list.boardId === Number(params.id) ?
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
                      handleUpdateCard={handleUpdateCard}
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