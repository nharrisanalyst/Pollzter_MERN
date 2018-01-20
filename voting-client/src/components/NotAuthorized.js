import React from 'react';







const NotAuthorized = ({notAuthorized, message})=>{
   if(!notAuthorized){
     return null;
   }
    let messageText = message===''?'Your Email or Password was incorrect try again':message;
  return(
    <div id='unauthorized-message'>
    {messageText}
    </div>
  )


}




export default NotAuthorized;
