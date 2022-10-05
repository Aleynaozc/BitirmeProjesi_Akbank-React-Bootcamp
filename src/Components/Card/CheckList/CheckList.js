import React from 'react'
import {faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const CheckList = () => {
  return (
<div  className="todoModal_check_list_checkbox">
           
           <input
             type="checkbox"
             defaultChecked=""
           />
           <p className= "completed" >Task 1</p>
           <FontAwesomeIcon icon={faTrash} className="" />
         </div>
  )
}

export default CheckList