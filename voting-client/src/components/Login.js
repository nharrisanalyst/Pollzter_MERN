import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import NotAuthorized from './NotAuthorized';





const Login = ({submit,notAuthorized}) => {
  let input={};
return(
  <div id='loginFormCont'>
  <div className='loginForm'>
    <h4> Login In </h4>
    <form method ='post' onSubmit={ev=>{
       ev.preventDefault()
      submit({email:input.email.value, password:input.password.value})}} >


       <input className='input-text' type='text' name ='email' placeholder='Email' ref={node => input.email=node}/>
       <br/>
       <br/>

       <input className='input-text' type='password' name ='password' placeholder='password' ref={node => input.password=node}/>
       <br/>
       <br/>
       <button className='submit-button'>Login</button> <Link className='register-el' to ='/register'>Sign Up</Link>
    </form>

  </div>
  <NotAuthorized notAuthorized={notAuthorized} message={''}/>
 </div>
)
}


export default Login;
