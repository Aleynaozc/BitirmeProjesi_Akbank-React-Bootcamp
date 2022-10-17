import { Formik } from 'formik';
import React, { useEffect } from 'react'
import '../LoginRegister/LoginRegister.css'
import { SignInModel } from '../../services/Utils/Forms/Login/InitialModels';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { SignInValidationScheme } from '../../services/Utils/Forms/Login/validationScheme';
import { authCreateToken } from '../../services/store/auth/createToken';



const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
   
    const _login = (loginModel) => {
        dispatch(authCreateToken(loginModel))
      
    };


    return (
        <div className="container">
            <div className='login__container'>
                <div className="login-register-title">Login</div>
                <Formik
                    initialValues={SignInModel}
                    validationSchema={SignInValidationScheme}
                    onSubmit={(values, { resetForm }) => {
                        _login(values);
                        resetForm();
                        navigate("/board")

                    }}
                >
                    {({
                        errors, touched, handleChange, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="inputs" >
                                <label>USER NAME</label>
                                <input
                                    type="text"
                                    autoComplete="false"
                                    name='username'
                                    onChange={handleChange}
                                    className='_inputs'
                                    id="floatingInput"

                                />


                                <label>PASSWORD</label>
                                <input
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    className='_inputs'
                                    id="floatingPassword"

                                />
                                {errors.password && touched.password ? <small>{errors.password}</small> : null}

                                <button className="login_register_btn" type="submit" onClick={() => navigate("/board")} >Login</button>

                                <Link to="/register" className='register_link'>
                                    Kayıt ol
                                </Link>

                            </div>
                        </form>
                    )}</Formik>
            </div>
        </div>
    )
}

export default Login