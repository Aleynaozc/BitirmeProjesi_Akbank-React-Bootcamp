
import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../LoginRegister/LoginRegister.css'
 
const Register = () => {
    const navigate = useNavigate();
    return (
        <div class="container">
            <div className='login__container'>
                <div class="brand-title">Register</div>
                <div class="inputs">
                                <label>USER NAME</label>
                                <input type="email" className='_inputs' placeholder="username"  />
                                <label>EMAIL</label>
                                <input type="email" className='_inputs' placeholder="example@test.com"  />
                             
                                <label>PASSWORD</label>
                                <input type="password"  className='_inputs' placeholder="Min 6 charaters long"  />
                              
                                <label>CONFIRM PASSWORD</label>
                                <input type="password"  className='_inputs' placeholder="Confirm Password" />
              
                                  
                                <button type="submit" className="login_register_btn"onClick={() => navigate('/login')}>LOGIN</button>
                            </div>
                {/* <Formik
                    // initialValues={SignInModel}
                    // validationSchema={SignInValidationScheme}
                    // onSubmit={(values, { resetForm }) => {
                    //     _login(values);
                    //     resetForm();
                    // }}
                >
                    {({
                        errors, touched, handleChange }) => (
                        <Form >

                            <div class="inputs">
                                <label>USER NAME</label>
                                <input type="email" className='_inputs' placeholder="username" onChange={handleChange} />
                                <label>EMAIL</label>
                                <input type="email" className='_inputs' placeholder="example@test.com"  onChange={handleChange}/>
                                {errors.email && touched.email ? <small >{errors.email}</small> : null}
                                <label>PASSWORD</label>
                                <input type="password"  className='_inputs' placeholder="Min 6 charaters long" onChange={handleChange} />
                                {errors.password && touched.password ? <small>{errors.password}</small> : null}
                                <label>CONFIRM PASSWORD</label>
                                <input type="password"  className='_inputs' placeholder="Confirm Password" onChange={handleChange}/>
                                {errors.password && touched.password ? <small>{errors.password}</small> : null}
                                  
                                <button type="submit" className="login_register_btn"onClick={() => navigate('/login')}>LOGIN</button>
                            </div>
                        </Form>
                    )}</Formik> */}

            </div>
        </div>
    )
}

export default Register