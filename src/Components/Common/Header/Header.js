import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../Header/Header.css';
import { faChartBar, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const Header = (props) => {
  const [edit, setEdit] = useState(false)
  const params = useParams();
  const { title, id } = props.board
  const navigate = useNavigate()
 
  const handleTitleSubmit = () => {

    props.handleSubmit()
    setEdit(false)
  }
  const UpdateBoardTitle = async() => {
    // await axios.put("/board/" + params.id,{
    //   title:title
    // }).then((response) => {
    //   console.log(response.data);
     
    // }
    // )
    // navigate(`/boardpage/${params.id}/${title}`)
  }

  return (
    <div className='header_app'>
      <Link to="/board" className='link_style'>
        <button className='boards_btn'>
          <FontAwesomeIcon icon={faChartBar} className="chart_icon" />
          Boards
        </button>
      </Link>
      {edit ?
        (
          <form
            onSubmit=
            {params.id ?
              (UpdateBoardTitle) : (
                handleTitleSubmit
              )

            }

          >
            <input
              type="text"
              name='title'
              placeholder='Board Title'
              value={title}
              defaultValue={params.title}
              className='editTitleInput'
              onChange={props.handleChange}

            />
            <button type='submit' className='cLtitle_btn'>Add</button>

          </form>
        ) : (
          params.title ?
            (<button className='boards_btn' onClick={() => setEdit(true)}> <FontAwesomeIcon icon={faPen} className="edit_icon" />{params.title}</button>
            ) : (
              <button className='boards_btn' onClick={() => setEdit(true)}> <FontAwesomeIcon icon={faPen} className="edit_icon" />Add</button>
            )
        )
      }
      <Link to="/">
        <button className='logout_btn boards_btn'>Logout</button>
      </Link>
    </div>
  )
}
export default Header