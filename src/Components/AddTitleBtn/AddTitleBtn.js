import React, { useState } from 'react'
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../AddTitleBtn/AddTitleBtn.css'
const AddTitleBtn = (props) => {
    const [showAddTitleBtn, setShowAddTitleBtn] = useState(false)
    const [inputText, setInputText] = useState("");
  
    const submission = (e) => {
      e.preventDefault();
      if (inputText && props.onSubmit) {
        
        props.onSubmit(inputText);
        setInputText("")
      }
      
    };

  
    return (
        <div className='addacard_body'>
            {
                showAddTitleBtn ? (
                    <form onSubmit={submission}>
                        <input
                            type="text"
                            name='maintitle'
                            className='add-todo-title_inp'
                            value={inputText}
                            onChange={(event) => setInputText(event.target.value)}
                        />
                        
                        {/* Add Board Title Button */}
                        <button
                            type='submit'
                            className='add-todo-title_btn'>
                            Add
                        </button>

                        {/* Cancel Button */}
                        <button
                            type="submit"
                            className='add-todo-title_btn'
                            style={{ background: "red" }}
                            onClick={() => setShowAddTitleBtn(false)}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>

                    </form>
                )
                    : (
                        <button onClick={() => setShowAddTitleBtn(true)} className='addTodo_btn'>
                            <FontAwesomeIcon icon={faPlus} className="plus_icon_card" />
                            <span className='card-title'>Add a Card</span>
                        </button>
                    )

            }


        </div>
    )
}

export default AddTitleBtn