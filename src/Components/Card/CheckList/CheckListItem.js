import React, { useState } from 'react'
import { faPen, faSquarePen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './CheckList.css'
const CheckListItem = (props) => {
  const [inputText, setInputText] = useState("");

  const submission = (e) => {
    e.preventDefault();
    if (inputText && props.onSubmit) {
      props.onSubmit(inputText);
      setInputText("")
    }
  };
  
  return (
    <>
      <div className="todoModal_check_list_items_container">
        {props.checkList.items.map((cLitem) =>
        (
          <div className="todomodal_checklist_checkbox" key={cLitem.id}>
            <input
              type="checkbox"
              defaultChecked={cLitem.isChecked}
              onChange={()=>props.updateCheckListItem(cLitem.id)}
            /><span className={cLitem.isChecked ? "completed" : ""}>{cLitem.title}</span>
            <FontAwesomeIcon icon={faPen} className="clistItem_icons" /> 
            <FontAwesomeIcon 
            icon={faTrash} 
            className="clistItem_icons" 
            onClick={()=>props.removeCheckListItem(cLitem.id)}
            />
          </div>
        ))
        }
        <div className='listItem_form'>
          <form onSubmit={submission}>
            <div className='cLitem_form_body'>
              <input
                value={inputText}
                onChange={(event) => setInputText(event.target.value)}
                placeholder='Add a CheckList Item'
              />
              <button type='submit' className='cLitem_btn'>Add</button>

            </div>


          </form>
        </div>


      </div>


    </>
  )
}

export default CheckListItem