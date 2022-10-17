import React, { useEffect, useState } from 'react'
import '../FirstPage/FirstPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';

import axios from 'axios';
import { useSelector } from 'react-redux';



const FirstPage = () => {
  const params = useParams();
  const [getOwnerBoards, setGetOwnerBoards] = useState([])

  const getBoards = async () => {
      await axios.get("http://localhost:80/board",{
        headers: { 'authorization': `Bearer ${localStorage.getItem("token")}`,
         },
      }).then((response) => {
        setGetOwnerBoards(response.data);
      }
      )
  };
  useEffect(() => {
    getBoards();

  }, []);












  // console.log(getOwnerBoards)
  // const dispatch=useDispatch();

  // const allBoards = useSelector(state => state.boards.allBoards);
 
  // useEffect(() => {
  //   dispatch(getAllBoards())
  //  }, [dispatch]);



  return (
    <div className='container mt-5'>
      <h1 className="app_title">KANBON BOARD APP</h1>
      <div className="addBorder-card__container">
      <div className="addBorder-card">
        <div className="addBorder-card-body">
          <div className="addBorder-card_icon">
            <Link to="/boardpage" className="link_color" >
              <FontAwesomeIcon icon={faPlus} />
            </Link>
          </div>
          <p className="card-text">Add New Board</p>
        </div>
      </div>
      {getOwnerBoards.map((allBoard)=>
      <div className="addBorder-card">
        <div className="addBorder-card-body "  >
          <p className="card-text">{allBoard.title}</p>
        </div>
      </div>
      )}
      
      {/* <div className="addBorder-card">
        <div className="addBorder-card-body">
          <div className="addBorder-card_icon">
          </div>
          <p className="card-text">Task-2 Board</p>
        </div>
      </div>
      <div className="addBorder-card">
        <div className="addBorder-card-body">
          <div className="addBorder-card_icon">
          </div>
          <p className="card-text">Task-3 Board</p>
        </div>
      </div> */}
    </div>
    </div>
  )
}

export default FirstPage