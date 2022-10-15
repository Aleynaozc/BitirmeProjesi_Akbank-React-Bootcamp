import React from 'react'
import { Link } from 'react-router-dom'
import "../Home/Home.css"
const Home = () => {
  return (
    <div className='container mt-5' >

      <h1 className="home_app_title">KANBON BOARD APP</h1>
      <div className="home__container">
    <div className='home_btn_container'> 
    <Link to="/login"  >
     <button className='home_btn'>
     Login
        </button>
     </Link>
     <Link to="/register" >
     <button className='home_btn'>
     Register
        </button>
     </Link>
  
    </div>
    
      
 
    </div>
    </div>
  )
}

export default Home