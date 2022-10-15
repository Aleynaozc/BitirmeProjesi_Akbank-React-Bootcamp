
import axios from 'axios';
import { Form, Formik } from 'formik';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { SignUpModel } from '../../services/Utils/Forms/Register/SignUpModel';
import { SignUpValidationScheme } from '../../services/Utils/Forms/Register/validationScheme';
import '../LoginRegister/LoginRegister.css'

const Register = () => {
    const navigate = useNavigate();
    
    return (
        <div className="container">
            <div className='login__container'>
                <div className="login-register-title">Register</div>
                <Formik
                    initialValues={SignUpModel}
                    validationSchema={SignUpValidationScheme}
                    onSubmit={(values, { resetForm }) => {

                        axios.post("http://localhost:80/auth/register",
                            {
                                username: values.username,
                                password: values.password,
                                passwordConfirm: ""
                            }

                        ).then((response) => console.log(response.data))

                        resetForm();
                    }

                    }
                >
                    {({
                        errors, touched, handleChange,values,handleSubmit }) => (
                        <form onSubmit={handleSubmit} >

                            <div className="inputs">
                                <label>USER NAME</label>
                                <input type="text"
                                    className='_inputs'
                                    placeholder="User Name"
                                    name='username'
                                    onChange={handleChange}
                                    value={values.username}
                                />
                                <label>PASSWORD</label>
                                <input
                                    type="password"
                                    className='_inputs'
                                    name="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    value={values.password}
                                />
                                {errors.password && touched.password ? <small>{errors.password}</small> : null}
                                <label>CONFIRM PASSWORD</label>
                                <input
                                    type="password"
                                    name="passwordConfirm"
                                    className='_inputs'
                                    placeholder="Confirm Password"
                                    onChange={handleChange}
                                    value={values.passwordConfirm}
                                />
                                {errors.password && touched.password ? <small>{errors.password}</small> : null}

                                <button type="submit" className="login_register_btn" onClick={() => navigate('/login')}>Register</button>
                            
                            </div>
                        </form>
                    )}</Formik>

            </div>
        </div>
    )
}

export default Register