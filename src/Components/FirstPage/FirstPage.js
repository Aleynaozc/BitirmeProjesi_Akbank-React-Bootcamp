import React from 'react'
import '../FirstPage/FirstPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const FirstPage = () => {
  return (
    <div className='container mt-5'>
      <h1 className="app_title">KANBON BOARD APP</h1>
      <div className="addBorder-card__container">
      <div className="addBorder-card">
        <div className="addBorder-card-body">
          <div className="addBorder-card_icon">
            <Link to="/board" className="link_color" >
              <FontAwesomeIcon icon={faPlus} />
            </Link>
          </div>
          <p className="card-text">Add New Board</p>

        </div>
      </div>
      <div className="addBorder-card">
        <div className="addBorder-card-body "  >
          <div className="addBorder-card_icon">
           
          </div>
          <p className="card-text">Task-1 Board</p>
        </div>
      </div>
      <div className="addBorder-card">
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
      </div>
    </div>
    </div>
  )
}

export default FirstPage