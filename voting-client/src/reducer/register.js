


function register(state ={registering:false}, action={type:undefined}){
  switch(action.type){
    case 'USER_REGISTERING':
      return Object.assign({},state,{registering:true});
    case 'USER_REGISTERED':
      return Object.assign({},state,{registering:false});
    default:
       return state;
  }


}


export default register;
