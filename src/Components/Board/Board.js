import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faSquareMinus } from '@fortawesome/free-regular-svg-icons';
import '../Board/Board.css';
const Board = (props) => {
    
  const navigate = useNavigate()
  return (
    <div >
       <FontAwesomeIcon icon={faSquareMinus} className="deleteBoardBtn" onClick={() => props.removeBoard(props.board.id)} /> 
    <div className="addBorder-card"
    key={props.index}

   
  >
      
    <div className="addBorder-card-body custom-scroll2"   onClick={() => navigate(`/boardpage/${props.board.id}/${props.board.title}`)}>
    
      <p className="card-text">{props.board.title}</p>
    </div>
  </div>
  </div>
  )
}

export default Board