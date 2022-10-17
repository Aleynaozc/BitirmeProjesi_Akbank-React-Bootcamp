
import axios from 'axios';
import { Form, Formik } from 'formik';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userRegister } from '../../services/store/auth/createToken';
import { SignUpModel } from '../../services/Utils/Forms/Register/SignUpModel';
import { SignUpValidationScheme } from '../../services/Utils/Forms/Register/validationScheme';
import '../LoginRegister/LoginRegister.css'

const Register = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        password: "",
        passwordConfirm: "",
      });
      const dispatch = useDispatch();

      const { username, password, passwordConfirm } = user;
      const handleChange = (e) => {
        setUser({
          ...user,
          [e.target.name]: e.target.value,
        });
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        const registerData = user;
        dispatch(userRegister(registerData))
        
      };
    return (
        <div className="container">
            <div className='login__container'>
                <div className="login-register-title">Register</div>
               
                        <form onSubmit={handleSubmit} >

                            <div className="inputs">
                                <label>USER NAME</label>
                                <input type="text"
                                    className='_inputs'
                                    placeholder="User Name"
                                    name='username'
                                    onChange={handleChange}
                                    value={username}
                                />
                                <label>PASSWORD</label>
                                <input
                                    type="password"
                                    className='_inputs'
                                    name="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    value={password}
                                />
                              
                                <label>CONFIRM PASSWORD</label>
                                <input
                                    type="password"
                                    name="passwordConfirm"
                                    className='_inputs'
                                    placeholder="Confirm Password"
                                    onChange={handleChange}
                                    value={passwordConfirm}
                                />
                                <button type="submit" className="login_register_btn"  >Register</button>
                                <Link to="/login" className='login_link'>
                                <small   stle={{float:"left"}}>Giriş yap</small>
                                </Link>
                               

                            </div>
                        </form>
               

            </div>
        </div>
    )
}

export default Register