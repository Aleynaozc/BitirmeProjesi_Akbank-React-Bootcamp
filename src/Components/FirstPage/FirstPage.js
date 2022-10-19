import React, { useEffect, useState } from 'react'
import '../FirstPage/FirstPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap';
import Board from '../Board/Board';



const FirstPage = () => {
  
  const [getOwnerBoards, setGetOwnerBoards] = useState([])

  const getBoards = async () => {
    await axios.get("http://localhost:80/board", {
      headers: {
        'authorization': `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => {
      setGetOwnerBoards(response.data);
    }
    )
  };

  const removeBoard = async (id) => {
    await axios.delete("board/" + id);
    getBoards()
  };

  useEffect(() => {
    getBoards();

  }, []);

  const createBoards = () => {
    return getOwnerBoards.map((item, index) => {
      return <Board key={index} board={item} removeBoard={removeBoard} />;
    });
  };


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
        {/* {getOwnerBoards.map((allBoard, index) =>
          <div className="addBorder-card"
            key={index}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/boardpage/${allBoard.id}`)}
          >
            <div className="addBorder-card-body "  >
              <p className="card-text">{allBoard.title}</p>
            </div>
          </div>
        )} */}
        {createBoards()}
      </div>
    </div>
  )
}

export default FirstPage