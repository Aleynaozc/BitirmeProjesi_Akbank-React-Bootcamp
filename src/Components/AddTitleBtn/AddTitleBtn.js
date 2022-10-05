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
        <div className=''>
            {
                showAddTitleBtn ? (
                    <form onSubmit={submission} className={`editable_edit ${props.editClass ? props.editClass : ""}`}>
                        <input
                            type="text"
                            name='maintitle'
                            placeholder={props.placeholder || props.text}
                            className='add-todo-title_inp'
                            value={inputText}
                            onChange={(event) => setInputText(event.target.value)}
                        />

                        {/* Add Board Title Button */}
                        <button
                            type='submit'
                            className='add-todo-title_btn'

                        >
                            {props.buttonText|| "Add"}
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
                        <button onClick={() => setShowAddTitleBtn(true)} className={`addTodo_btn ${props.displayClass ? props.displayClass : ""
                            }`}>

                            <span className='card-title'>  {props.text}</span>
                        </button>
                    )

            }


        </div>
    )
}

export default AddTitleBtn