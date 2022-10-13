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
        {props.checkList.checkListItem.map((cLitem) =>
        (<div className="cardinfo_box_task_checkbox">
          <input
            type="checkbox"
            defaultValue={cLitem.isChecked}
          /><span className={cLitem.isChecked ? "completed" : ""}>{cLitem.text}</span>
          <FontAwesomeIcon icon={faPen} className="clistItem_icons" /> <FontAwesomeIcon icon={faTrash} className="clistItem_icons" />

        </div>
        )



        )
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