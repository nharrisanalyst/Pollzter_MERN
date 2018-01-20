import React, {Component} from 'react';
import NotAuthorized from './NotAuthorized'





const Register = ({submit, notAuthorized, message}) => {
  let input={};
return(
  <div id='register-Div-Con'>
  <div id='register-Div'>
    <h4> Register for an Account </h4>
    <form method ='post' onSubmit={ev=>{
       ev.preventDefault()
      submit({email:input.email.value, password:input.password.value, username:input.username.value, firstname:input.firstname.value, lastname: input.lastname.value})}} >

       <br/>
       <input className='input-text' type='text' name ='email' placeholder='Email' ref={node => input.email=node}/>
       <br/>

       <br/>
       <input className='input-text' type='text' name ='username' placeholder='UserName' ref={node => input.username=node}/>
       <br/>

       <br/>
       <input className='input-text' type='text' name ='firstname' placeholder='First Name' ref={node => input.firstname=node}/>
       <br/>

       <br/>
       <input className='input-text' type='text' name ='lastname' placeholder='Last Name' ref={node => input.lastname=node}/>
       <br/>

       <br/>
       <input className='input-text' type='password' name ='password' placeholder='Password' ref={node => input.password=node}/>
       <br/>
       <br/>
       <button className='submit-button' >Sign Up</button>
    </form>
  </div>
    <NotAuthorized notAuthorized={notAuthorized} message={message}/>
  </div>

)
}


export default Register;
