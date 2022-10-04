import React from 'react'
import'../LoginRegister/LoginRegister.css'
const Login = () => {
    return (
        <div class="container">
            <div className='login__container'>
            <div class="brand-title">Login</div>
            <div class="inputs">
                <label>EMAIL</label>
                <input type="email" placeholder="example@test.com" className='_inputs'/>
                <label>PASSWORD</label>
                <input type="password" placeholder="Min 6 charaters long"  className='_inputs' />
                <button className="login_register_btn"type="submit">LOGIN</button>
            </div>
            </div>
        </div>
    )
}

export default Login