import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Header/Header.css';
import { faChartBar, faPen, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Header = (props) => {
  const [edit, setEdit] = useState(false)
  const [inputText, setInputText] = useState("");
  const submission = (e) => {
    e.preventDefault();
    if (inputText && props.onSubmit) {
      props.onSubmit(inputText);
      setInputText("")
      setEdit(false)
    }

  };
  return (
    <div className='header_app'>
      <Link to="/" className='link_style'>
        <button className='boards_btn'>
          <FontAwesomeIcon icon={faChartBar} className="chart_icon" />
          Boards
        </button>
      </Link>
      {edit ?
        (
          <form onSubmit={submission}>
            <input
              type="text"
              name='editValue'
              placeholder='Board Title'
              value={inputText}
              className='editTitleInput'
              onChange={(event) => setInputText(event.target.value)}

            />
            <button type='submit' className='cLtitle_btn'>Add</button>

          </form>
        ) : (
          <button className='boards_btn'  onClick={() => setEdit(true)}> <FontAwesomeIcon icon={faPen} className="edit_icon" />{props.editTitle}</button>
        )
      }
      <Link to="/">
        <button className='logout_btn boards_btn'>Logout</button>
      </Link>
    </div>
  )
}
export default Header