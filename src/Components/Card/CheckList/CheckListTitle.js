
import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddTitleBtn from '../../AddTitleBtn/AddTitleBtn';
import '../CheckList/CheckList.css'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
const CheckListTitle = (props) => {
  const handleClose=()=>{
    props.setOpenCheckListModal(false)

  }
  const [inputText, setInputText] = useState("");

  const submission = (e) => {
    e.preventDefault();
    if (inputText && props.onSubmit) {
        props.onSubmit(inputText);
        setInputText("")
        handleClose()
    }

};
  return (
    props.openCheckListModal&&
    ( <div  className='checkList_body'>
           <FontAwesomeIcon icon={faXmark} onClick={handleClose} className="closeTitle" />
           <div className='list_form' >
        <form onSubmit={submission}>
          <input 
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
            placeholder='Add a CheckList Title'
            style={{width:"200px"}}
           /> 
           <div className='cLtitle_btn_cont'>
           <button type='submit' className='cLtitle_btn'>Add</button>
           </div>
       
        </form>
        </div>
    </div>)
  )
}

export default CheckListTitle