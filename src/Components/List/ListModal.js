import React, { useRef, useState } from 'react'
import '../List/ListModal.css'
const ListModal = (props) => {

  const [inputText, setInputText] = useState("");
  const submission = (e) => {
    e.preventDefault();
    if (inputText && props.onSubmit) {
      setInputText("")
      props.onSubmit(inputText);
    }
    
  };

  return (

    props.openModal &&
    (
      <>
        <div className='add_todo__container'>
          <form  onSubmit={submission}>
            <div className="inputbox">
              <span>Title</span>
              <input
                type="text"
                name="title"
                value={inputText}
                onChange={(event) => setInputText(event.target.value)}
                
              />
            </div>
            <button type="submit" className='add_todo_button'>Add</button>
          </form>
        </div>
      </>
    )
  )

}

export default ListModal