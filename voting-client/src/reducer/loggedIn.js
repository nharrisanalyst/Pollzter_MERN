

function loggedIn(state={loggedIn:false, loggingIn:false, userName:null, name:null, notAuthorized:{message:'',notAuthorized:false}},action={type:undefined}){
  switch(action.type){
    case 'USER_LOGGED_IN':
       return Object.assign({},state,{loggedIn:true, loggingIn:false, userName:action.username, name:action.userData.name, notAuthorized:{message:'', notAuthorized:false}});
    case 'USER_LOGGED_OUT':
      return Object.assign({},state,{loggedIn:false,userName:null});
   case 'USER_REGISTERED':
     return Object.assign({}, state,{loggedIn:true , loggingIn:false, userName:action.username, name: action.userData.firstname+' '+action.userData.lastname, notAuthorized:{message:'',notAuthorized:false}})
   case 'USER_LOGGING_IN':
     return Object.assign({}, state, {loggingIn:true})
   case 'SET_UNAUTHORIZED':
     return Object.assign({}, state,{loggingIn:false, notAuthorized:{message:action.message, notAuthorized:true}})
    default:
      return state;
  }
}

export default loggedIn;
