import React from 'react';





const User = ({userName,name, numberPolls}) =>(
   <div className='user-profile'>
  <div id='user-user' className='user-profile-text'>User: &nbsp;<span>{userName}</span></div>
  <div id='user-userName' className='user-profile-text'> Name: &nbsp; <span>{name}</span></div>
  <div id='user-userpolls' className='user-profile-text'>Polls: &nbsp; <span id='poll-number-id'>{numberPolls}</span></div>

   </div>


)

export default User;
