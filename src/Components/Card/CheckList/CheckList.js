import React from 'react'
import {faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const CheckList = (props) => {
  return (
<div  className="todoModal_check_list_checkbox">
           <div key={props.key} >
              <input
              type="checkbox"
              defaultChecked=""
            />
            <p className= "completed" >{props.text}</p>
            <FontAwesomeIcon icon={faTrash} className="" />
            </div>
         </div>
  )
}

export default CheckList