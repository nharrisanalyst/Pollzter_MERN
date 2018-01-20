import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';



const AppHeader = ({loggedIn,logOut})=>{

 let logInLogOut = loggedIn?<div id='logOut-header' className='headerEl' onClick={ev=>{  logOut()}}>Log Out</div>:<Link className='headerEl' to='/login'>Login</Link>

return(
     <div id= 'header'>
      <div className={classNames('headerEl','pollzter-main')}><Link id='pollzter-main-link' to='/'> Pollzter</Link> </div><div className='header-link' id='logInRegester'> {logInLogOut}&nbsp;&nbsp;&nbsp;<Link className={classNames('headerEl', 'register-el')} to='/register'>Sign Up</Link></div>
     </div>


)

}

export default AppHeader;
