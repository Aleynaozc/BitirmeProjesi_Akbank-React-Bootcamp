
import React from 'react'
import '../List/ListModal.css'

const ListModal = (props) => {


  const { title } = props.lists

  return (
    props.openModal  && 
    (
      <>
        
        <div className='add_todo__container'>
       
          <form onSubmit={props.handleAddList}>
            <div className="inputbox">
              <span>Title</span>
              <input
                type="text"
                name="title"
                value={title}
                onChange={props.handleListChange}
              />
            </div>
           
            <button id="submitBtn" type='submit' className='add_todo_button'>Add</button>
          </form>
        </div>
      </>
    )
  )

}

export default ListModal