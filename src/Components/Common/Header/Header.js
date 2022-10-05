import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Header/Header.css';
import { faChartBar,faPen,faCheck} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Header = () => {
  const [edit, setEdit] = useState(false)
  const[editTitle,setEditTitle]=useState('Board Title')

  return (
    <div className='header_app'>
          <Link to="/" className='link_style'>
          <button className='boards_btn'> 
          <FontAwesomeIcon icon={faChartBar}  className="chart_icon" />
          Boards
          </button>
          </Link>
          {edit ?
            (
              <>
              <input
                type="text"
                name='editValue'
                value={editTitle}
                className='editTitleInput' 
                onChange={(e)=>setEditTitle(e.target.value)}
                 
                />
                 <FontAwesomeIcon icon={faCheck} onClick={()=>setEdit(false)} className="check_icon" />
                 
                </>
            ) : (
              <button className='boards_btn'  onClick={()=>setEdit(true)}> <FontAwesomeIcon icon={faPen} className="edit_icon" />{editTitle}</button>
            )
          }
          <Link to="/">
          <button className='logout_btn boards_btn'>Logout</button>
          </Link>
    </div>
  )
}
export default Header