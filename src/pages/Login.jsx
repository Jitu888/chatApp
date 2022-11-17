import axios from 'axios';
import React, { useState ,useContext,useRef} from 'react';
import { useNavigate } from 'react-router-dom';
// import imge from '../images/person.jpg';
// import Header from '../components/header';
// import Footer from '../components/footer';
// import PropTypes from 'prop-types';

import { LoginCall } from '../apiCalls';
import {AuthContext} from '../context/AuthContext';
// import Spinner from '../components/spinner'




const Login = () => {

  const email = useRef();
  const pass = useRef();
   
 
  const {user,isFetching,error,dispatch} = useContext(AuthContext)

  const handleSubmit = async(e) => {
    e.preventDefault();
   LoginCall({email:email.current?.value,password:pass.current?.value},dispatch)

    
    

  }


  return (
    <>
    
      <div style={{ marginTop: '1rem' }}>
        <section className="vh-80">
          <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-9 col-lg-6 col-xl-3">
                <img src=""
                  className="img-fluid" alt="Sample image" />
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <form onSubmit={handleSubmit}>
                  <h2 className="fw-bold mb-2 text-uppercase " style={{ textAlign: "center" }}>Login</h2>
                  <p className="text-black-50 mb-5 " style={{ textAlign: "center" }}>Please enter your login and password!</p>



                  {/* Email input  */}
                  <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example3">Email address</label>
                    <input  ref={email} type="email" id="form3Example3" className="form-control form-control-lg"
                      placeholder="Enter a valid email address" />
                    
                  </div>

                  {/* <!-- Password input --> */}
                  <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="form3Example4">Password</label>
                    <input ref={pass}  type="password" id="form3Example4" className="form-control form-control-lg"
                      placeholder="Enter password" />
                   
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    {/* <!-- Checkbox --> */}
                    <div className="form-check mb-0">

                    </div>
                    <a href="/forget" className="text-body">Forgot password?</a>
                  </div>

                  <div className="text-center text-lg-start mt-4 pt-2">
                    <button type="submit" className="btn btn-primary btn-lg"
                      style={{ padding: "0 2.5rem 0 2.5rem" }}>login</button>
                    <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/signup"
                      className="link-danger">Register</a></p>
                  </div>

                </form>
              </div>
            </div>
          </div>

        </section>
      </div>
    </>
  )
}


export default Login