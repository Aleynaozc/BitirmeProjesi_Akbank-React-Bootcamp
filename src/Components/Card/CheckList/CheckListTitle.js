
import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddTitleBtn from '../../AddTitleBtn/AddTitleBtn';
import '../CheckList/CheckList.css'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
const CheckListTitle = (props) => {
  const handleClose=()=>{
    props.setOpenCheckListModal(false)

  }
 
  return (
    props.openCheckListModal&&
    ( <div  className='checkList_body'>
           <FontAwesomeIcon icon={faXmark} onClick={handleClose} />
            <AddTitleBtn
                text={"Enter CheckList Title"}
                defaultValue={"inputText"}
                placeholder="Enter Title"
                buttonText="Set Title"
                onSubmit={props.onSubmit}
                displayButtonClass={"displayBtn"}
              />
   
      
    </div>)
  )
}

export default CheckListTitle