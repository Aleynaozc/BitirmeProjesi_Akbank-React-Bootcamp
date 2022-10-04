import React from 'react'

const Labels = () => {
    const mystyle = {
        width:"30px", height:"6px",border:"none",cursor:"context-menu",marginBottom:"10px"
      };
  return (
    <div>
        <button className='labels_btn' style={mystyle}></button>
    </div>
  )
}

export default Labels