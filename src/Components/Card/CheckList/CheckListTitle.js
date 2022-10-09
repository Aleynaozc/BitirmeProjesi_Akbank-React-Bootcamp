
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
           <FontAwesomeIcon icon={faXmark} onClick={handleClose} className="closeTitle" />
            <AddTitleBtn
                text={"Click Here"}
                defaultValue={"inputText"}
                placeholder="Enter Title"
                buttonText="Set Title"
                onSubmit={props.onSubmit}
                displayFlex={"displayFlex"}
                displayButtonClass={"displayBtn"}
                InputClass={"inputClass2"}
                displayTextClass={"displayTextClass"}
                displayClass={"displayClass2"}
              />
   
      
    </div>)
  )
}

export default CheckListTitle